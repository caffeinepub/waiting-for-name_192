import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../backend.d";
import { useActor } from "./useActor";

// ─── Queries ────────────────────────────────────────────────────────────────

export function usePublishedPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["publishedPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedPosts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function usePostById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Post | null>({
    queryKey: ["post", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getPostById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 60_000,
  });
}

export function useAllPostsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["allPostsAdmin"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPostsAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      body: string;
      coverImageUrl: string | null;
      published: boolean;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createPost(
        data.title,
        data.body,
        data.coverImageUrl,
        data.published,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPostsAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      body: string;
      coverImageUrl: string | null;
      published: boolean;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updatePost(
        data.id,
        data.title,
        data.body,
        data.coverImageUrl,
        data.published,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPostsAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPostsAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
    },
  });
}

export function usePublishPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.publishPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPostsAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
    },
  });
}

export function useUnpublishPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.unpublishPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPostsAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
    },
  });
}
