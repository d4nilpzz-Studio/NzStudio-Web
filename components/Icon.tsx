import { icons, type LucideProps } from "lucide-react";

/** "settings", "book-open", "BookOpen" -> "BookOpen" */
const toPascal = (name: string) =>
  name
    .trim()
    .split(/[-_\s]+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");

/**
 * Renders a Lucide icon by name (https://lucide.dev/icons).
 * Server-only: the full icon set never reaches the browser, only the rendered SVG.
 */
export default function Icon({ name, ...props }: { name?: string } & LucideProps) {
  if (!name) return null;
  const LucideIcon = icons[toPascal(name) as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon size={16} strokeWidth={2} aria-hidden {...props} />;
}
