// General wiki settings. Colors and styles live in theme/theme.css.
export const wikiConfig = {
  name: "Studio Documentation",
  shortName: "Nz Studio",
  description: "Documentation for Nz Studio plugins",
  // Path inside /public
  logo: "/logo.png",
  // When set, every page shows an "Edit this page" link.
  // Example: "https://github.com/d4nilpzz-Studio/NzStudio-Web/edit/master/content"
  editUrl: "",
  // Date format for "Last modified"
  locale: "en-GB",
  labels: {
    lastModified: "Last modified",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    search: "Search",
    searchPlaceholder: "Search the documentation…",
    searchNoResults: "No results",
    searchUnavailable: "Search only works after a build. Run `pnpm preview` to try it locally.",
    editPage: "Edit this page",
    notFound: "Page not found",
    backHome: "Back to home",
  },
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
