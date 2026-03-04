import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BookOpen, FileText } from "lucide-react";
import { motion } from "motion/react";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { usePublishedPosts } from "../hooks/useQueries";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function BlogListPage() {
  const { data: posts, isLoading, isError } = usePublishedPosts();

  return (
    <>
      <Navbar />

      <main>
        {/* Hero header */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[oklch(0.15_0.062_258)] overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[oklch(0.75_0.12_75/0.04)] blur-3xl rounded-full" />
          </div>

          <div className="relative z-10 container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[oklch(0.75_0.12_75/0.1)] border border-[oklch(0.75_0.12_75/0.3)] rounded-sm font-body text-xs text-[oklch(0.75_0.12_75)] uppercase tracking-widest">
                <BookOpen className="w-3 h-3" />
                Market Insights
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-semibold text-5xl md:text-6xl text-[oklch(0.92_0.01_90)] mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Blog
            </motion.h1>

            <motion.p
              className="font-body text-lg text-[oklch(0.65_0.04_258)] max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay informed with market insights, investment strategies, and
              financial planning tips from our experts.
            </motion.p>

            <motion.div
              className="mt-6 h-0.5 w-12 bg-gradient-to-r from-transparent via-[oklch(0.75_0.12_75)] to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            />
          </div>
        </section>

        {/* Blog grid */}
        <section
          data-ocid="blog.section"
          className="py-16 md:py-24 bg-[oklch(0.16_0.065_258)]"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            {isLoading ? (
              <div
                data-ocid="blog.loading_state"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : isError ? (
              <motion.div
                data-ocid="blog.error_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm"
              >
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-[oklch(0.88_0.01_90)] mb-2">
                  Unable to Load Posts
                </h3>
                <p className="font-body text-[oklch(0.6_0.04_258)]">
                  Something went wrong. Please try again later.
                </p>
              </motion.div>
            ) : !posts || posts.length === 0 ? (
              <motion.div
                data-ocid="blog.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm"
              >
                <FileText className="w-12 h-12 text-[oklch(0.75_0.12_75/0.4)] mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-[oklch(0.88_0.01_90)] mb-2">
                  No Posts Yet
                </h3>
                <p className="font-body text-[oklch(0.6_0.04_258)]">
                  We're working on some great content. Check back soon!
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                  hidden: {},
                }}
              >
                {posts.map((post, i) => (
                  <motion.div key={post.id.toString()} variants={fadeInUp}>
                    <BlogCard post={post} ocidIndex={i + 1} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
