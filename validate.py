"""Validate the Traceroute site before a change is called done.

Usage:
    python validate.py              # check the real files, exit 1 on any failure
    python validate.py --offline    # skip the network link check
    python validate.py --self-test  # prove the checks catch broken inputs

Standard library only. Python 3.11+.
"""
from __future__ import annotations

import re
import struct
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
EXPECTED_HOPS = 7
LOOPNOTE_CLASS = "loopnote"
BANNED_WORDS = ("TODO", "FIXME", "lorem")
OK_STATUSES = {200, 301, 302, 303, 307, 308, 999}  # 999 = LinkedIn bot response
UA = "Mozilla/5.0 (validate.py; +https://mwill20.github.io/)"


class Failure(Exception):
    pass


# --------------------------------------------------------------------------- checks

def check_hops(html: str) -> list[str]:
    hops = [int(n) for n in re.findall(r'data-hop="(\d+)"', html)]
    if hops != list(range(1, EXPECTED_HOPS + 1)):
        raise Failure(f"hops must be 1..{EXPECTED_HOPS} in order, found {hops}")
    return [f"{len(hops)} hops in order"]


def meter_values(html: str) -> list[float]:
    values = []
    for block in re.findall(r'<span class="meter">(.*?)</span>', html, re.S):
        full = len(re.findall(r'class="on"', block))
        half = len(re.findall(r'class="half"', block))
        values.append(full + 0.5 * half)
    return values


def check_meters(html: str) -> list[str]:
    values = meter_values(html)
    if len(values) != EXPECTED_HOPS - 1:
        raise Failure(f"expected {EXPECTED_HOPS - 1} AI meters (one per story hop), found {len(values)}")
    for a, b in zip(values, values[1:]):
        if b < a:
            raise Failure(f"AI meter decreases: {values}")
    return [f"AI meter non-decreasing: {values}"]


def check_loop_index(html: str, js: str) -> list[str]:
    m = re.search(r"const LOOP_AT\s*=\s*(\d+)", js)
    if not m:
        raise Failure("LOOP_AT not found in assets/route.js")
    loop_at = int(m.group(1))
    sections = re.findall(r'<section class="(?:hop[^"]*|verdict)"[^>]*data-hop="(\d+)".*?</section>', html, re.S)
    bodies = re.findall(r'(<section class="(?:hop[^"]*|verdict)"[^>]*data-hop="\d+".*?</section>)', html, re.S)
    if len(bodies) != EXPECTED_HOPS:
        raise Failure("could not split hop sections for the loop check")
    holders = [i for i, b in enumerate(bodies) if LOOPNOTE_CLASS in b]
    if holders != [loop_at]:
        raise Failure(f"LOOP_AT={loop_at} but .{LOOPNOTE_CLASS} lives in hop index {holders}")
    return [f"loop drawn at hop index {loop_at} (hop {sections[loop_at]})"]


def check_banned_words(html: str) -> list[str]:
    hits = [w for w in BANNED_WORDS if w in html]
    if hits:
        raise Failure(f"placeholder text left in index.html: {hits}")
    return ["no placeholder text"]


def check_assets(html: str, root: Path) -> list[str]:
    refs = set(re.findall(r'(?:href|src)="(assets/[^"]+)"', html))
    missing = [r for r in sorted(refs) if not (root / r).exists()]
    if missing:
        raise Failure(f"referenced assets missing: {missing}")
    return [f"{len(refs)} local assets present"]


def check_og_image(root: Path) -> list[str]:
    path = root / "assets" / "og.png"
    if not path.exists():
        raise Failure("assets/og.png is missing")
    head = path.read_bytes()[:24]
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        raise Failure("assets/og.png is not a PNG")
    w, h = struct.unpack(">II", head[16:24])
    if (w, h) != (1200, 630):
        raise Failure(f"assets/og.png is {w}x{h}, expected 1200x630")
    return ["og.png is 1200x630"]


def outbound_links(html: str) -> list[str]:
    return sorted(set(re.findall(r'href="(https?://[^"]+)"', html)))


def fetch_status(url: str, timeout: float = 15.0) -> int:
    req = urllib.request.Request(url, headers={"User-Agent": UA}, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # network error, DNS, timeout
        raise Failure(f"{url}: {e.__class__.__name__}") from e


def check_links(html: str) -> list[str]:
    bad = []
    links = [u for u in outbound_links(html) if "fonts.g" not in u]
    for url in links:
        status = fetch_status(url)
        if status not in OK_STATUSES:
            bad.append(f"{url} -> {status}")
    if bad:
        raise Failure("links failing: " + "; ".join(bad))
    return [f"{len(links)} outbound links resolve"]


# --------------------------------------------------------------------------- runner

def run(root: Path, offline: bool) -> int:
    html = (root / "index.html").read_text(encoding="utf-8")
    js = (root / "assets" / "route.js").read_text(encoding="utf-8")
    checks = [
        lambda: check_hops(html),
        lambda: check_meters(html),
        lambda: check_loop_index(html, js),
        lambda: check_banned_words(html),
        lambda: check_assets(html, root),
        lambda: check_og_image(root),
    ]
    if not offline:
        checks.append(lambda: check_links(html))
    failures = 0
    for check in checks:
        try:
            for line in check():
                print(f"  ok   {line}")
        except Failure as f:
            failures += 1
            print(f"  FAIL {f}")
    print("PASS" if failures == 0 else f"FAIL ({failures})")
    return 0 if failures == 0 else 1


def self_test(root: Path) -> int:
    """Each case mutates the real HTML/JS in memory and must be caught."""
    html = (root / "index.html").read_text(encoding="utf-8")
    js = (root / "assets" / "route.js").read_text(encoding="utf-8")
    cases = {
        "missing hop": (lambda: check_hops(html.replace('data-hop="4"', 'data-hop="9"', 1))),
        "meter decreases": (lambda: check_meters(
            html.replace('<span class="meter"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></span>',
                         '<span class="meter"><i></i><i></i><i></i><i></i><i></i></span>', 1))),
        "loop index wrong": (lambda: check_loop_index(html, js.replace("const LOOP_AT=2", "const LOOP_AT=1"))),
        "placeholder left": (lambda: check_banned_words(html + "<!-- TODO -->")),
        "asset missing": (lambda: check_assets(html.replace("assets/site.css", "assets/nope.css"), root)),
        "dead link": (lambda: check_links('<a href="https://github.com/mwill20/this-repo-does-not-exist-xyz">x</a>')),
    }
    failures = 0
    for name, case in cases.items():
        try:
            case()
            print(f"  FAIL self-test '{name}' was not detected")
            failures += 1
        except Failure as f:
            print(f"  ok   self-test '{name}' detected: {str(f)[:70]}")
    # and the real files must pass
    print("  --   real files:")
    rc = run(root, offline=True)
    print("SELF-TEST PASS" if failures == 0 and rc == 0 else "SELF-TEST FAIL")
    return 0 if failures == 0 and rc == 0 else 1


if __name__ == "__main__":
    args = set(sys.argv[1:])
    if "--self-test" in args:
        sys.exit(self_test(ROOT))
    sys.exit(run(ROOT, offline="--offline" in args))
