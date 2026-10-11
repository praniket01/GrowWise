import Link from "next/link";

export function Footer() {
  return (
    <footer className="container footer">
      <Link href="/" className="brand"><span className="brand-mark">✳</span> growwise</Link>
      <span>Helpful gardening guidance. Healthier growing habits.</span>
      <span>Open-source project · Built with care 🌱</span>
    </footer>
  );
}
