"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BriefcaseBusiness, Globe2, Mail, MapPin, Music2, Phone, ArrowRight, Share2, Video } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: Mail, label: "Email", value: "franckfetuef@gmail.com", href: "mailto:franckfetuef@gmail.com" },
    { icon: Phone, label: "Téléphone", value: "+237 675 336 314", href: "tel:+237675336314" },
    { icon: MapPin, label: "Localisation", value: "Bafoussam & Douala, Cameroun", href: "#" },
  ];

  const quickLinks = [
    { label: "Accueil", href: "/" },
    { label: "Projets", href: "/projets" },
    { label: "Expertise", href: "#expertise" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Share2, href: "https://github.com/Franckfetuedirane", label: "GitHub" },
    { icon: Globe2, href: "https://www.facebook.com/FranckFetue", label: "Facebook" },
    { icon: BriefcaseBusiness, href: "https://www.linkedin.com/in/franck-fetue-670626372/", label: "LinkedIn" },
    { icon: Video, href: "https://www.youtube.com/", label: "YouTube" },
    { icon: Music2, href: "https://www.tiktok.com/", label: "TikTok" },
    { icon: Mail, href: "mailto:franckfetuef@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-[#050816] border-t border-white/10 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.1),transparent_50%)]" />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20"
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-orange-500/10 p-8 md:p-12 backdrop-blur-sm overflow-hidden relative group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),transparent_40%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Prêt à transformer votre vision en réalité ?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              Contactez-moi pour discuter de vos projets et de comment je peux vous aider à atteindre vos objectifs
            </p>
            <a
              href="mailto:franckfetuef@gmail.com"
              className="inline-flex items-center gap-3 rounded-full bg-white text-slate-950 px-8 py-4 font-bold uppercase tracking-[0.15em] hover:scale-[1.05] transition-transform duration-300 group"
            >
              Commencer maintenant
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-lg font-bold text-white">
                O
              </div>
              <div>
                <p className="text-sm font-bold">OmniSys FETUE</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Ingénieur</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Architecte de solutions digitales innovantes. Expertise en logiciel, cloud et électrotechnique.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Contact</h3>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0 group-hover:translate-y-[-2px] transition-transform" />
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-slate-500">{info.label}</span>
                      <span className="break-words text-slate-200">{info.value}</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Navigation</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-colors" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "AWS", "Docker", "TypeScript", "Python", "DevOps"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <p className="text-xs text-slate-500 tracking-wider">
            © {currentYear} OmniSys FETUE. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-xs text-slate-500">
            <Link href="/" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
