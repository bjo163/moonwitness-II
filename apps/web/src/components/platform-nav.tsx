import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Journey", "/journey"],
  ["Witness", "/witness"],
  ["Events", "/events"],
  ["Messages", "/messages"],
  ["Seduction", "/seduction"],
  ["Fault Lines", "/fault-lines"],
  ["Exposure", "/exposure"],
  ["Past Presence", "/past-presence"],
  ["Change", "/change"],
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
