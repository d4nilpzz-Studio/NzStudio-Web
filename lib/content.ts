import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

export const CONTENT_DIR = path.join(process.cwd(), "content");

export type TreeNode = {
  title: string;
  icon?: string;
  slug: string[];
  href: string;
  /** Page .md file (for folders, their index.md). No file = group only. */
  file?: string;
  order: number;
  children?: TreeNode[];
};

export type Doc = {
  slug: string[];
  href: string;
  file: string;
  title: string;
  icon?: string;
  description?: string;
  content: string;
};

const MD_RE = /\.mdx?$/i;
const isIndex = (name: string) => /^(\d+[-_.]\s*)?index\.mdx?$/i.test(name);

/** "01-My Commands.md" -> "My Commands" */
export const stripOrder = (name: string) => name.replace(MD_RE, "").replace(/^\d+[-_.]\s*/, "");
/** "01-My Commands.md" -> "my-commands" */
export const toSlug = (name: string) => stripOrder(name).trim().toLowerCase().replace(/\s+/g, "-");
export const hrefOf = (slug: string[]) => (slug.length ? `/${slug.join("/")}/` : "/");

const prettify = (s: string) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function readFront(file: string) {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const h1 = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return { data: data as Record<string, unknown>, content, h1 };
}

function orderOf(name: string, data: Record<string, unknown>) {
  if (typeof data.order === "number") return data.order;
  const m = name.match(/^(\d+)[-_.]/);
  return m ? Number(m[1]) : 9999;
}

function scan(dir: string, base: string[]): TreeNode[] {
  const nodes: TreeNode[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name.startsWith("_")) continue;
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      const slug = [...base, toSlug(e.name)];
      const indexName = fs.readdirSync(full).find(isIndex);
      const file = indexName ? path.join(full, indexName) : undefined;
      const front = file ? readFront(file) : { data: {} as Record<string, unknown>, h1: undefined };
      if (front.data.hidden) continue;
      nodes.push({
        title: (front.data.title as string) ?? front.h1 ?? prettify(stripOrder(e.name)),
        icon: front.data.icon as string | undefined,
        slug,
        href: hrefOf(slug),
        file,
        order: orderOf(e.name, front.data),
        children: scan(full, slug),
      });
    } else if (MD_RE.test(e.name) && !isIndex(e.name)) {
      const front = readFront(full);
      if (front.data.hidden) continue;
      const slug = [...base, toSlug(e.name)];
      nodes.push({
        title: (front.data.title as string) ?? front.h1 ?? prettify(stripOrder(e.name)),
        icon: front.data.icon as string | undefined,
        slug,
        href: hrefOf(slug),
        file: full,
        order: orderOf(e.name, front.data),
      });
    }
  }
  return nodes.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

let cache: TreeNode[] | null = null;

/** Navigation tree generated from /content. */
export function getTree(): TreeNode[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = fs.existsSync(CONTENT_DIR) ? scan(CONTENT_DIR, []) : [];
  return cache;
}

/** Every page in reading order (used for Previous/Next). */
export function getFlatPages(): TreeNode[] {
  const out: TreeNode[] = [];
  const rootIndex = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).find(isIndex) : undefined;
  if (rootIndex) {
    const file = path.join(CONTENT_DIR, rootIndex);
    const front = readFront(file);
    out.push({
      title: (front.data.title as string) ?? front.h1 ?? "Home",
      icon: front.data.icon as string | undefined,
      slug: [],
      href: "/",
      file,
      order: -1,
    });
  }
  const walk = (nodes: TreeNode[]) => {
    for (const n of nodes) {
      if (n.file) out.push(n);
      if (n.children) walk(n.children);
    }
  };
  walk(getTree());
  return out;
}

/** Sidebar tree: the home page (content/index.md) goes first. */
export function getNavTree(): TreeNode[] {
  const home = getFlatPages()[0];
  return home?.slug.length === 0 ? [home, ...getTree()] : getTree();
}

export function getDoc(slug: string[]): Doc | null {
  const key = slug.join("/");
  const node = getFlatPages().find((n) => n.slug.join("/") === key);
  if (!node?.file) return null;
  const { data, content } = readFront(node.file);
  return {
    slug,
    href: node.href,
    file: node.file,
    title: node.title,
    icon: node.icon,
    description: data.description as string | undefined,
    content,
  };
}

/** Nodes from the root down to the current page (for breadcrumbs). */
export function getBreadcrumbs(slug: string[]): TreeNode[] {
  const crumbs: TreeNode[] = [];
  let level = getTree();
  for (let i = 0; i < slug.length; i++) {
    const node = level.find((n) => n.slug[i] === slug[i]);
    if (!node) break;
    crumbs.push(node);
    level = node.children ?? [];
  }
  return crumbs;
}

/** Date of the last commit that touched the file; falls back to the file system date. */
export function getLastModified(file: string): Date {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) return new Date(out);
  } catch {}
  return fs.statSync(file).mtime;
}
