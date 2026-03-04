import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Post = {
    id : Nat;
    title : Text;
    body : Text;
    coverImageUrl : ?Text;
    published : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  let blogPosts = Map.empty<Nat, Post>();
  var nextPostId = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Blog post management functions
  public shared ({ caller }) func createPost(
    title : Text,
    body : Text,
    coverImageUrl : ?Text,
    published : Bool,
  ) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };

    let postId = nextPostId;
    nextPostId += 1;

    let newPost : Post = {
      id = postId;
      title;
      body;
      coverImageUrl;
      published;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    blogPosts.add(postId, newPost);
    postId;
  };

  public shared ({ caller }) func updatePost(
    id : Nat,
    title : Text,
    body : Text,
    coverImageUrl : ?Text,
    published : Bool,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update posts");
    };

    let existingPost = switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) { post };
    };

    let updatedPost : Post = {
      existingPost with
      title;
      body;
      coverImageUrl;
      published;
      updatedAt = Time.now();
    };

    blogPosts.add(id, updatedPost);
  };

  public shared ({ caller }) func deletePost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };

    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Post not found");
    };

    blogPosts.remove(id);
  };

  public shared ({ caller }) func publishPost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can publish posts");
    };

    let existingPost = switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) { post };
    };

    if (existingPost.published) {
      Runtime.trap("Post is already published");
    };

    blogPosts.add(id, { existingPost with published = true; updatedAt = Time.now() });
  };

  public shared ({ caller }) func unpublishPost(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can unpublish posts");
    };

    let existingPost = switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) { post };
    };

    if (not existingPost.published) {
      Runtime.trap("Post is already unpublished");
    };

    blogPosts.add(id, { existingPost with published = false; updatedAt = Time.now() });
  };

  public query ({ caller }) func getAllPostsAdmin() : async [Post] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all posts");
    };

    blogPosts.values().toArray();
  };

  public query func getPublishedPosts() : async [Post] {
    blogPosts.values().toArray().filter(
      func(post) {
        post.published;
      }
    );
  };

  public query func getPostById(id : Nat) : async ?Post {
    switch (blogPosts.get(id)) {
      case (null) { null };
      case (?post) {
        if (not post.published) {
          null;
        } else {
          ?post;
        };
      };
    };
  };

  public query ({ caller }) func getPostForEditAdmin(id : Nat) : async ?Post {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view unpublished posts");
    };
    blogPosts.get(id);
  };
};
