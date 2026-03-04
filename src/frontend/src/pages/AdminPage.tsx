import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Post } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllPostsAdmin,
  useCreatePost,
  useDeletePost,
  useIsCallerAdmin,
  usePublishPost,
  useUnpublishPost,
  useUpdatePost,
} from "../hooks/useQueries";
import { formatDateShort } from "../utils/formatDate";

// ─── Types ───────────────────────────────────────────────────────────────────
interface PostFormData {
  title: string;
  body: string;
  coverImageUrl: string;
  published: boolean;
}

const emptyForm: PostFormData = {
  title: "",
  body: "",
  coverImageUrl: "",
  published: false,
};

// ─── AdminPage ─────────────────────────────────────────────────────────────────
export function AdminPage() {
  const { identity, loginStatus, login, clear, isInitializing } =
    useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: adminChecking } = useIsCallerAdmin();
  const { data: posts, isLoading: postsLoading } = useAllPostsAdmin();

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();
  const publishPost = usePublishPost();
  const unpublishPost = useUnpublishPost();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<PostFormData>(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);

  // ── Login states ──
  if (isInitializing) {
    return (
      <div
        data-ocid="admin.loading_state"
        className="min-h-screen bg-[oklch(0.16_0.065_258)] flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[oklch(0.75_0.12_75)] animate-spin" />
          <span className="font-body text-sm text-[oklch(0.65_0.04_258)]">
            Initializing...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[oklch(0.16_0.065_258)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="bg-[oklch(0.2_0.07_258)] border border-[oklch(0.28_0.06_258)] rounded-sm p-8 text-center shadow-[0_8px_40px_oklch(0.1_0.05_258/0.7)]">
            {/* Logo */}
            <div className="flex justify-center mb-5">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-[oklch(0.75_0.12_75/0.1)] blur-xl" />
                <img
                  src="/assets/uploads/WT-logo-1.png"
                  alt="Wealth Trust"
                  className="relative w-full h-full object-contain"
                />
              </div>
            </div>

            <h1 className="font-display font-semibold text-2xl text-[oklch(0.92_0.01_90)] mb-1">
              Admin Portal
            </h1>
            <p className="font-body text-sm text-[oklch(0.6_0.04_258)] mb-8">
              Wealth Trust Investment Services
            </p>

            {/* Gold separator */}
            <div className="mb-8 h-px bg-gradient-to-r from-transparent via-[oklch(0.75_0.12_75/0.4)] to-transparent" />

            <Button
              data-ocid="admin.login_button"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="w-full bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold py-3 h-auto rounded-sm shadow-[0_0_20px_oklch(0.75_0.12_75/0.25)] hover:shadow-[0_0_30px_oklch(0.75_0.12_75/0.4)] transition-all duration-300"
            >
              {loginStatus === "logging-in" ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Login with Internet Identity"
              )}
            </Button>

            <p className="mt-4 font-body text-xs text-[oklch(0.5_0.03_258)]">
              Secure authentication via Internet Identity
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (adminChecking) {
    return (
      <div
        data-ocid="admin.loading_state"
        className="min-h-screen bg-[oklch(0.16_0.065_258)] flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[oklch(0.75_0.12_75)] animate-spin" />
          <span className="font-body text-sm text-[oklch(0.65_0.04_258)]">
            Checking permissions...
          </span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[oklch(0.16_0.065_258)] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <ShieldAlert className="w-14 h-14 text-destructive mx-auto mb-4" />
          <h2 className="font-display font-semibold text-2xl text-[oklch(0.88_0.01_90)] mb-3">
            Access Denied
          </h2>
          <p className="font-body text-[oklch(0.6_0.04_258)] mb-6">
            You don't have admin access to this portal. Please contact the site
            administrator.
          </p>
          <Button
            variant="outline"
            onClick={clear}
            className="border-[oklch(0.35_0.065_258)] text-[oklch(0.7_0.03_258)] hover:bg-[oklch(0.22_0.07_258)] font-body rounded-sm"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── Admin dashboard ──

  function openCreate() {
    setEditingPost(null);
    setFormData(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(post: Post) {
    setEditingPost(post);
    setFormData({
      title: post.title,
      body: post.body,
      coverImageUrl: post.coverImageUrl ?? "",
      published: post.published,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const coverImageUrl = formData.coverImageUrl.trim() || null;
    try {
      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          title: formData.title,
          body: formData.body,
          coverImageUrl,
          published: formData.published,
        });
        toast.success("Post updated successfully");
      } else {
        await createPost.mutateAsync({
          title: formData.title,
          body: formData.body,
          coverImageUrl,
          published: formData.published,
        });
        toast.success("Post created successfully");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save post. Please try again.");
    }
  }

  async function handleDelete(post: Post) {
    try {
      await deletePost.mutateAsync(post.id);
      toast.success("Post deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete post");
    }
  }

  async function handleTogglePublish(post: Post) {
    try {
      if (post.published) {
        await unpublishPost.mutateAsync(post.id);
        toast.success("Post unpublished");
      } else {
        await publishPost.mutateAsync(post.id);
        toast.success("Post published");
      }
    } catch {
      toast.error("Failed to update publish status");
    }
  }

  const isSaving = createPost.isPending || updatePost.isPending;
  const sortedPosts = [...(posts ?? [])].sort((a, b) =>
    Number(b.createdAt - a.createdAt),
  );

  return (
    <div
      data-ocid="admin.section"
      className="min-h-screen bg-[oklch(0.16_0.065_258)]"
    >
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-[oklch(0.18_0.07_258/0.97)] backdrop-blur-xl border-b border-[oklch(0.28_0.06_258)] shadow-[0_2px_16px_oklch(0.1_0.05_258/0.5)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7">
              <img
                src="/assets/uploads/WT-logo-1.png"
                alt="WT"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display font-semibold text-base text-[oklch(0.92_0.01_90)]">
                Blog Admin
              </span>
              <span className="text-[oklch(0.5_0.03_258)] mx-2">·</span>
              <span className="font-body text-sm text-[oklch(0.65_0.04_258)]">
                Wealth Trust
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={clear}
            className="text-[oklch(0.65_0.04_258)] hover:text-[oklch(0.88_0.01_90)] hover:bg-[oklch(0.22_0.07_258)] font-body text-sm rounded-sm"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-semibold text-2xl md:text-3xl text-[oklch(0.92_0.01_90)]">
              Blog Posts
            </h1>
            <p className="font-body text-sm text-[oklch(0.6_0.04_258)] mt-1">
              {posts?.length ?? 0} total posts
            </p>
          </div>

          <Button
            data-ocid="admin.new_post_button"
            onClick={openCreate}
            className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold rounded-sm shadow-[0_0_16px_oklch(0.75_0.12_75/0.25)] transition-all duration-300"
          >
            <Plus className="mr-2 w-4 h-4" />
            New Post
          </Button>
        </div>

        {/* Posts list */}
        {postsLoading ? (
          <div data-ocid="admin.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2 mr-4">
                    <Skeleton className="h-5 w-2/3 bg-[oklch(0.24_0.07_258)]" />
                    <Skeleton className="h-3 w-32 bg-[oklch(0.24_0.07_258)]" />
                  </div>
                  <Skeleton className="h-8 w-24 bg-[oklch(0.24_0.07_258)]" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="text-center py-20 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm">
            <Plus className="w-12 h-12 text-[oklch(0.75_0.12_75/0.4)] mx-auto mb-4" />
            <h3 className="font-display font-semibold text-xl text-[oklch(0.88_0.01_90)] mb-2">
              No Posts Yet
            </h3>
            <p className="font-body text-[oklch(0.6_0.04_258)] mb-6">
              Create your first blog post to get started.
            </p>
            <Button
              onClick={openCreate}
              className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold rounded-sm"
            >
              <Plus className="mr-2 w-4 h-4" />
              Create First Post
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedPosts.map((post, i) => (
              <motion.div
                key={post.id.toString()}
                data-ocid={`admin.item.${i + 1}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group flex items-center gap-4 p-5 bg-[oklch(0.2_0.07_258)] border border-[oklch(0.26_0.065_258)] rounded-sm hover:border-[oklch(0.3_0.07_258)] transition-all duration-200"
              >
                {/* Publish toggle */}
                <div className="flex-shrink-0">
                  <Switch
                    data-ocid={`admin.publish_toggle.${i + 1}`}
                    checked={post.published}
                    onCheckedChange={() => handleTogglePublish(post)}
                    className="data-[state=checked]:bg-[oklch(0.75_0.12_75)]"
                  />
                </div>

                {/* Post info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-body font-medium text-[oklch(0.88_0.01_90)] truncate">
                      {post.title}
                    </h3>
                    <Badge
                      variant={post.published ? "default" : "secondary"}
                      className={`text-xs flex-shrink-0 rounded-sm ${
                        post.published
                          ? "bg-[oklch(0.75_0.12_75/0.15)] text-[oklch(0.75_0.12_75)] border border-[oklch(0.75_0.12_75/0.3)]"
                          : "bg-[oklch(0.28_0.065_258)] text-[oklch(0.65_0.04_258)] border border-[oklch(0.32_0.065_258)]"
                      }`}
                    >
                      {post.published ? (
                        <>
                          <Eye className="mr-1 w-3 h-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="mr-1 w-3 h-3" />
                          Draft
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="font-body text-xs text-[oklch(0.55_0.03_258)]">
                    {formatDateShort(post.createdAt)}
                    {post.coverImageUrl && (
                      <span className="ml-2 text-[oklch(0.75_0.12_75/0.6)]">
                        · Has cover image
                      </span>
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    data-ocid={`admin.edit_button.${i + 1}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(post)}
                    className="w-8 h-8 text-[oklch(0.65_0.04_258)] hover:text-[oklch(0.75_0.12_75)] hover:bg-[oklch(0.22_0.07_258)] rounded-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    data-ocid={`admin.delete_button.${i + 1}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(post)}
                    className="w-8 h-8 text-[oklch(0.65_0.04_258)] hover:text-destructive hover:bg-[oklch(0.577_0.245_27.325/0.1)] rounded-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ── Create / Edit Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-ocid="admin.dialog"
          className="bg-[oklch(0.2_0.07_258)] border-[oklch(0.28_0.06_258)] max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-semibold text-xl text-[oklch(0.92_0.01_90)]">
              {editingPost ? "Edit Post" : "New Blog Post"}
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-[oklch(0.6_0.04_258)]">
              {editingPost
                ? "Update the post details below."
                : "Fill in the details for your new blog post."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            {/* Title */}
            <div className="space-y-1.5">
              <Label
                htmlFor="post-title"
                className="font-body text-sm font-medium text-[oklch(0.78_0.02_258)]"
              >
                Title <span className="text-[oklch(0.75_0.12_75)]">*</span>
              </Label>
              <input
                id="post-title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Enter post title..."
                className="w-full px-4 py-2.5 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.28_0.06_258)] rounded-sm font-body text-sm text-[oklch(0.88_0.01_90)] placeholder:text-[oklch(0.45_0.03_258)] focus:outline-none focus:border-[oklch(0.75_0.12_75)] focus:ring-1 focus:ring-[oklch(0.75_0.12_75/0.3)] transition-all"
              />
            </div>

            {/* Cover Image URL */}
            <div className="space-y-1.5">
              <Label
                htmlFor="post-cover"
                className="font-body text-sm font-medium text-[oklch(0.78_0.02_258)]"
              >
                Cover Image URL
                <span className="ml-1 font-body text-xs text-[oklch(0.55_0.03_258)] font-normal">
                  (optional)
                </span>
              </Label>
              <input
                id="post-cover"
                type="url"
                value={formData.coverImageUrl}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, coverImageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.28_0.06_258)] rounded-sm font-body text-sm text-[oklch(0.88_0.01_90)] placeholder:text-[oklch(0.45_0.03_258)] focus:outline-none focus:border-[oklch(0.75_0.12_75)] focus:ring-1 focus:ring-[oklch(0.75_0.12_75/0.3)] transition-all"
              />
            </div>

            {/* Body */}
            <div className="space-y-1.5">
              <Label
                htmlFor="post-body"
                className="font-body text-sm font-medium text-[oklch(0.78_0.02_258)]"
              >
                Body (HTML){" "}
                <span className="text-[oklch(0.75_0.12_75)]">*</span>
              </Label>
              <textarea
                id="post-body"
                required
                rows={12}
                value={formData.body}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, body: e.target.value }))
                }
                placeholder="<p>Write your blog post content here...</p>"
                className="w-full px-4 py-2.5 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.28_0.06_258)] rounded-sm font-body text-sm text-[oklch(0.88_0.01_90)] placeholder:text-[oklch(0.45_0.03_258)] focus:outline-none focus:border-[oklch(0.75_0.12_75)] focus:ring-1 focus:ring-[oklch(0.75_0.12_75/0.3)] transition-all resize-none font-mono"
              />
              <p className="font-body text-xs text-[oklch(0.5_0.03_258)]">
                Supports HTML markup for rich formatting.
              </p>
            </div>

            {/* Published toggle */}
            <div className="flex items-center justify-between p-4 bg-[oklch(0.16_0.065_258)] border border-[oklch(0.26_0.065_258)] rounded-sm">
              <div>
                <Label className="font-body text-sm font-medium text-[oklch(0.78_0.02_258)]">
                  Publish Post
                </Label>
                <p className="font-body text-xs text-[oklch(0.55_0.03_258)]">
                  {formData.published
                    ? "Post will be visible to all visitors"
                    : "Post will be saved as draft"}
                </p>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData((p) => ({ ...p, published: checked }))
                }
                className="data-[state=checked]:bg-[oklch(0.75_0.12_75)]"
              />
            </div>

            <DialogFooter className="gap-3 pt-2">
              <Button
                type="button"
                data-ocid="admin.cancel_button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                disabled={isSaving}
                className="font-body text-[oklch(0.65_0.04_258)] hover:text-[oklch(0.88_0.01_90)] hover:bg-[oklch(0.22_0.07_258)] rounded-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="admin.submit_button"
                disabled={isSaving}
                className="bg-[oklch(0.75_0.12_75)] text-[oklch(0.14_0.06_258)] hover:bg-[oklch(0.82_0.14_78)] font-body font-semibold rounded-sm shadow-[0_0_16px_oklch(0.75_0.12_75/0.25)] transition-all duration-200"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : editingPost ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ── */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="bg-[oklch(0.2_0.07_258)] border-[oklch(0.28_0.06_258)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display font-semibold text-xl text-[oklch(0.92_0.01_90)]">
              Delete Post?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-[oklch(0.65_0.04_258)]">
              This will permanently delete{" "}
              <span className="text-[oklch(0.88_0.01_90)] font-medium">
                "{deleteTarget?.title}"
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.cancel_button"
              className="bg-transparent border-[oklch(0.32_0.065_258)] text-[oklch(0.7_0.03_258)] hover:bg-[oklch(0.22_0.07_258)] font-body rounded-sm"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.confirm_button"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              disabled={deletePost.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body font-semibold rounded-sm"
            >
              {deletePost.isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Post"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
