"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/markdown";

// How far below the top of the window a heading counts as "reached" (header + margin)
const OFFSET = 140;

export default function Toc({ headings, title }: { headings: Heading[]; title: string }) {
  const [active, setActive] = useState(headings[0]?.id);
  // After a click in the TOC, keep that item active while the page jumps to it
  const lockUntil = useRef(0);

  useEffect(() => {
    if (!headings.length) return;
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      const els = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => !!el);

      const root = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 4;

      let current = headings[0].id;
      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        // Normally: the last heading that scrolled past the top.
        // At the bottom of the page the last headings can never reach the top,
        // so any heading visible on screen counts.
        if (top <= OFFSET || (atBottom && top < window.innerHeight)) current = el.id;
      }
      setActive(current);
    };

    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  if (!headings.length) return <aside className="wiki-toc" />;

  return (
    <aside className="wiki-toc">
      <div className="toc-title">{title}</div>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.id} className={`toc-item depth-${h.depth}${active === h.id ? " is-active" : ""}`}>
            <a
              href={`#${h.id}`}
              onClick={() => {
                lockUntil.current = Date.now() + 400;
                setActive(h.id);
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
