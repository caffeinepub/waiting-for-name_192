import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { usePostById } from "../hooks/useQueries";
import { formatDate } from "../utils/formatDate";

export function BlogDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const postId = id ? BigInt(id) : null;
  const { data: post, isLoading, isError } = usePostById(postId);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="pt-24 md:pt-32 pb-16 bg-[oklch(0.16_0.065_258)]">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-body text-sm text-[oklch(0.65_0.04_258)] hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Blog
              </Link>
            </motion.div>

            {isLoading ? (
              <div data-ocid="blog-detail.loading_state" className="space-y-6">
                <Skeleton className="h-8 w-3/4 bg-[oklch(0.24_0.07_258)]" />
                <Skeleton className="h-4 w-32 bg-[oklch(0.24_0.07_258)]" />
                <Skeleton className="h-64 w-full bg-[oklch(0.24_0.07_258)] rounded-sm" />
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-4 w-full bg-[oklch(0.24_0.07_258)]"
                    />
                  ))}
                  <Skeleton className="h-4 w-2/3 bg-[oklch(0.24_0.07_258)]" />
                </div>
              </div>
            ) : isError ? (
              <motion.div
                data-ocid="blog-detail.error_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm"
              >
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-[oklch(0.88_0.01_90)] mb-2">
                  Failed to Load Post
                </h3>
                <p className="font-body text-[oklch(0.6_0.04_258)]">
                  Something went wrong loading this article. Please try again.
                </p>
              </motion.div>
            ) : !post ? (
              <motion.div
                data-ocid="blog-detail.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm"
              >
                <FileText className="w-12 h-12 text-[oklch(0.75_0.12_75/0.4)] mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-[oklch(0.88_0.01_90)] mb-2">
                  Post Not Found
                </h3>
                <p className="font-body text-[oklch(0.6_0.04_258)]">
                  This article doesn't exist or has been removed.
                </p>
                <Link
                  to="/blog"
                  className="mt-4 inline-flex items-center gap-2 font-body text-sm text-[oklch(0.75_0.12_75)] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View all posts
                </Link>
              </motion.div>
            ) : (
              <motion.article
                data-ocid="blog-detail.section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Meta */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[oklch(0.75_0.12_75)]" />
                    <span className="font-body text-sm text-[oklch(0.6_0.04_258)]">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  {post.updatedAt !== post.createdAt && (
                    <div className="flex items-center gap-1.5 text-[oklch(0.5_0.03_258)]">
                      <Clock className="w-3 h-3" />
                      <span className="font-body text-xs">
                        Updated {formatDate(post.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-display font-semibold text-4xl md:text-5xl text-[oklch(0.94_0.01_90)] leading-tight mb-8">
                  {post.title}
                </h1>

                {/* Cover image */}
                {post.coverImageUrl && (
                  <div className="relative mb-10 rounded-sm overflow-hidden border border-[oklch(0.26_0.065_258)]">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                    {/* Gold shimmer at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[oklch(0.16_0.065_258)] to-transparent" />
                  </div>
                )}

                {/* Gold separator */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-px flex-1 bg-[oklch(0.26_0.065_258)]" />
                  <div className="w-2 h-2 rotate-45 bg-[oklch(0.75_0.12_75)]" />
                  <div className="h-px flex-1 bg-[oklch(0.26_0.065_258)]" />
                </div>

                {/* Body */}
                <div
                  className="prose prose-lg max-w-none"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: blog body is admin-managed HTML content
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />

                {/* Footer separator */}
                <div className="mt-12 pt-8 border-t border-[oklch(0.26_0.065_258)] flex items-center justify-between">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 font-body text-sm text-[oklch(0.65_0.04_258)] hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200 group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Blog
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-px bg-[oklch(0.75_0.12_75/0.5)]" />
                    <span className="font-body text-xs text-[oklch(0.5_0.03_258)]">
                      Wealth Trust
                    </span>
                  </div>
                </div>
              </motion.article>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
