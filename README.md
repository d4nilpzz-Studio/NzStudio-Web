# Nz Studio Wiki

Static wiki built with Next.js. Pages are generated from the markdown files in `content/`.

## Commands

```bash
pnpm dev       # development at http://localhost:3000 (no search)
pnpm preview   # build + local server at http://localhost:1414 (with search)
pnpm build     # static site in out/
```

## Adding pages

- Every `.md` inside `content/` is a page; every folder is a sidebar group.
- A folder's `index.md` is that group's page and title. `content/index.md` is the home page.
- Order: numeric prefix in the file name (`01-commands.md`, stripped from the URL) or `order:` in the frontmatter.
- Files or folders starting with `_` or `.` are ignored.

Optional frontmatter:

```yaml
---
title: Commands       # defaults to the first "# Heading" or the file name
icon: settings        # any Lucide icon name, see https://lucide.dev/icons
order: 2
description: ...      # for SEO
hidden: true          # not published
---
```

Supported markdown: tables, task lists, highlighted code (```` ```yaml title="config.yml" ````),
callouts `> [!NOTE]` / `[!TIP]` / `[!WARNING]` / `[!CAUTION]` / `[!IMPORTANT]`, and links between pages
written as `[text](./other.md#section)`. Placeholders like `%plugin_<KOTH>_name%` are shown as-is.

## Customizing

| File | What it changes |
| --- | --- |
| `theme/theme.css` | Colors, sizes, typography and every style (variables at the top) |
| `theme/components.tsx` | The JSX used to render each markdown element |
| `wiki.config.ts` | Name, logo, UI labels, "Edit this page" link |

## Publishing to GitHub Pages

1. Push the repo to GitHub.
2. In *Settings → Pages → Source*, choose **GitHub Actions**.
3. Every push to `master` or `main` deploys the site (`.github/workflows/deploy.yml`).

The base path (`/repo-name`) is set automatically. For a custom domain, add `public/CNAME` with the domain.
