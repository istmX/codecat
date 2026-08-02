import { APP_NAME } from "@/lib/utils/constants";
import { CodeCatLogo } from "@/components/shared/codecat-logo";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="mt-32 w-full border-t border-border bg-card pb-12 pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <CodeCatLogo className="size-6 text-primary" />
              <span className="font-[family-name:var(--font-inter)] text-lg font-black uppercase tracking-tight text-foreground">
                {APP_NAME}
              </span>
            </div>
            <p className="mt-4 max-w-xs font-[family-name:var(--font-inter)] text-sm text-muted-foreground leading-relaxed">
              CodeCat orchestrates a matrix of specialist AI models to provide zero-friction, maximum-insight code reviews.
            </p>
            <div className="mt-6 flex gap-4 font-[family-name:var(--font-inter)] text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-foreground">Product</h3>
            <ul className="mt-4 flex flex-col gap-3 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">
              <li><Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 flex flex-col gap-3 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-inter)] text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 flex flex-col gap-3 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4 font-[family-name:var(--font-inter)] text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
