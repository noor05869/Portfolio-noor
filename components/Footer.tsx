export default function Footer() {
  return (
    <footer className="border-t border-amber/[0.08]">
      <div className="page-shell flex flex-col items-center justify-between gap-3 py-7 text-xs text-muted sm:flex-row">
        <a href="#top" className="font-display text-sm font-bold text-amber" aria-label="Back to top">NU</a>
        <p>Built with Next.js + Tailwind © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
