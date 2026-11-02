import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import type { Root as MdRoot } from "mdast";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { Root, Element, ElementContent } from "hast";
import { CONTENT_DIR, hrefOf, toSlug } from "./content";
import { markdownComponents } from "@/theme/components";

export type Heading = { id: string; text: string; depth: 2 | 3 };

function textOf(node: Element | ElementContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

// HTML tags allowed inside markdown. Anything else (<KOTH>, <player>…)
// is shown as plain text so placeholders do not disappear.
const ALLOWED_HTML = new Set([
  "kbd", "br", "sub", "sup", "mark", "u", "s", "small", "span", "div", "details", "summary",
  "img", "a", "b", "i", "em", "strong", "code", "p", "center", "font", "iframe", "video", "table",
  "thead", "tbody", "tr", "td", "th", "ul", "ol", "li", "hr", "abbr", "picture", "source",
]);

function remarkSafeHtml() {
  return (tree: MdRoot) => {
    visit(tree, "html", (node, index, parent) => {
      const tags = [...node.value.matchAll(/<\/?([a-zA-Z][\w-]*)/g)].map((m) => m[1].toLowerCase());
      const isComment = node.value.trim().startsWith("<!--");
      if (isComment || (tags.length && tags.every((t) => ALLOWED_HTML.has(t)))) return;
      if (parent && index !== undefined) parent.children[index] = { type: "text", value: node.value };
    });
  };
}

/** Turns links like "./other-page.md#section" into wiki routes. */
function rehypeMdLinks(file: string) {
  const dir = path.relative(CONTENT_DIR, path.dirname(file)).split(path.sep).join("/");
  return () => (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string" || /^([a-z]+:|#|\/\/)/i.test(href)) return;
      const [target, hash] = href.split("#");
      if (!/\.mdx?$/i.test(target)) return;
      const resolved = target.startsWith("/") ? target.slice(1) : path.posix.join(dir, target);
      const slug = resolved
        .split("/")
        .filter(Boolean)
        .map(toSlug)
        .filter((s, i, arr) => !(i === arr.length - 1 && s === "index"));
      node.properties.href = hrefOf(slug) + (hash ? `#${hash}` : "");
    });
  };
}

/** Markdown -> React. The component used for each tag lives in theme/components.tsx. */
export async function renderMarkdown(source: string, file: string) {
  // The title is already shown above the content: drop a leading "# Title".
  const body = source.replace(/^\s*#\s+.+\r?\n/, "");

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAlert)
    .use(remarkSafeHtml)
    .use(remarkRehype, { allowDangerousHtml: true })
    // Must run before rehype-raw, which drops the title="..." of code blocks
    .use(rehypePrettyCode, { theme: "github-dark-default", keepBackground: false })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeMdLinks(file));

  const hast = (await processor.run(processor.parse(body))) as Root;

  const headings: Heading[] = [];
  visit(hast, "element", (node) => {
    if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
      headings.push({
        id: String(node.properties.id),
        text: textOf(node),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    }
  });

  const content = toJsxRuntime(hast, { Fragment, jsx, jsxs, components: markdownComponents });
  return { content, headings };
}
