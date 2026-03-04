import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import type { Post } from "../backend.d";
import { formatDateShort, getExcerpt } from "../utils/formatDate";

interface BlogCardProps {
  post: Post;
  index?: number;
  ocidIndex?: number;
}

export function BlogCard({ post, ocidIndex = 1 }: BlogCardProps) {
  const excerpt = getExcerpt(post.body, 160);
  const dateStr = formatDateShort(post.createdAt);

  return (
    <motion.article
      data-ocid={`blog.item.${ocidIndex}`}
      className="group relative bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm overflow-hidden hover:border-[oklch(0.75_0.12_75/0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_oklch(0.1_0.05_258/0.8),0_0_0_1px_oklch(0.75_0.12_75/0.1)]"
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden bg-[oklch(0.22_0.07_258)]">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.22_0.07_258)] to-[oklch(0.18_0.065_258)]">
            <div className="font-display text-4xl text-[oklch(0.75_0.12_75/0.3)] font-semibold">
              WT
            </div>
          </div>
        )}
        {/* Gold gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[oklch(0.2_0.07_258)] to-transparent" />
      </div>

      <div className="p-5">
        {/* Date */}
        <div className="flex items-center gap-1.5 mb-3">
          <Calendar className="w-3.5 h-3.5 text-[oklch(0.75_0.12_75)]" />
          <span className="font-body text-xs text-[oklch(0.6_0.04_258)]">
            {dateStr}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-lg text-[oklch(0.92_0.01_90)] leading-snug mb-3 line-clamp-2 group-hover:text-[oklch(0.75_0.12_75)] transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-sm text-[oklch(0.6_0.04_258)] leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read More */}
        <Link
          to="/blog/$id"
          params={{ id: post.id.toString() }}
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-[oklch(0.75_0.12_75)] hover:gap-2.5 transition-all duration-200 group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Gold line at bottom on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.75_0.12_75)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  );
}
