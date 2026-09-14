"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_DJANGO_CONTACT_URL ?? "http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.detail ?? "Contact request failed");
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Le service de contact est temporairement indisponible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "franckfetuef@gmail.com",
      href: "mailto:franckfetuef@gmail.com",
      detail: "Réponse sous 24 h",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-400/25",
    },
    {
      icon: Phone,
      label: "Téléphone 1",
      value: "+237 675 336 314",
      href: "tel:+237675336314",
      detail: "Disponible pour échanger",
      color: "from-orange-400 to-amber-300",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-400/25",
    },
    {
      icon: Phone,
      label: "Appeler",
      value: "+237 675 336 314",
      href: "tel:+237675336314",
      detail: "Appel direct",
      color: "from-emerald-400 to-teal-300",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-400/25",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Bafoussam & Douala, Cameroun",
      href: "#",
      detail: "Interventions & collaborations",
      color: "from-indigo-400 to-violet-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-400/25",
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.12),transparent_28%)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <Sparkles className="h-4 w-4" /> Une idée mérite un premier échange
          </div>
          <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">
            Donnons une forme concrète à votre prochaine idée.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Décrivez votre besoin, votre contexte ou même une intuition. Je vous répondrai avec une première direction claire.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a1024]/80 p-6 shadow-2xl sm:p-8"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <div className="mb-10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Canal direct</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Me trouver facilement.</h3>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300" /></span>
              </div>
              <div className="space-y-3">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ x: 5 }}
                      className={`group flex items-center gap-4 rounded-2xl border ${method.borderColor} ${method.bgColor} p-4 transition-colors hover:bg-white/10`}
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${method.color} text-slate-950`}><Icon className="h-5 w-5" /></span>
                      <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{method.label}</span><span className="block break-words text-sm font-semibold text-white">{method.value}</span><span className="block text-xs text-slate-500">{method.detail}</span></span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                    </motion.a>
                  );
                })}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                <div><Clock3 className="mb-2 h-4 w-4 text-orange-300" /><p className="text-xs leading-relaxed text-slate-400">Réponse rapide et suivi humain.</p></div>
                <div><CheckCircle2 className="mb-2 h-4 w-4 text-emerald-300" /><p className="text-xs leading-relaxed text-slate-400">Un échange orienté solution.</p></div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            <div className="absolute right-0 top-0 h-64 w-64 bg-orange-400/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">Formulaire projet</p><h3 className="mt-2 text-3xl font-black text-white">Construisons le brief.</h3></div>
                <span className="text-xs text-slate-500">01 / 03 · quelques minutes</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Votre nom</span><input type="text" placeholder="Franck Dupont" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-cyan-300/5" required /></label>
                <label className="space-y-2"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Votre email</span><input type="email" placeholder="vous@entreprise.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-cyan-300/5" required /></label>
              </div>
              <label className="mt-4 block space-y-2"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Votre message</span><textarea placeholder="Parlez-moi du contexte, de l'objectif et de ce que vous imaginez..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={7} className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-cyan-300/5" required /></label>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-relaxed text-slate-500">Vos informations restent utilisées uniquement pour vous répondre.</p>
                <button type="submit" disabled={isSubmitting} className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "Envoi en cours..." : "Lancer la discussion"}<Send className="h-4 w-4 transition group-hover:translate-x-1" /></button>
              </div>
              {submitted && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-200"><CheckCircle2 className="h-4 w-4" /> Message envoyé avec succès.</motion.div>}
              {error && <p className="mt-5 rounded-xl border border-orange-400/30 bg-orange-400/10 p-3 text-sm text-orange-200">{error}</p>}
            </div>
          </motion.form>
        </div>

        {/* CTA Finale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center sm:flex-row sm:text-left"
        >
          <p className="text-sm text-slate-400">Une préférence pour le direct ? <span className="text-white">Je suis à un message ou un appel.</span></p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:franckfetuef@gmail.com" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200"><Mail className="h-4 w-4" /> Email</a>
            <a href="tel:+237675336314" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-emerald-300/50 hover:text-emerald-200"><Phone className="h-4 w-4" /> Appeler</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
