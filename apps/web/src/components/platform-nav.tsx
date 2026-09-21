import Link from "next/link";

const primaryLinks = [
  ["Story", "/storytelling"],
  ["Lore", "/lore"],
  ["Explore", "/explore"],
  ["Archive", "/archive"],
  ["Journey", "/journey"],
] as const;

export function PlatformNav() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">◌</span>
        <span>MOONWITNESS</span>
      </Link>
      <nav aria-label="Primary">
        {primaryLinks.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
