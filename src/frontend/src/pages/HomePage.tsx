import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  Phone,
  PieChart,
  RefreshCw,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { BlogCard } from "../components/BlogCard";
import { usePublishedPosts } from "../hooks/useQueries";

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function Section({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Services Data ────────────────────────────────────────────────────────────
const services = [
  {
    icon: TrendingUp,
    title: "Mutual Fund Investment",
    description:
      "Curated mutual fund portfolios aligned with your risk profile and financial goals.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Management",
    description:
      "Professional portfolio management services with disciplined rebalancing strategies.",
  },
  {
    icon: PieChart,
    title: "Alternate Investment Funds",
    description:
      "Access to curated AIF opportunities for high-net-worth investors seeking alpha.",
  },
  {
    icon: Zap,
    title: "Single Technology Platform",
    description:
      "Manage all your investments in one intuitive platform with real-time insights.",
  },
  {
    icon: Users,
    title: "Personalized Customer Service",
    description:
      "Dedicated relationship managers who understand your unique financial journey.",
  },
  {
    icon: RefreshCw,
    title: "Regular Market Updates",
    description:
      "Timely market analysis and portfolio reviews to keep your investments on track.",
  },
];

// ─── HomePage ─────────────────────────────────────────────────────────────────
export function HomePage() {
  const { data: posts, isLoading: postsLoading } = usePublishedPosts();
  const previewPosts = posts?.slice(0, 3) ?? [];

  function scrollTo(id: string) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      {/* ── Hero ── */}
      <section
        id="home"
        data-ocid="hero.section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/assets/generated/hero-bg.dim_1600x900.jpg)",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.055_258/0.92)] via-[oklch(0.14_0.06_258/0.85)] to-[oklch(0.16_0.065_258/0.95)]" />
        {/* Gold accent lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[oklch(0.75_0.12_75/0.12)] to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[oklch(0.75_0.12_75/0.08)] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[oklch(0.75_0.12_75/0.1)] border border-[oklch(0.75_0.12_75/0.35)] rounded-sm font-body text-xs font-medium text-[oklch(0.75_0.12_75)] uppercase tracking-widest">
              <Star className="w-3 h-3" />
              AMFI Registered Mutual Fund Distributor
            </span>
          </motion.div>

          <motion.h1
            className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl text-[oklch(0.94_0.01_90)] leading-[1.08] tracking-tight mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Your Trusted Partner in{" "}
            <span className="text-[oklch(0.75_0.12_75)] relative">
              Wealth Creation
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.75_0.12_75/0.8)] to-transparent" />
            </span>
          </motion.h1>

          <motion.p
            className="font-body text-lg sm:text-xl text-[oklch(0.72_0.03_258)] max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We provide personalized investment solutions tailored to your goals,
            risk appetite, and life stage.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Button
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("#contact")}
              className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold text-base px-8 py-3 h-auto rounded-sm shadow-[0_0_30px_oklch(0.75_0.12_75/0.35)] hover:shadow-[0_0_40px_oklch(0.75_0.12_75/0.5)] transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              variant="outline"
              onClick={() => scrollTo("#services")}
              className="border-[oklch(0.75_0.12_75/0.5)] text-[oklch(0.85_0.015_90)] hover:bg-[oklch(0.75_0.12_75/0.1)] hover:border-[oklch(0.75_0.12_75)] font-body font-medium text-base px-8 py-3 h-auto rounded-sm bg-transparent transition-all duration-300"
            >
              Our Services
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { label: "AMFI Registered", sub: "Certified Distributor" },
              { label: "All Asset Classes", sub: "Comprehensive Range" },
              { label: "Client-First", sub: "Personalized Approach" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 bg-[oklch(0.18_0.065_258/0.6)] border border-[oklch(0.28_0.06_258/0.6)] rounded-sm backdrop-blur-sm"
              >
                <div className="font-display font-semibold text-xl md:text-2xl text-[oklch(0.75_0.12_75)] mb-1">
                  {stat.label}
                </div>
                <div className="font-body text-xs text-[oklch(0.6_0.04_258)] text-center">
                  {stat.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollTo("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[oklch(0.5_0.04_258)] hover:text-[oklch(0.75_0.12_75)] transition-colors z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5 }}
        >
          <span className="font-body text-xs uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        data-ocid="about.section"
        className="py-20 md:py-32 bg-[oklch(0.17_0.066_258)]"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Logo with decorative treatment */}
            <Section className="relative flex items-center justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full border border-[oklch(0.75_0.12_75/0.15)] animate-float" />
                <div className="absolute inset-4 rounded-full border border-[oklch(0.75_0.12_75/0.1)]" />
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-[oklch(0.75_0.12_75/0.05)] blur-2xl" />
                {/* Logo */}
                <motion.div
                  className="absolute inset-8 flex items-center justify-center"
                  variants={fadeInUp}
                >
                  <img
                    src="/assets/generated/wealthtrust-logo-transparent.dim_400x400.png"
                    alt="Wealth Trust"
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_oklch(0.75_0.12_75/0.4)]"
                  />
                </motion.div>

                {/* Value prop mini-cards */}
                <motion.div
                  className="absolute -left-4 top-1/4 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.28_0.06_258)] rounded-sm p-3 shadow-navy"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { delay: 0.4 } },
                  }}
                >
                  <div className="font-body text-xs text-[oklch(0.75_0.12_75)] font-semibold">
                    15+ Years
                  </div>
                  <div className="font-body text-xs text-[oklch(0.6_0.04_258)]">
                    Combined Expertise
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-4 bottom-1/4 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.28_0.06_258)] rounded-sm p-3 shadow-navy"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { delay: 0.5 } },
                  }}
                >
                  <div className="font-body text-xs text-[oklch(0.75_0.12_75)] font-semibold">
                    Holistic
                  </div>
                  <div className="font-body text-xs text-[oklch(0.6_0.04_258)]">
                    Wealth Planning
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* Right: Content */}
            <Section>
              <motion.div variants={fadeInUp} className="mb-3">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.12_75)] font-medium">
                  About Us
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="font-display font-semibold text-4xl md:text-5xl text-[oklch(0.92_0.01_90)] leading-tight mb-6"
              >
                Your Trusted Partner in{" "}
                <span className="text-[oklch(0.75_0.12_75)]">
                  Wealth Creation
                </span>
              </motion.h2>

              <motion.div variants={fadeInUp} className="space-y-4 mb-8">
                <p className="font-body text-[oklch(0.68_0.04_258)] leading-relaxed">
                  Wealth Trust Investment Services is led by Pankhuri Tayal, an
                  AMFI Registered Mutual Fund Distributor dedicated to helping
                  individuals and families build lasting financial security.
                </p>
                <p className="font-body text-[oklch(0.68_0.04_258)] leading-relaxed">
                  We believe every investor deserves a personalized strategy.
                  Our approach combines deep market knowledge with a genuine
                  understanding of your life goals — be it education,
                  retirement, or legacy planning.
                </p>
                <p className="font-body text-[oklch(0.68_0.04_258)] leading-relaxed">
                  From mutual funds to portfolio management and alternate
                  investments, we offer comprehensive solutions under one roof,
                  with transparent communication at every step.
                </p>
              </motion.div>

              {/* Value cards grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                {[
                  {
                    icon: Users,
                    title: "Client-First",
                    desc: "Your goals are our priority",
                  },
                  {
                    icon: Shield,
                    title: "Transparent",
                    desc: "No hidden charges ever",
                  },
                  {
                    icon: Star,
                    title: "Expert Guidance",
                    desc: "AMFI certified expertise",
                  },
                  {
                    icon: TrendingUp,
                    title: "Long-Term Focus",
                    desc: "Built for lasting wealth",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className="flex items-start gap-3 p-4 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm hover:border-[oklch(0.75_0.12_75/0.3)] transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4 text-[oklch(0.75_0.12_75)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-body text-sm font-semibold text-[oklch(0.85_0.01_90)]">
                        {item.title}
                      </div>
                      <div className="font-body text-xs text-[oklch(0.6_0.04_258)]">
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  data-ocid="about.cta_button"
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold px-7 py-3 h-auto rounded-sm shadow-[0_0_20px_oklch(0.75_0.12_75/0.25)] hover:shadow-[0_0_30px_oklch(0.75_0.12_75/0.4)] transition-all duration-300"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </Section>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        id="services"
        data-ocid="services.section"
        className="py-20 md:py-32 bg-[oklch(0.16_0.065_258)]"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <Section className="text-center mb-14">
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.12_75)] font-medium">
                What We Offer
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-4xl md:text-5xl text-[oklch(0.92_0.01_90)] leading-tight"
            >
              Comprehensive Investment Solutions
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="mt-4 h-0.5 w-16 bg-gradient-to-r from-transparent via-[oklch(0.75_0.12_75)] to-transparent mx-auto"
            />
          </Section>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                data-ocid={`services.item.${i + 1}`}
                variants={fadeInUp}
                className="group p-6 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm hover:border-[oklch(0.75_0.12_75/0.4)] hover:bg-[oklch(0.22_0.07_258)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_32px_oklch(0.1_0.05_258/0.6)]"
              >
                <div className="w-10 h-10 rounded-sm bg-[oklch(0.75_0.12_75/0.1)] border border-[oklch(0.75_0.12_75/0.2)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.75_0.12_75/0.2)] transition-colors duration-200">
                  <service.icon className="w-5 h-5 text-[oklch(0.75_0.12_75)]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[oklch(0.88_0.01_90)] mb-2 group-hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-[oklch(0.6_0.04_258)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-[oklch(0.17_0.066_258)]">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-sm border border-[oklch(0.75_0.12_75/0.3)] bg-[oklch(0.18_0.07_258)] p-10 md:p-14 text-center shadow-[0_0_60px_oklch(0.75_0.12_75/0.08)]"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[oklch(0.75_0.12_75/0.6)] rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[oklch(0.75_0.12_75/0.6)] rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[oklch(0.75_0.12_75/0.6)] rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[oklch(0.75_0.12_75/0.6)] rounded-br-sm" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-[oklch(0.75_0.12_75/0.1)] border border-[oklch(0.75_0.12_75/0.3)] rounded-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.75_0.12_75)]" />
                <span className="font-body text-xs text-[oklch(0.75_0.12_75)] font-medium">
                  Free Consultation Available
                </span>
              </div>

              <h2 className="font-display font-semibold text-3xl md:text-4xl text-[oklch(0.92_0.01_90)] mb-4">
                Need Expert Investment Advice?
              </h2>
              <p className="font-body text-[oklch(0.68_0.04_258)] mb-8 max-w-lg mx-auto leading-relaxed">
                Schedule a free consultation with Pankhuri Tayal and discover
                the right investment strategy for your financial goals.
              </p>

              <a
                href="mailto:enquiry@wealthtrustinvest.com"
                data-ocid="cta.button"
              >
                <Button className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold px-8 py-3 h-auto rounded-sm shadow-[0_0_30px_oklch(0.75_0.12_75/0.3)] hover:shadow-[0_0_40px_oklch(0.75_0.12_75/0.5)] transition-all duration-300">
                  Contact Us Today
                  <Mail className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section
        data-ocid="blog-preview.section"
        className="py-20 md:py-32 bg-[oklch(0.16_0.065_258)]"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <Section className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <motion.div variants={fadeInUp} className="mb-2">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.12_75)] font-medium">
                  Insights & Analysis
                </span>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-display font-semibold text-4xl md:text-5xl text-[oklch(0.92_0.01_90)]"
              >
                From Our Blog
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-[oklch(0.75_0.12_75)] hover:gap-3 transition-all duration-200"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </Section>

          {postsLoading ? (
            <div
              data-ocid="blog-preview.loading_state"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm overflow-hidden"
                >
                  <Skeleton className="h-48 w-full bg-[oklch(0.24_0.07_258)]" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-3 w-24 bg-[oklch(0.24_0.07_258)]" />
                    <Skeleton className="h-5 w-full bg-[oklch(0.24_0.07_258)]" />
                    <Skeleton className="h-5 w-3/4 bg-[oklch(0.24_0.07_258)]" />
                    <Skeleton className="h-4 w-full bg-[oklch(0.24_0.07_258)]" />
                    <Skeleton className="h-4 w-2/3 bg-[oklch(0.24_0.07_258)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : previewPosts.length === 0 ? (
            <motion.div
              data-ocid="blog-preview.empty_state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm"
            >
              <FileText className="w-12 h-12 text-[oklch(0.75_0.12_75/0.4)] mx-auto mb-4" />
              <p className="font-body text-[oklch(0.6_0.04_258)]">
                Blog posts coming soon. Check back for market insights and
                updates.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
            >
              {previewPosts.map((post, i) => (
                <motion.div key={post.id.toString()} variants={fadeInUp}>
                  <BlogCard post={post} ocidIndex={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        data-ocid="contact.section"
        className="py-20 md:py-32 bg-[oklch(0.17_0.066_258)]"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <Section className="text-center mb-14">
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.12_75)] font-medium">
                Get In Touch
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display font-semibold text-4xl md:text-5xl text-[oklch(0.92_0.01_90)]"
            >
              Let's Talk About Your Financial Future
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 font-body text-lg text-[oklch(0.65_0.04_258)] max-w-xl mx-auto"
            >
              Reach out to schedule a consultation or ask any questions you
              have.
            </motion.p>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact info cards */}
            <Section className="flex flex-col gap-4">
              {[
                {
                  icon: Phone,
                  title: "Call Us",
                  value: "+91 96509 03201",
                  sub: "Mon–Sun, 9AM–5PM",
                  href: "tel:+919650903201",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  value: "enquiry@wealthtrustinvest.com",
                  sub: "We'll reply within 24 hours",
                  href: "mailto:enquiry@wealthtrustinvest.com",
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  value: "Monday – Sunday",
                  sub: "9:00 AM – 5:00 PM",
                  href: null,
                },
              ].map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href ?? undefined}
                  variants={fadeInUp}
                  className={`flex items-start gap-5 p-6 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm transition-all duration-200 ${
                    item.href
                      ? "hover:border-[oklch(0.75_0.12_75/0.4)] hover:bg-[oklch(0.22_0.07_258)] cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div className="w-12 h-12 rounded-sm bg-[oklch(0.75_0.12_75/0.1)] border border-[oklch(0.75_0.12_75/0.2)] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[oklch(0.75_0.12_75)]" />
                  </div>
                  <div>
                    <div className="font-body text-xs uppercase tracking-wider text-[oklch(0.6_0.04_258)] mb-1">
                      {item.title}
                    </div>
                    <div className="font-body font-medium text-[oklch(0.88_0.01_90)] mb-0.5 break-all">
                      {item.value}
                    </div>
                    <div className="font-body text-sm text-[oklch(0.6_0.04_258)]">
                      {item.sub}
                    </div>
                  </div>
                </motion.a>
              ))}
            </Section>

            {/* Contact form */}
            <Section>
              <motion.form
                variants={fadeInUp}
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = (
                    form.elements.namedItem("name") as HTMLInputElement
                  ).value;
                  const email = (
                    form.elements.namedItem("email") as HTMLInputElement
                  ).value;
                  const message = (
                    form.elements.namedItem("message") as HTMLTextAreaElement
                  ).value;
                  const subject = encodeURIComponent(
                    `Investment Inquiry from ${name}`,
                  );
                  const body = encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                  );
                  window.location.href = `mailto:enquiry@wealthtrustinvest.com?subject=${subject}&body=${body}`;
                }}
                className="bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm p-6 md:p-8 space-y-5"
              >
                <div>
                  <label
                    className="block font-body text-sm font-medium text-[oklch(0.78_0.02_258)] mb-2"
                    htmlFor="contact-name"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    data-ocid="contact.name_input"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.28_0.06_258)] rounded-sm font-body text-sm text-[oklch(0.85_0.01_90)] placeholder:text-[oklch(0.5_0.03_258)] focus:outline-none focus:border-[oklch(0.75_0.12_75)] focus:ring-1 focus:ring-[oklch(0.75_0.12_75/0.3)] transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    className="block font-body text-sm font-medium text-[oklch(0.78_0.02_258)] mb-2"
                    htmlFor="contact-email"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    data-ocid="contact.email_input"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.28_0.06_258)] rounded-sm font-body text-sm text-[oklch(0.85_0.01_90)] placeholder:text-[oklch(0.5_0.03_258)] focus:outline-none focus:border-[oklch(0.75_0.12_75)] focus:ring-1 focus:ring-[oklch(0.75_0.12_75/0.3)] transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    className="block font-body text-sm font-medium text-[oklch(0.78_0.02_258)] mb-2"
                    htmlFor="contact-message"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    data-ocid="contact.message_input"
                    placeholder="Tell us about your financial goals..."
                    className="w-full px-4 py-3 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.28_0.06_258)] rounded-sm font-body text-sm text-[oklch(0.85_0.01_90)] placeholder:text-[oklch(0.5_0.03_258)] focus:outline-none focus:border-[oklch(0.75_0.12_75)] focus:ring-1 focus:ring-[oklch(0.75_0.12_75/0.3)] transition-all duration-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="w-full bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold py-3 h-auto rounded-sm shadow-[0_0_20px_oklch(0.75_0.12_75/0.25)] hover:shadow-[0_0_30px_oklch(0.75_0.12_75/0.4)] transition-all duration-300"
                >
                  Send Message
                  <Mail className="ml-2 w-4 h-4" />
                </Button>

                <p className="font-body text-xs text-[oklch(0.5_0.03_258)] text-center">
                  This will open your email client to send us a message.
                </p>
              </motion.form>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}
