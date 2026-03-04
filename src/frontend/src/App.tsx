import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { AdminPage } from "./pages/AdminPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { BlogListPage } from "./pages/BlogListPage";
import { HomePage } from "./pages/HomePage";

// ─── Scroll to top on route change ───────────────────────────────────────────
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  return null;
}

// ─── Root layout ─────────────────────────────────────────────────────────────
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.22 0.07 258)",
            border: "1px solid oklch(0.3 0.065 258)",
            color: "oklch(0.88 0.01 90)",
          },
        }}
      />
    </>
  );
}

// ─── Home layout (with Navbar, Footer, WhatsApp) ──────────────────────────────
function HomeLayout() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

// ─── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeLayout,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogListPage,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogDetailPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  blogRoute,
  blogDetailRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
