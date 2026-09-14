"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#expertise", label: "Expertise" },
    { href: "/projets", label: "Projets" },
    { href: "/#parcours", label: "Parcours" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050816]/80 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xl font-black text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:bg-white/10 transition-colors">
              O
            </div>
            <div>
              <span className="text-base font-semibold tracking-[0.18em] text-slate-200">
                OmniSys <span className="text-blue-400">FETUE</span>
              </span>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 group-hover:text-blue-400 transition-colors">
                Technologies
              </p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wider text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Contact Button Desktop */}
          <div className="hidden items-center gap-3 md:flex">
          <a
            href="/CV_2026-08-14_Franck%20Dirane_TCHUMAMO%20FETUE.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-orange-100 transition-all hover:border-orange-300/60 hover:bg-orange-500/20"
          >
            <Download className="h-4 w-4" /> CV
          </a>
          <a
            href="mailto:franckfetuef@gmail.com"
            className="hidden md:block rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-white"
          >
            Me contacter
          </a>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 bg-[#050816]/95 backdrop-blur-md"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium tracking-wider text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="/CV_2026-08-14_Franck%20Dirane_TCHUMAMO%20FETUE.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100 transition-all hover:border-orange-300/60 hover:bg-orange-500/20"
                >
                  <Download className="h-4 w-4" /> Télécharger le CV
                </a>
                <a
                  href="mailto:franckfetuef@gmail.com"
                  className="mt-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-white text-center"
                >
                  Me contacter
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

import { AnimatePresence } from "framer-motion";
