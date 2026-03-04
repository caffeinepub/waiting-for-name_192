import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Post {
    id: bigint;
    coverImageUrl?: string;
    title: string;
    body: string;
    published: boolean;
    createdAt: bigint;
    updatedAt: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, body: string, coverImageUrl: string | null, published: boolean): Promise<bigint>;
    deletePost(id: bigint): Promise<void>;
    getAllPostsAdmin(): Promise<Array<Post>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPostById(id: bigint): Promise<Post | null>;
    getPostForEditAdmin(id: bigint): Promise<Post | null>;
    getPublishedPosts(): Promise<Array<Post>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    publishPost(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    unpublishPost(id: bigint): Promise<void>;
    updatePost(id: bigint, title: string, body: string, coverImageUrl: string | null, published: boolean): Promise<void>;
}
