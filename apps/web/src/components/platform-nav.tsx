import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Story", "/storytelling"],
  ["Lore", "/lore"],
  ["Explore", "/explore"],
  ["Archive", "/archive"],
  ["Journey", "/journey"],
  ["Witness", "/witness"],
  ["Events", "/events"],
  ["Messages", "/messages"],
  ["Seduction", "/seduction"],
  ["Fault Lines", "/fault-lines"],
  ["Exposure", "/exposure"],
  ["Past Presence", "/past-presence"],
  ["Change", "/change"],
  ["Promoting", "/promoting"],
  ["Villains", "/villains"],
  ["Sanity", "/sanity-last-breath"],
  ["Conflict", "/conflict"],
  ["CAB", "/change-advisory-board"],
  ["Chasing Heart", "/chasing-heart"],
  ["Lovestruck", "/lovestruck"],
  ["Breath Electric", "/breath-electric"],
  ["End Of An Era", "/end-of-an-era"],
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
