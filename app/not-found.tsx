import Link from "next/link";
import { wikiConfig } from "@/wiki.config";

export default function NotFound() {
  return (
    <div className="doc-layout">
      <article className="doc not-found">
        <h1 className="doc-title">404</h1>
        <p className="md-p">{wikiConfig.labels.notFound}</p>
        <Link href="/" className="md-link">
          {wikiConfig.labels.backHome}
        </Link>
      </article>
    </div>
  );
}
