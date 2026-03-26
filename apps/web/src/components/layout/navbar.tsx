"use client";

import React, { useState, useEffect } from "react";
import { LuDatabaseZap } from "react-icons/lu";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Segurança", href: "#security" },
  { label: "Arquitetura", href: "#architecture" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const sections = document.querySelectorAll("section[id], header[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full min-h-[66px] py-3 flex items-center sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-light shadow-lg shadow-df-accent/5" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <LuDatabaseZap className="w-8 h-8 text-white bg-df-accent rounded-lg p-1.5 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-df-accent rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          <h1 className="text-df-light-text font-bold text-xl tracking-tight">
            Data<span className="gradient-text">Flow</span>
          </h1>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-df-accent"
                    : "text-df-light-muted hover:text-df-light-text"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-df-accent/10 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-df-light-muted hover:text-df-light-text font-medium cursor-pointer"
            >
              Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="cursor-pointer bg-df-accent hover:bg-df-accent-hover text-white px-5 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-df-accent/25">
              Acessar Dashboard
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-df-light-bg border-df-text/10"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navegação</SheetTitle>
              <SheetDescription>Menu de navegação principal do DataFlow</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-2.5 px-2">
                <LuDatabaseZap className="w-8 h-8 text-white bg-df-accent rounded-lg p-1.5" />
                <h2 className="text-df-light-text font-bold text-xl">
                  Data<span className="gradient-text">Flow</span>
                </h2>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "text-df-accent bg-df-accent/10"
                        : "text-df-light-muted hover:text-df-light-text hover:bg-df-muted/10"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-3 px-2 pt-4 border-t border-df-text/10">
                <Link href="/login">
                  <Button variant="outline" className="w-full cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full cursor-pointer bg-df-accent hover:bg-df-accent-hover text-white rounded-full">
                    Acessar Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default Navbar;
