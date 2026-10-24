# mwill20.github.io

Source for **[mwill20.github.io](https://mwill20.github.io/)**, the personal landing page of Michael Williams:
five years of security operations told as a seven-hop traceroute, with an AI thread that
grows at every hop.

## What this is

A single static page. No build step, no framework, no server-side code, no analytics.

```
index.html          the page: hero, seven hops, destination
assets/site.css     styles, including a reduced-motion variant
assets/route.js     draws the route and AI thread as SVG, reveals hops on scroll
assets/favicon.svg
404.html
```

The route is computed at load time from the position of each `[data-hop]` section, so
adding or reordering a hop only requires editing the HTML.

## Local preview

```bash
python -m http.server -d . 8000
```

Then open <http://localhost:8000/>. Opening `index.html` directly from disk also works.

## Editing

- Copy lives in `index.html`. Each hop is a `<section class="hop" data-hop="N">`;
  alternate the `r` class to switch sides.
- The loop in the route is drawn at the hop whose index is `LOOP_AT` in `assets/route.js`.
- The AI meter per hop is the `<span class="meter">` block: `on` for a full segment,
  `half` for a half.

## Related

- Project catalog: <https://mwill20.github.io/ai-security-portfolio/>
- AgentLedger docs: <https://mwillaimission.mintlify.app>
- GitHub profile: <https://github.com/mwill20>

See [SECURITY.md](SECURITY.md) for scope and reporting.
