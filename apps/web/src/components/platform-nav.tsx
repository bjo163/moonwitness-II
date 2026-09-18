import Link from "next/link";

export function PlatformNav() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">◌</span>
        <span>MOONWITNESS</span>
      </Link>
      <nav aria-label="Primary">
        <Link href="/">Home</Link>
        <Link href="/witness">Witness</Link>
        <Link href="/crew">Crew</Link>
        <Link href="/timeline">Timeline</Link>
        <Link href="/constellation">Constellation</Link>
      </nav>
    </header>
  );
}
