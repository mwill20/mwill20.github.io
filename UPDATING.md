# UPDATING.md — how to change the Traceroute

Every recipe ends the same way: run `python validate.py`, preview locally, stage, and show
the diff. Nothing is pushed without Michael's go-ahead. An assistant following these
recipes should read [CLAUDE.md](CLAUDE.md) first.

Local preview:

```bash
python -m http.server -d . 8000
```

Validation:

```bash
python validate.py
```

---

## 1. Change wording inside a hop

Use for: a better sentence, a corrected fact, a new tool in a scope line.

1. Edit the text in **CONTENT.md** under the hop. Update or add the provenance tag.
2. Find the same hop in `index.html` (`<section class="hop" data-hop="N">`) and make the
   identical change. Scope and AI lines live in the `.tele` grid; the AI thread is the
   `<p class="ai">`; the headline is the `<h2>` with `<em>` around the italic word.
3. Add a row to the CONTENT.md change log.
4. Validate, preview, stage.

## 2. Add a project as a branch

Use for: a repo that has earned a place on the route.

1. Confirm the repo is **public** and has a description on GitHub. If it has no
   `SECURITY.md`, tests, or CI, it can still appear, but say so in CONTENT.md.
2. Add it to the hop's **Branches** list in CONTENT.md with a one-line description and a
   `[github]` tag. Add a metric tag only with a `[resume]` or `[github]` source.
3. In `index.html`, add a `<div class="branch">` inside that hop's `.branches`. Copy an
   existing one. The tree glyph is `├─` for every branch except the last, which is `└─`.
   Use class `branch v` in hop 5 (violet) and `branch s` in hop 6 (sky).
4. Validate (the link check will fetch the repo), preview, stage.

## 3. Retire a project

1. Remove it from CONTENT.md and note why in the change log (archived, superseded,
   made private).
2. Remove its `<div class="branch">` and fix the tree glyph on the new last branch.
3. Validate, preview, stage.

## 4. Change the Current block (hop 7)

Use for: a new title, a new tool, a program completed.

1. Edit the **Current block** rows in CONTENT.md. A completed program moves from
   `in progress` to the credentials in the hero meta block and, if it belongs there, the
   hop 2 side panel.
2. In `index.html`, edit the `<div class="current">` rows. Each row is a `<span class="k">`
   label followed by a `<b>` value. The in-progress row keeps the `prog` class and the
   blinking cursor; remove both when nothing is in progress.
3. Validate, preview, stage.

## 5. Add a new hop

Use for: a new role or a chapter that deserves its own stop. This is structural; do it
deliberately.

1. Write the hop in CONTENT.md first: side, meter, headline, scope, AI line, body, AI
   thread, branches, provenance. The meter must be ≥ the previous hop and ≤ the next.
2. In `index.html`, copy the closest existing `<section class="hop">`, renumber
   `data-hop` on it **and every hop after it**, and alternate the `r` class so sides keep
   switching. Hop 7 stays the destination; if the new hop is last before it, the
   marquee stays between them.
3. Update the rail: `hop <b id="hopnum">0</b> / 7` becomes `/ 8`, and the trace line's
   "7 hops".
4. If the new hop comes **before the Director hop**, increment `LOOP_AT` in
   `assets/route.js` so the loop still draws at the Director.
5. Update `validate.py`'s `EXPECTED_HOPS` constant.
6. Validate, preview at desktop and 375px, stage.

## 6. Refresh from a new resume

1. Extract the resume text and compare it against every `[resume]`-tagged line in
   CONTENT.md: titles, dates, employers, tools, metrics, credentials.
2. Propose each change as a diff with the resume line it comes from. Do not apply until
   Michael approves.
3. Apply approved changes with recipe 1 or 4, update the provenance tag date, log it.

## 7. Regenerate the social preview image

1. Serve the site locally and open it at exactly 1200×630.
2. Hide `.rail`, `.legend`, `.scrollhint`, `.skip`, and the scrollbar; wait for fonts.
3. Screenshot the viewport to `assets/og.png`. Validate (it checks the dimensions).

## Things that look like bugs but are not

- The route line is drawn by JavaScript from the position of each hop, so it moves when
  copy length changes. That is intended.
- The AI thread is dashed in early hops and solid later. Intended.
- On viewports under 860px the rail and legend hide and hops collapse to one column.
- With `prefers-reduced-motion`, the route is fully drawn on load and nothing animates.
