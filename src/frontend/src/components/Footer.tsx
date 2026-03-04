import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Clock, Mail, Phone, TrendingUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-[oklch(0.13_0.05_258)] border-t border-[oklch(0.22_0.06_258)]">
      {/* Main footer content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div>
                <div className="font-display font-semibold text-xl text-[oklch(0.92_0.01_90)]">
                  Wealth Trust
                </div>
                <div className="font-body text-xs text-[oklch(0.65_0.04_258)] uppercase tracking-widest">
                  Investment Services
                </div>
              </div>
            </div>

            <p className="font-body text-[oklch(0.65_0.04_258)] text-sm leading-relaxed mb-5 max-w-sm">
              Your trusted partner in wealth creation. We provide personalized
              investment solutions tailored to your goals, risk appetite, and
              life stage.
            </p>

            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 bg-[oklch(0.75_0.12_75/0.1)] border border-[oklch(0.75_0.12_75/0.3)] rounded-sm">
                <span className="font-body text-xs text-[oklch(0.75_0.12_75)] font-medium">
                  AMFI Registered
                </span>
              </div>
              <div className="px-2.5 py-1 bg-[oklch(0.22_0.07_258)] border border-[oklch(0.28_0.06_258)] rounded-sm">
                <span className="font-body text-xs text-[oklch(0.65_0.04_258)]">
                  ARN Certified
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-base text-[oklch(0.85_0.01_90)] mb-5 tracking-wide">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: "Home", href: "/#home" },
                { label: "About Us", href: "/#about" },
                { label: "Services", href: "/#services" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-[oklch(0.6_0.04_258)] hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[oklch(0.75_0.12_75)]" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-base text-[oklch(0.85_0.01_90)] mb-5 tracking-wide">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+919650903201"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-sm bg-[oklch(0.75_0.12_75/0.1)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[oklch(0.75_0.12_75/0.2)] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[oklch(0.75_0.12_75)]" />
                </div>
                <div>
                  <div className="font-body text-xs text-[oklch(0.55_0.04_258)] uppercase tracking-wider mb-0.5">
                    Call Us
                  </div>
                  <div className="font-body text-sm text-[oklch(0.7_0.03_258)] group-hover:text-[oklch(0.75_0.12_75)] transition-colors">
                    +91 96509 03201
                  </div>
                </div>
              </a>

              <a
                href="mailto:enquiry@wealthtrustinvest.com"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-sm bg-[oklch(0.75_0.12_75/0.1)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[oklch(0.75_0.12_75/0.2)] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[oklch(0.75_0.12_75)]" />
                </div>
                <div>
                  <div className="font-body text-xs text-[oklch(0.55_0.04_258)] uppercase tracking-wider mb-0.5">
                    Email Us
                  </div>
                  <div className="font-body text-sm text-[oklch(0.7_0.03_258)] group-hover:text-[oklch(0.75_0.12_75)] transition-colors break-all">
                    enquiry@wealthtrustinvest.com
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-[oklch(0.75_0.12_75/0.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[oklch(0.75_0.12_75)]" />
                </div>
                <div>
                  <div className="font-body text-xs text-[oklch(0.55_0.04_258)] uppercase tracking-wider mb-0.5">
                    Hours
                  </div>
                  <div className="font-body text-sm text-[oklch(0.7_0.03_258)]">
                    Mon – Sun: 9AM – 5PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-[oklch(0.2_0.055_258)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-5">
          <p className="font-body text-xs text-[oklch(0.5_0.03_258)] leading-relaxed text-center mb-4">
            <span className="text-[oklch(0.75_0.12_75/0.8)] font-medium">
              Disclaimer:
            </span>{" "}
            Mutual fund investments are subject to market risks. Please read all
            scheme-related documents carefully before investing. Past
            performance is not an indicator of future returns.
          </p>

          <Separator className="bg-[oklch(0.22_0.06_258)] mb-4" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="font-body text-xs text-[oklch(0.5_0.03_258)]">
              © {currentYear} Pankhuri Tayal |{" "}
              <span className="text-[oklch(0.6_0.04_258)]">
                AMFI Registered Mutual Fund Distributor
              </span>
            </p>
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[oklch(0.45_0.03_258)] hover:text-[oklch(0.6_0.04_258)] transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
