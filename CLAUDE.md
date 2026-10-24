# CLAUDE.md — rules for assistants editing this site

This is Michael Williams's personal landing page at https://mwill20.github.io/, a static
single page served by GitHub Pages. Read this file, then [CONTENT.md](CONTENT.md), before
touching anything. [UPDATING.md](UPDATING.md) has the step-by-step recipes.

## Source of truth

- **CONTENT.md is the story.** `index.html` renders it. Change CONTENT.md first, then
  propagate to the HTML, never the other way round. If the two disagree, CONTENT.md wins
  and the HTML is the bug.
- **Every fact has a provenance tag** in CONTENT.md: `[resume]`, `[github]`, `[michael]`,
  or `[claude-draft]`. A new number, date, title, or employer needs a tag before it goes
  on the page. Never invent a metric, a credential, or a repo.
- **The resume** is the authority for roles, dates, tools, and metrics. If a resume file is
  provided, diff it against CONTENT.md and propose edits with provenance; do not apply
  them silently.

## What does not change without Michael saying so

- The three standing orders in hop 7.
- The hero thesis ("Leveraging AI. As it evolves, so do I.") and "Follow the evidence."
- The hop count and order. Inserting or removing a hop is a structural change: see UPDATING.md.
- Any `[michael]`-tagged wording. Rephrase only when asked.

## Structural invariants the validator enforces

- Exactly seven `data-hop` sections numbered 1 to 7 in order; hop 7 is the destination.
- AI meter values never decrease from hop to hop.
- `LOOP_AT` in `assets/route.js` is the zero-based index of the hop whose side column
  holds the `.loopnote` element (currently the Director hop, index 2).
- Every outbound link resolves. Repos must be public. LinkedIn returning 999 is normal.
- `assets/og.png` exists and is 1200×630.
- No `TODO`, `FIXME`, or `lorem` in `index.html`.

Run it with:

```bash
python validate.py
```

Run `python validate.py --self-test` to prove the checks catch broken inputs. Both must
pass before a change is called done.

## Working rules

- Preview locally before staging: `python -m http.server -d . 8000`, then check desktop
  width and a 375px viewport for horizontal overflow.
- Keep the page static. No frameworks, no build step, no analytics, no third-party scripts
  beyond Google Fonts. See SECURITY.md.
- Keep the design: one route, one AI thread, alternating hops, serif italics for the
  emotional beat, mono for telemetry. Add structure only when the story needs it.
- Stage changes and show Michael the diff. **Never commit or push without his explicit
  instruction.**
- Record every content change in the CONTENT.md change log with the date and source.
- When regenerating `assets/og.png`, capture the hero at 1200×630 with the rail, legend,
  scroll cue, skip link, and scrollbar hidden.

## Related repositories

- Project catalog: https://github.com/mwill20/ai-security-portfolio (Frozen-Flask, Pages)
- Profile README and nightly cards: https://github.com/mwill20/mwill20 (Phase 2; it will
  read this repo's CONTENT.md to render the route strip, so keep the hop structure stable)
