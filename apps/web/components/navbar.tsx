import Link from "next/link";

export function Navbar() {
  return (
    <header className="container">
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="GrowWise home">
          <span className="brand-mark">✳</span> growwise
        </Link>
        <div className="nav-links">
          <Link className="nav-hide" href="/plants">Plant library</Link>
          <Link className="nav-hide" href="/advisor">AI Coach</Link>
          <Link className="nav-hide" href="/missions">Missions</Link>
          <Link className="nav-hide" href="/health-check">Plant health</Link>
          <Link className="nav-hide" href="/journal">Journal</Link>
          <Link className="nav-hide" href="/#how-it-works">How it works</Link>
          <Link className="btn btn-primary" href="/planner">Plan my garden <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>
    </header>
  );
}
