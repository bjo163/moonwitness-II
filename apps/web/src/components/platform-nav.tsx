import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Witness", "/witness"],
  ["Events", "/events"],
  ["Messages", "/messages"],
  ["Fault Lines", "/fault-lines"],
  ["Past Presence", "/past-presence"],
  ["Crew", "/crew"],
  ["Timeline", "/timeline"],
  ["Constellation", "/constellation"],
] as const;

export function PlatformNav() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">◌</span>
        <span>MOONWITNESS</span>
      </Link>
      <nav aria-label="Primary">
        {links.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
