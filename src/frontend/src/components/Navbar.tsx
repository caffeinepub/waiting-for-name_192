import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);

    // Handle anchor links on home page
    if (href.startsWith("/#")) {
      const anchor = href.slice(1);
      if (isHome) {
        const el = document.querySelector(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  }

  function handleClientLogin() {
    setMobileOpen(false);
    window.open(
      "https://login.wealthtrustinvest.com/login",
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.16_0.065_258/0.97)] backdrop-blur-xl shadow-[0_4px_24px_oklch(0.1_0.05_258/0.6)] border-b border-[oklch(0.28_0.06_258)]"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-md bg-white p-1 shadow-sm">
                <img
                  src="/assets/uploads/wt-1.webp"
                  alt="Wealth Trust Logo"
                  className="w-full h-full object-contain"
                  style={{ display: "block", minWidth: 40, minHeight: 40 }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-lg md:text-xl text-[oklch(0.92_0.01_90)] tracking-tight group-hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200">
                  Wealth Trust
                </span>
                <span className="font-body text-[10px] text-[oklch(0.65_0.04_258)] uppercase tracking-widest hidden sm:block">
                  Investment Services
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 font-body text-sm font-medium text-[oklch(0.75_0.02_258)] hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[oklch(0.75_0.12_75)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                data-ocid="nav.client_login_button"
                onClick={handleClientLogin}
                className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold text-sm px-5 py-2 rounded-sm transition-all duration-200 shadow-[0_0_20px_oklch(0.75_0.12_75/0.25)] hover:shadow-[0_0_30px_oklch(0.75_0.12_75/0.4)]"
              >
                Client Login
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="nav.mobile_toggle"
              className="md:hidden p-2 rounded-sm text-[oklch(0.75_0.02_258)] hover:text-[oklch(0.75_0.12_75)] hover:bg-[oklch(0.22_0.07_258)] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="bg-[oklch(0.18_0.07_258)] border-l border-[oklch(0.28_0.06_258)] w-72"
        >
          <SheetHeader className="border-b border-[oklch(0.28_0.06_258)] pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-display text-xl text-[oklch(0.92_0.01_90)]">
                Wealth Trust
              </SheetTitle>
              <SheetClose asChild>
                <button
                  type="button"
                  className="p-1.5 rounded-sm text-[oklch(0.65_0.04_258)] hover:text-[oklch(0.92_0.01_90)] hover:bg-[oklch(0.22_0.07_258)] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                className="flex flex-col gap-1 mt-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                  hidden: {},
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <a
                      href={link.href}
                      data-ocid={`nav.link.${i + 1}`}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center px-3 py-3 font-body text-base font-medium text-[oklch(0.78_0.02_258)] hover:text-[oklch(0.75_0.12_75)] hover:bg-[oklch(0.22_0.07_258)] rounded-sm transition-all duration-200 group"
                    >
                      <span className="mr-3 w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.12_75)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-4 mt-2 border-t border-[oklch(0.28_0.06_258)]"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Button
                    data-ocid="nav.client_login_button"
                    onClick={handleClientLogin}
                    className="w-full bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold rounded-sm"
                  >
                    Client Login
                  </Button>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </>
  );
}
