"use client";

import { Menu } from "lucide-react";

export default function MobileNavToggle() {
  return (
    <button
      type="button"
      className="header-btn mobile-only"
      aria-label="Menu"
      onClick={() => document.body.classList.toggle("nav-open")}
    >
      <Menu size={22} aria-hidden />
    </button>
  );
}
