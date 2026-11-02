import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getNavTree, type TreeNode } from "@/lib/content";
import { basePath, wikiConfig } from "@/wiki.config";
import Sidebar, { type NavNode } from "@/components/Sidebar";
import Search from "@/components/Search";
import MobileNavToggle from "@/components/MobileNavToggle";
import Icon from "@/components/Icon";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: wikiConfig.name, template: `%s | ${wikiConfig.shortName}` },
  description: wikiConfig.description,
  icons: { icon: `${basePath}${wikiConfig.logo}` },
};

// Icons are rendered here (server) so the client only receives the SVGs
const toNav = (n: TreeNode): NavNode => ({
  title: n.title,
  href: n.href,
  hasPage: !!n.file,
  icon: n.icon ? <Icon name={n.icon} /> : undefined,
  children: n.children?.map(toNav),
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  const tree = getNavTree().map(toNav);
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="wiki-header">
          <MobileNavToggle />
          <Link href="/" className="header-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}${wikiConfig.logo}`} alt="" className="header-logo" />
            <span>{wikiConfig.name}</span>
          </Link>
          <div className="header-actions">
            <Search />
          </div>
        </header>
        <div className="wiki-shell">
          <Sidebar tree={tree} />
          <main className="wiki-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
