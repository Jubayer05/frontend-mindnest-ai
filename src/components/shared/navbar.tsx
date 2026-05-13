"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/shared/ModeToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  defaultNavbarAuth,
  defaultNavbarLogo,
  defaultNavbarMenu,
} from "@/config/navbar";
import { useAuth } from "@/context/auth-context";
import { logoutUser } from "@/services/auth";
import type { MenuItem, NavbarAuth, NavbarLogo } from "@/types/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

interface NavbarProps {
  className?: string;
  logo?: NavbarLogo;
  menu?: MenuItem[];
  auth?: NavbarAuth;
}

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const Navbar = ({
  logo = defaultNavbarLogo,
  menu = defaultNavbarMenu,
  auth = defaultNavbarAuth,
  className,
}: NavbarProps) => {
  const hasMounted = useHasMounted();
  const { user, clearAuth } = useAuth();
  const router = useRouter();
  const activeUser = hasMounted ? user : null;
  const dashboardUrl = "/dashboard";

  const initials =
    activeUser?.name
      ?.split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  const onLogout = async () => {
    try {
      await logoutUser();
      clearAuth();
      toast.success("Logged out.");
      router.push("/auth/login");
      router.refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Logout failed");
    }
  };

  const logoDesktopClass =
    "h-10 w-auto object-contain object-left sm:h-11 lg:h-[50px]";
  const logoMobileClass =
    "h-12 w-auto max-w-[min(72vw,220px)] object-contain object-left sm:h-14";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 py-3 backdrop-blur-md sm:py-4",
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between gap-6 lg:flex">
          <div className="flex min-w-0 flex-1 items-center gap-4 xl:gap-6">
            {/* Logo */}
            <Link
              href={logo.url}
              className="flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/* Light logo */}
              <Image
                width={140}
                height={58}
                src="/logo/logo-light.png"
                className={cn("dark:hidden", logoDesktopClass)}
                alt={logo.alt}
                priority
              />
              {/* Dark logo */}
              <Image
                width={140}
                height={58}
                src="/logo/logo-dark.png"
                className={cn("hidden dark:inline-block", logoDesktopClass)}
                alt={logo.alt}
              />
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ModeToggle />
            {activeUser ? (
              <>
                <Button asChild size="sm" variant="secondary">
                  <Link href={dashboardUrl}>Dashboard</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-border"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      Account
                      <ChevronDown className="size-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
                      {activeUser.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="gap-2">
                        <LayoutDashboard className="size-4" />
                        Overview
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/bookings">Bookings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <UserCircle className="size-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/coaches">Browse coaches</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/subjects">Subjects</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/help">Help</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => void onLogout()}>
                      <LogOut className="size-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile / tablet Menu */}
        <div className="flex min-w-0 items-center justify-between gap-3 lg:hidden">
          {/* Logo — taller on small screens for readability */}
          <Link
            href={logo.url}
            className="flex min-w-0 flex-1 items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {/* Light logo */}
            <Image
              width={220}
              height={92}
              src="/logo/logo-light.png"
              className={cn("dark:hidden", logoMobileClass)}
              alt={logo.alt}
              priority
            />
            {/* Dark logo */}
            <Image
              width={220}
              height={92}
              src="/logo/logo-dark.png"
              className={cn("hidden dark:inline-block", logoMobileClass)}
              alt={logo.alt}
            />
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ModeToggle />
            <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 shrink-0"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100vw,22rem)] max-w-full flex-col gap-0 overflow-y-auto sm:max-w-md"
            >
              <SheetHeader className="space-y-0 pb-2 text-left">
                <SheetTitle
                  asChild
                  className="text-left font-normal text-foreground"
                >
                  <Link
                    href={logo.url}
                    className="inline-flex max-w-full items-center py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {/* Light logo */}
                    <Image
                      width={220}
                      height={92}
                      src="/logo/logo-light.png"
                      className={cn("dark:hidden", logoMobileClass)}
                      alt={logo.alt}
                    />
                    {/* Dark logo */}
                    <Image
                      width={220}
                      height={92}
                      src="/logo/logo-dark.png"
                      className={cn("hidden dark:inline-block", logoMobileClass)}
                      alt={logo.alt}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex min-h-0 flex-1 flex-col gap-6 px-1 pb-6 sm:px-2">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                <div className="flex flex-col gap-3 pt-2">
                  {activeUser ? (
                    <>
                      <div className="grid gap-1 rounded-lg border border-border bg-muted/40 p-2 text-sm">
                        <Link
                          href="/dashboard"
                          className="rounded-md px-2 py-2 font-medium hover:bg-muted"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/bookings"
                          className="rounded-md px-2 py-2 hover:bg-muted"
                        >
                          Bookings
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="rounded-md px-2 py-2 hover:bg-muted"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/coaches"
                          className="rounded-md px-2 py-2 hover:bg-muted"
                        >
                          Coaches
                        </Link>
                        <Link
                          href="/subjects"
                          className="rounded-md px-2 py-2 hover:bg-muted"
                        >
                          Subjects
                        </Link>
                        <Link
                          href="/help"
                          className="rounded-md px-2 py-2 hover:bg-muted"
                        >
                          Help
                        </Link>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => void onLogout()}
                      >
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 text-left text-base font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      href={item.url}
      key={item.title}
      className="block rounded-md py-2.5 text-base font-semibold transition-colors hover:bg-muted hover:text-accent-foreground"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex w-full min-w-0 max-w-full flex-row gap-3 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground sm:gap-4"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
