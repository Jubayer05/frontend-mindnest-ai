import type { AuthUser } from "@/types/auth";
import type { AppSidebarMenuProps } from "@/types/sidebar";

export function getAdminSidebarMenu(
  user: AuthUser | null,
): AppSidebarMenuProps {
  return {
    navMain: [
      {
        title: "Overview",
        url: "/admin",
        icon: "LayoutDashboard",
        isActive: true,
        items: [{ title: "Dashboard", url: "/admin" }],
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: "Users",
        isActive: false,
        items: [{ title: "All users", url: "/admin/users" }],
      },
      {
        title: "Bookings",
        url: "/admin/bookings",
        icon: "ClipboardList",
        isActive: false,
        items: [{ title: "All bookings", url: "/admin/bookings" }],
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: "FolderTree",
        isActive: false,
        items: [{ title: "Manage categories", url: "/admin/categories" }],
      },
      {
        title: "Subjects",
        url: "/dashboard/subjects",
        icon: "BookOpen",
        isActive: false,
        items: [{ title: "All subjects", url: "/dashboard/subjects" }],
      },
      {
        title: "Account",
        url: "/dashboard/profile",
        icon: "Settings",
        isActive: false,
        items: [{ title: "Profile", url: "/dashboard/profile" }],
      },
    ],
    projects: [],
    user: {
      name: user?.name ?? "Admin",
      email: user?.email ?? "",
      avatar: "",
    },
  };
}

export function getMemberSidebarMenu(
  user: AuthUser | null,
): AppSidebarMenuProps {
  return {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "LayoutDashboard",
        isActive: true,
        items: [
          { title: "Overview", url: "/dashboard" },
          { title: "Bookings", url: "/dashboard/bookings" },
        ],
      },
      {
        title: "Discover",
        url: "/coaches",
        icon: "Compass",
        isActive: false,
        items: [
          { title: "Browse coaches", url: "/coaches" },
          { title: "Subjects", url: "/subjects" },
          { title: "Categories", url: "/categories" },
        ],
      },
      {
        title: "Settings",
        url: "/dashboard/profile",
        icon: "Settings",
        items: [{ title: "Profile", url: "/dashboard/profile" }],
      },
    ],
    projects: [],
    user: {
      name: user?.name ?? "Member",
      email: user?.email ?? "",
      avatar: "",
    },
  };
}

/** Coach availability under `@coach/coach/*` → `/coach/...`. */
export function getCoachSidebarMenu(
  user: AuthUser | null,
): AppSidebarMenuProps {
  return {
    navMain: [
      {
        title: "Availability",
        url: "/coach/availability",
        icon: "Calendar",
        isActive: true,
        items: [
          { title: "My slots", url: "/coach/availability" },
          { title: "New slot", url: "/coach/availability/new" },
        ],
      },
      {
        title: "Bookings",
        url: "/dashboard/bookings",
        icon: "ClipboardList",
        isActive: false,
        items: [{ title: "All bookings", url: "/dashboard/bookings" }],
      },
      {
        title: "Reviews",
        url: "/coach/reviews",
        icon: "Star",
        isActive: false,
        items: [{ title: "Member feedback", url: "/coach/reviews" }],
      },
      {
        title: "Catalog",
        url: "/dashboard/categories",
        icon: "FolderTree",
        items: [
          { title: "Categories", url: "/dashboard/categories" },
          { title: "Subjects", url: "/dashboard/subjects" },
        ],
      },
      {
        title: "Settings",
        url: "/dashboard/profile",
        icon: "Settings",
        items: [{ title: "Profile", url: "/dashboard/profile" }],
      },
    ],
    projects: [],
    user: {
      name: user?.name ?? "Coach",
      email: user?.email ?? "",
      avatar: "",
    },
  };
}
