/**
 * How each markdown element is rendered.
 *
 * Each key is an HTML tag produced by the markdown (h2, table, a, code…).
 * Change the JSX or class names here; colors and sizes live in theme/theme.css.
 * Remove a key and that tag renders as-is, without a wrapper.
 */
import Link from "next/link";
import type { Components } from "hast-util-to-jsx-runtime";

const isExternal = (href = "") => /^([a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:");

export const markdownComponents: Partial<Components> = {
  // Headings with a "#" to copy the link to the section
  h2: ({ id, children, ...props }) => (
    <h2 id={id} className="md-h2" {...props}>
      {children}
      {id && <a href={`#${id}`} className="md-anchor" aria-label="Link to this section">#</a>}
    </h2>
  ),
  h3: ({ id, children, ...props }) => (
    <h3 id={id} className="md-h3" {...props}>
      {children}
      {id && <a href={`#${id}`} className="md-anchor" aria-label="Link to this section">#</a>}
    </h3>
  ),
  h4: (props) => <h4 className="md-h4" {...props} />,

  p: (props) => <p className="md-p" {...props} />,
  ul: (props) => <ul className="md-ul" {...props} />,
  ol: (props) => <ol className="md-ol" {...props} />,
  li: (props) => <li className="md-li" {...props} />,
  hr: () => <hr className="md-hr" />,
  blockquote: (props) => <blockquote className="md-blockquote" {...props} />,
  img: ({ alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="md-img" alt={alt ?? ""} loading="lazy" {...props} />
  ),

  // Internal links use <Link> (instant navigation); external ones open in a new tab
  a: ({ href, children, className, ...props }) => {
    if (className?.includes("md-anchor")) return <a href={href} className={className} {...props}>{children}</a>;
    if (!href || href.startsWith("#")) return <a href={href} className="md-link" {...props}>{children}</a>;
    if (isExternal(href))
      return (
        <a href={href} className="md-link" target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    return <Link href={href} className="md-link">{children}</Link>;
  },

  // Tables inside a wrapper that scrolls horizontally on mobile
  table: (props) => (
    <div className="md-table-wrap">
      <table className="md-table" {...props} />
    </div>
  ),

  // Code blocks (rehype-pretty-code outputs <figure><pre><code>)
  pre: (props) => <pre className="md-pre" {...props} />,
  code: ({ className, ...props }) => (
    <code className={["md-code", className].filter(Boolean).join(" ")} {...props} />
  ),
};
