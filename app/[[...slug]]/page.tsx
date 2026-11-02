import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "node:path";
import { CONTENT_DIR, getBreadcrumbs, getDoc, getFlatPages, getLastModified } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { wikiConfig } from "@/wiki.config";
import Toc from "@/components/Toc";
import Icon from "@/components/Icon";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFlatPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return { title: slug.length ? doc.title : { absolute: wikiConfig.name }, description: doc.description };
}

export default async function DocPage({ params }: PageProps<"/[[...slug]]">) {
  const { slug = [] } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const { content, headings } = await renderMarkdown(doc.content, doc.file);
  const crumbs = getBreadcrumbs(slug);
  const updated = getLastModified(doc.file);

  const pages = getFlatPages();
  const i = pages.findIndex((p) => p.href === doc.href);
  const prev = i > 0 ? pages[i - 1] : null;
  const next = i >= 0 && i < pages.length - 1 ? pages[i + 1] : null;

  const editPath = path.relative(CONTENT_DIR, doc.file).split(path.sep).join("/");

  return (
    <div className="doc-layout">
      <article className="doc">
        {crumbs.length > 1 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {crumbs.map((c, idx) => (
              <span key={c.href} className="breadcrumb">
                {idx > 0 && <span className="breadcrumb-sep">/</span>}
                {idx === 0 && c.icon && <span className="breadcrumb-icon"><Icon name={c.icon} size={15} /></span>}
                {idx === crumbs.length - 1 || !c.file ? (
                  <span className={idx === crumbs.length - 1 ? "breadcrumb-current" : "breadcrumb-text"}>{c.title}</span>
                ) : (
                  <Link href={c.href}>{c.title}</Link>
                )}
              </span>
            ))}
          </nav>
        )}

        <div data-pagefind-body>
          <h1 className="doc-title" data-pagefind-meta="title">
            {doc.title}
          </h1>
          <div className="doc-meta" data-pagefind-ignore>
            {wikiConfig.labels.lastModified}:{" "}
            {updated.toLocaleDateString(wikiConfig.locale, { day: "numeric", month: "long", year: "numeric" })}
            {wikiConfig.editUrl && (
              <>
                {" · "}
                <a href={`${wikiConfig.editUrl}/${editPath}`} target="_blank" rel="noreferrer">
                  {wikiConfig.labels.editPage}
                </a>
              </>
            )}
          </div>
          <div className="doc-content">{content}</div>
        </div>

        {(prev || next) && (
          <nav className="doc-pager">
            {prev ? (
              <Link href={prev.href} className="pager-link">
                <span className="pager-label">← {wikiConfig.labels.previous}</span>
                <span className="pager-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={next.href} className="pager-link is-next">
                <span className="pager-label">{wikiConfig.labels.next} →</span>
                <span className="pager-title">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>

      <Toc headings={headings} title={wikiConfig.labels.onThisPage} />
    </div>
  );
}
