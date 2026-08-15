export default function Footer() {
  return (
    <footer className="border-t border-border py-8" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-accent">PS</span>
            <span className="text-muted font-mono text-sm">/&gt;</span>
          </div>
          <p className="text-sm text-muted text-center">
            © {new Date().getFullYear()} Prashant Singh. Built with{" "}
            <span className="text-accent">♥</span> and a lot of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
