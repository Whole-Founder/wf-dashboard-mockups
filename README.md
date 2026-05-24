# wf-dashboard-mockups

Static stakeholder review artifacts for the WF Dashboard product line.

Live at: https://dashboard-preview.wholefounder.com

## Adding a mockup

1. Drop a new directory at the repo root: `<slug>/index.html`
2. Add a link to it in the root `index.html`
3. Push to `main` — Vercel auto-deploys

## Why a separate repo?

This is intentionally not in `wf-dashboard` so mockup iteration can never accidentally touch production CRO infra. Pure static, no build step.
