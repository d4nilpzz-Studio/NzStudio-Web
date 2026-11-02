"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

/** Navigation node with its icon already rendered on the server. */
export type NavNode = {
  title: string;
  href: string;
  hasPage: boolean;
  icon?: ReactNode;
  children?: NavNode[];
};

const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export default function Sidebar({ tree }: { tree: NavNode[] }) {
  const pathname = norm(usePathname() || "/");

  // Close the mobile menu after navigating
  useEffect(() => {
    document.body.classList.remove("nav-open");
  }, [pathname]);

  return (
    <aside className="wiki-sidebar">
      <nav>
        <ul className="nav-list">
          {tree.map((n) => (
            <NavItem key={n.href} node={n} depth={0} pathname={pathname} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function NavItem({ node, depth, pathname }: { node: NavNode; depth: number; pathname: string }) {
  const hasChildren = !!node.children?.length;
  const isActive = pathname === node.href;
  const inPath = pathname.startsWith(node.href);
  const [open, setOpen] = useState(inPath);
  // Open the folder automatically when navigating to a page inside it
  const [prevInPath, setPrevInPath] = useState(inPath);
  if (inPath !== prevInPath) {
    setPrevInPath(inPath);
    if (inPath) setOpen(true);
  }

  const label = (
    <>
      {node.icon && <span className="nav-icon">{node.icon}</span>}
      <span className="nav-title">{node.title}</span>
    </>
  );

  return (
    <li className={`nav-item${hasChildren && open ? " is-open" : ""}`}>
      <div
        className={`nav-row${isActive ? " is-active" : ""}`}
        style={{ paddingLeft: `calc(var(--nav-indent) * ${depth} + var(--nav-padding))` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="nav-caret"
            aria-label={open ? "Collapse" : "Expand"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <ChevronRight size={14} strokeWidth={2.5} aria-hidden />
          </button>
        ) : (
          <span className="nav-caret-spacer" />
        )}
        {node.hasPage ? (
          <Link href={node.href} className="nav-link">
            {label}
          </Link>
        ) : (
          <button type="button" className="nav-link" onClick={() => setOpen((o) => !o)}>
            {label}
          </button>
        )}
      </div>
      {hasChildren && open && (
        <ul className="nav-list">
          {node.children!.map((c) => (
            <NavItem key={c.href} node={c} depth={depth + 1} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}
