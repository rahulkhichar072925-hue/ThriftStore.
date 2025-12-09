"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  // ❌ Do NOT show the main navbar on /admin (and nested routes)
  if (pathname.startsWith("/admin")) return null;

  return <Navbar />;
};

export default NavbarWrapper;
