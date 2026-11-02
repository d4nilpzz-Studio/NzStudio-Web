"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { basePath, wikiConfig } from "@/wiki.config";

type Result = { url: string; title: string; excerpt: string };
type Pagefind = {
  options: (o: Record<string, unknown>) => Promise<void>;
  search: (q: string) => Promise<{ results: { data: () => Promise<{ url: string; meta: { title?: string }; excerpt: string }> }[] }>;
};

let pagefindPromise: Promise<Pagefind | null> | null = null;

function loadPagefind() {
  // Pagefind is generated after the build (/pagefind folder), so it is imported at runtime
  pagefindPromise ??= (new Function("u", "return import(u)")(`${basePath}/pagefind/pagefind.js`) as Promise<Pagefind>)
    .then(async (pf) => {
      await pf.options({ baseUrl: `${basePath}/` });
      return pf;
    })
    .catch(() => null);
  return pagefindPromise;
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    loadPagefind().then((pf) => setUnavailable(!pf));
  }, [open]);

  useEffect(() => {
    if (!query.trim()) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      const pf = await loadPagefind();
      if (!pf || cancelled) return;
      const res = await pf.search(query);
      const data = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
      if (cancelled) return;
      setResults(
        data.map((d) => ({
          // Link adds the basePath by itself
          url: basePath && d.url.startsWith(basePath) ? d.url.slice(basePath.length) || "/" : d.url,
          title: d.meta.title ?? d.url,
          excerpt: d.excerpt,
        })),
      );
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  return (
    <>
      <button type="button" className="header-btn" aria-label={wikiConfig.labels.search} onClick={() => setOpen(true)}>
        <SearchIcon size={22} strokeWidth={2.2} aria-hidden />
      </button>

      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              className="search-input"
              placeholder={wikiConfig.labels.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-results">
              {unavailable && <p className="search-empty">{wikiConfig.labels.searchUnavailable}</p>}
              {!unavailable && query.trim() && results.length === 0 && (
                <p className="search-empty">{wikiConfig.labels.searchNoResults}</p>
              )}
              {(query.trim() ? results : []).map((r) => (
                <Link key={r.url} href={r.url} className="search-result" onClick={() => setOpen(false)}>
                  <div className="search-result-title">{r.title}</div>
                  <div className="search-result-excerpt" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
