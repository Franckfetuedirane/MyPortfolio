"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Cloud,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  X,
  Zap,
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";
import { useSitePreferences } from "./components/SitePreferences";

type PortfolioDocument = {
  title: string;
  description: string;
  category: "Parcours académique" | "Attestation" | "Parcours professionnel" | "Terrain & réalisations";
  type: "PDF" | "Image";
  year: string;
  src: string;
  accent: "blue" | "orange" | "emerald" | "violet" | "cyan";
};

type HomeProject = {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  icon: typeof Code2;
  color: string;
};

export default function Home() {
  const { language } = useSitePreferences();
  const [activeJourney, setActiveJourney] = useState("Tout");
  const [selectedDocument, setSelectedDocument] = useState<PortfolioDocument | null>(null);
  const [projects, setProjects] = useState<HomeProject[]>([
    { id: 1, title: "TechFix App", category: "Logiciel", status: "En cours", description: "Plateforme backend Django et PostgreSQL conçue pour des flux fiables.", technologies: ["Python", "Django", "PostgreSQL"], icon: Code2, color: "text-blue-300" },
    { id: 2, title: "Infrastructure OmniSys", category: "Cloud", status: "Terminé", description: "Déploiement AWS, conteneurs et automatisation CI/CD.", technologies: ["AWS", "Docker", "DevOps"], icon: Cloud, color: "text-orange-300" },
    { id: 3, title: "Contrôle Puissance", category: "Électrotechnique", status: "Terminé", description: "Diagnostic et maintenance de systèmes techniques sur le terrain.", technologies: ["Hardware", "Maintenance", "BIOS"], icon: Zap, color: "text-emerald-300" },
  ]);

  const stats = [
    { value: "3+", label: language === "fr" ? "ans d'expérience" : "years of experience" },
    { value: "20+", label: language === "fr" ? "projets livrés" : "projects delivered" },
    { value: "99%", label: "satisfaction" },
  ];

  const services = [
    {
      icon: Code2,
      title: language === "fr" ? "Génie Logiciel" : "Software engineering",
      description: language === "fr" ? "Développement d'applications robustes, API, back-end, front-end et architecture logicielle sur-mesure." : "Robust applications, APIs, back-end, front-end and custom software architecture.",
      accent: "from-blue-500/20 via-blue-500/5 to-transparent",
      tone: "text-blue-400",
      borderHover: "hover:border-blue-500/50"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: language === "fr" ? "Conception d'infrastructures AWS, CI/CD, conteneurisation, sécurité et scaling durable des services." : "AWS infrastructure, CI/CD, containers, security and sustainable service scaling.",
      accent: "from-orange-500/20 via-orange-500/5 to-transparent",
      tone: "text-orange-400",
      borderHover: "hover:border-orange-500/50"
    },
    {
      icon: Zap,
      title: language === "fr" ? "Électrotechnique" : "Electrical engineering",
      description: language === "fr" ? "Pilotage de systèmes énergétiques, automatisation, maintenance et intégration matériel/logiciel avancée." : "Energy systems, automation, maintenance and advanced hardware/software integration.",
      accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      tone: "text-emerald-400",
      borderHover: "hover:border-emerald-500/50"
    },
  ];

  const skills = [
    "Next.js", "React.js", "Angular", "TypeScript", "Java", "Node.js", "Python", "Django",
    "Flutter", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "UI/UX", "Figma",
    "Architecture", "CI/CD", "Linux", "Git",
  ];

  const fallbackDocuments: PortfolioDocument[] = [
    { title: "Baccalauréat scientifique", description: "Le socle académique qui a lancé mon parcours d'ingénieur et mon intérêt pour les systèmes techniques.", category: "Parcours académique", type: "PDF", year: "2018", src: "/baccalauréat.pdf", accent: "blue" },
    { title: "BTS en électrotechnique", description: "Une formation pratique dédiée aux installations électriques, à l'automatisation et au diagnostic terrain.", category: "Parcours académique", type: "PDF", year: "2021", src: "/Bts.pdf", accent: "orange" },
    { title: "Attestation de Bachelor", description: "Une étape de spécialisation qui relie génie logiciel, architecture des systèmes et innovation numérique.", category: "Parcours académique", type: "PDF", year: "2024", src: "/attestation_bachelor.pdf", accent: "emerald" },
    { title: "Relevé de notes B3", description: "Le détail de mon parcours de troisième année et des compétences consolidées durant cette période.", category: "Parcours académique", type: "PDF", year: "2024", src: "/relevé de notes B3.pdf", accent: "violet" },
    { title: "Relevé du baccalauréat", description: "Le relevé officiel qui complète la première étape de mon parcours académique.", category: "Parcours académique", type: "PDF", year: "2018", src: "/relevé_bacc.pdf", accent: "blue" },
    { title: "Curriculum vitae", description: "Mon parcours complet, mes expériences et les technologies que je mobilise pour construire des solutions fiables.", category: "Parcours professionnel", type: "PDF", year: "2026", src: "/CV_2026-08-14_Franck Dirane_TCHUMAMO FETUE.pdf", accent: "cyan" },
    ...Array.from({ length: 11 }, (_, index) => ({
      title: `Trace de terrain ${String(index + 1).padStart(2, "0")}`,
      description: "Une immersion dans mon environnement de travail : installation, observation, maintenance et mise en œuvre de solutions concrètes.",
      category: "Terrain & réalisations" as const,
      type: "Image" as const,
      year: "2026",
      src: `/photo_${index + 1}_2026-09-13_11-42-49.jpg`,
      accent: index % 2 === 0 ? ("blue" as const) : ("orange" as const),
    })),
  ];

  const [documents, setDocuments] = useState<PortfolioDocument[]>(fallbackDocuments);
  const featuredProjects = [
    { title: language === "fr" ? "TechFix App" : "TechFix App", category: language === "fr" ? "Logiciel" : "Software", description: language === "fr" ? "Plateforme Django et PostgreSQL conçue pour des flux fiables." : "A Django and PostgreSQL platform designed for reliable workflows.", icon: Code2, tone: "text-blue-300" },
    { title: language === "fr" ? "Infrastructure OmniSys" : "OmniSys Infrastructure", category: language === "fr" ? "Cloud" : "Cloud", description: language === "fr" ? "Déploiement AWS, conteneurs et automatisation CI/CD." : "AWS deployment, containers and CI/CD automation.", icon: Cloud, tone: "text-orange-300" },
    { title: language === "fr" ? "Contrôle Puissance" : "Power Control", category: language === "fr" ? "Électrotechnique" : "Electrical engineering", description: language === "fr" ? "Diagnostic et maintenance de systèmes techniques sur le terrain." : "Field diagnosis and maintenance for technical systems.", icon: Zap, tone: "text-emerald-300" },
  ];
  const journeyTabs = [
    { label: "Tout", icon: Eye, count: documents.length },
    { label: "Parcours académique", icon: GraduationCap, count: documents.filter((document) => document.category === "Parcours académique").length },
    { label: "Attestation", icon: FileText, count: documents.filter((document) => document.category === "Attestation").length },
    { label: "Parcours professionnel", icon: BriefcaseBusiness, count: documents.filter((document) => document.category === "Parcours professionnel").length },
    { label: "Terrain & réalisations", icon: Zap, count: documents.filter((document) => document.category === "Terrain & réalisations").length },
  ];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL ?? "http://localhost:8000"}/api/portfolio-items/`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((remoteItems) => {
        if (Array.isArray(remoteItems) && remoteItems.length > 0) {
          setDocuments(remoteItems.map((item) => ({
            title: item.title,
            description: item.description,
            category: item.category,
            type: item.media_type,
            year: item.year,
            src: item.file_url,
            accent: item.accent,
          })));
        }
      })
      .catch(() => undefined);

    fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL ?? "http://localhost:8000"}/api/projects/`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((remoteProjects) => {
        if (Array.isArray(remoteProjects) && remoteProjects.length > 0) {
          setProjects(remoteProjects.map((project) => ({
            id: project.id,
            title: project.title,
            category: project.category,
            status: project.status,
            description: project.description,
            technologies: project.technologies ?? [],
            icon: project.icon === "Cloud" ? Cloud : project.icon === "Zap" ? Zap : Code2,
            color: project.category === "Cloud" ? "text-orange-300" : project.category === "Électrotechnique" ? "text-emerald-300" : "text-blue-300",
          })));
        }
      })
      .catch(() => undefined);
  }, []);

  const visibleDocuments = activeJourney === "Tout" ? documents : documents.filter((document) => document.category === activeJourney);

  return (
    <>
      <Header />
      <main className="site-shell min-h-screen bg-[#050816] text-white overflow-x-clip relative selection:bg-blue-500/60 selection:text-white">
        {/* Arrière-plan */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.1),transparent_30%)]" />
        <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />

      {/* Section Principale (Héro) */}
      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-32 pb-20 md:grid-cols-[1.2fr_0.8fr] md:px-10">
        
        {/* Colonne Gauche : Texte */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
            className="availability-label mb-8 flex w-full max-w-full items-start gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm leading-5 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.15)] sm:inline-flex sm:w-auto sm:items-center"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {language === "fr" ? "Systèmes opérationnels & Disponibilité immédiate" : "Operational systems & immediate availability"}
          </motion.div>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mb-4 text-xl font-medium tracking-[0.2em] text-slate-300 uppercase"
          >
            {language === "fr" ? "Je suis" : "I am"} <span className="text-white font-bold">Franck Dirane TCHUMAMO FETUE</span>
          </motion.h2>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="break-words text-[clamp(2.8rem,12vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white md:text-7xl"
          >
            {language === "fr" ? "Architecte de" : "Digital solutions"}
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400 bg-clip-text text-transparent pb-2">
              {language === "fr" ? "Solutions Digitales." : "Architect."}
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 font-light"
          >
            {language === "fr" ? "Ingénieur logiciel, expert Cloud AWS et spécialiste en électrotechnique. Je conçois l'architecture de demain : du circuit matériel jusqu'au déploiement sécurisé dans le Cloud." : "Software engineer, AWS Cloud expert and electrical engineering specialist. I design tomorrow's architecture, from hardware circuits to secure Cloud deployment."}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <a href="#contact" className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-slate-950 transition-transform duration-300 hover:scale-105 active:scale-95 sm:w-auto sm:px-8">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                {language === "fr" ? "Démarrer un projet" : "Start a project"}
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>

            {/* Bouton d exploration connecte a la page Projets */}
            <Link href="/projets" className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-slate-200 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white sm:w-auto sm:px-8">
                {language === "fr" ? "Explorer les projets" : "Explore projects"}
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Colonne Droite : Portrait Circulaire Magnétique */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto flex h-[min(400px,calc(100vw-2rem))] w-[min(400px,calc(100vw-2rem))] max-w-full items-center justify-center"
        >
          {/* Lueur de fond */}
          <div className="absolute h-full w-full rounded-full bg-gradient-to-tr from-blue-600/20 to-orange-500/20 blur-[80px]" />

          {/* Anneau orbital 1 (Bleu) */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute h-[85%] w-[85%] rounded-full border border-blue-500/30 border-dashed"
          />

          {/* Compétences qui défilent autour du portrait */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            {[
              { label: "Ingénieur logiciel", position: "left-1/2 -top-2 -translate-x-1/2", tone: "border-blue-400/40 bg-blue-500/15 text-blue-100" },
              { label: "Électrotechnique", position: "-right-10 top-1/2 -translate-y-1/2", tone: "border-orange-400/40 bg-orange-500/15 text-orange-100" },
              { label: "Maintenance informatique", position: "-bottom-2 left-1/2 -translate-x-1/2", tone: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100" },
              { label: "Cloud computing", position: "-left-10 top-1/2 -translate-y-1/2", tone: "border-indigo-400/40 bg-indigo-500/15 text-indigo-100" },
              ].map((skill) => (
              <motion.span
                key={skill.label}
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className={`orbit-label absolute whitespace-nowrap rounded-full border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] shadow-lg backdrop-blur-md sm:px-4 sm:text-[10px] ${skill.position} ${skill.tone}`}
              >
                {language === "fr" ? skill.label : skill.label === "Ingénieur logiciel" ? "Software engineer" : skill.label === "Électrotechnique" ? "Electrical engineering" : skill.label === "Maintenance informatique" ? "IT maintenance" : "Cloud computing"}
              </motion.span>
            ))}
          </motion.div>

          {/* Anneau orbital 2 (Orange) */}
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute h-[95%] w-[95%] rounded-full border border-orange-500/20 border-dotted"
          />

          {/* Conteneur de l'image (Format 4x4 circulaire) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 h-[70%] w-[70%] overflow-hidden rounded-full border-4 border-[#0a0f25] shadow-[0_0_50px_rgba(59,130,246,0.2)] cursor-pointer"
          >
            {/* Assurez-vous que le nom de votre image correspond (SAM_0076.JPG ou profile.jpg) */}
            <img
              src="/SAM_0076.JPG"
              alt="Franck Dirane TCHUMAMO FETUE"
              className="h-full w-full object-cover object-center bg-slate-900"
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">{language === "fr" ? "Projets & réalisations" : "Projects & work"}</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{language === "fr" ? "Voir les systèmes construits sur le terrain." : "See the systems built in the field."}</h2>
          </div>
          <Link href="/projets" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-blue-100">
            {language === "fr" ? "Explorer les projets" : "Explore projects"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="featured-projects relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-10" aria-labelledby="featured-projects">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">{language === "fr" ? "Sélection" : "Selected work"}</p>
            <h2 id="featured-projects" className="mt-2 text-3xl font-black text-white sm:text-4xl">{language === "fr" ? "Des projets visibles, pas seulement des promesses." : "Visible work, not just promises."}</h2>
          </div>
          <Link href="/projets" className="hidden text-xs font-bold uppercase tracking-[0.15em] text-blue-300 hover:text-white sm:inline-flex">{language === "fr" ? "Tout voir" : "View all"} <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => {
            const Icon = project.icon;
            return <Link href="/projets" key={project.title} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/[0.08]">
              <Icon className={`mb-8 h-7 w-7 ${project.tone}`} />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{project.category}</p>
              <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
            </Link>;
          })}
        </div>
      </section>

      {/* Bandeau de statistiques */}
      <section className="relative z-20 mx-auto max-w-5xl px-6 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-2 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-2xl sm:gap-6 sm:p-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="min-w-0 px-1 text-center sm:px-0">
              <div className="text-[2rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 sm:text-5xl">{stat.value}</div>
              <div className="mx-auto mt-3 max-w-[7rem] break-words text-[0.58rem] font-semibold uppercase leading-[1.25] tracking-[0.1em] text-slate-400 sm:max-w-none sm:text-sm sm:tracking-[0.15em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Section Compétences et Services */}
      <section id="expertise" className="relative z-10 mx-auto max-w-7xl px-6 pb-28 md:px-10">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400 mb-4">{language === "fr" ? "Expertise Technique" : "Technical expertise"}</p>
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{language === "fr" ? "Ce que je sais faire" : "What I do best"}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                whileHover={{ y: -10 }}
                className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-colors duration-300 ${service.borderHover}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Icon className={`h-8 w-8 ${service.tone}`} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pilules de compétences */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="cursor-default rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-300 transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Parcours et pièces justificatives */}
      <section id="parcours" className="relative z-10 mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">{language === "fr" ? "Mon parcours" : "My journey"}</p>
            <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">{language === "fr" ? "Des preuves concrètes, une trajectoire lisible." : "Concrete proof, a clear journey."}</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-400 lg:justify-self-end">{language === "fr" ? "Explorez mes formations, mon parcours professionnel et les moments de terrain qui nourrissent ma façon de concevoir des systèmes utiles." : "Explore my education, professional path and field experience that shape how I build useful systems."}</p>
        </div>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-3 scrollbar-none">
          {journeyTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeJourney === tab.label;
            const translatedLabel = language === "fr" ? tab.label : ({ "Tout": "All", "Parcours académique": "Academic path", "Attestation": "Certificates", "Parcours professionnel": "Professional path", "Terrain & réalisations": "Field work" }[tab.label] ?? tab.label);
            return (
              <button key={tab.label} onClick={() => setActiveJourney(tab.label)} className={`flex min-w-max items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${isActive ? "border-blue-400/60 bg-blue-500/15 text-white shadow-[0_10px_30px_rgba(59,130,246,0.12)]" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"}`}>
                <Icon className={`h-4 w-4 ${isActive ? "text-blue-300" : "text-slate-500"}`} />
                <span className="text-xs font-bold uppercase tracking-[0.12em]">{translatedLabel}</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">{tab.count}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleDocuments.map((document, index) => (
            <motion.article layout key={document.src} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.035 }} className="group overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] backdrop-blur-sm transition-colors duration-300 hover:border-white/25">
              <button onClick={() => setSelectedDocument(document)} className="relative block aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-950 text-left" aria-label={`Prévisualiser ${document.title}`}>
                {document.type === "Image" ? <img src={document.src} alt={document.title} className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /> : <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),transparent_55%)]"><FileText className="h-16 w-16 text-blue-300/70 transition duration-300 group-hover:scale-110 group-hover:text-blue-200" strokeWidth={1.2} /><span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-slate-300">DOCUMENT PDF</span></div>}
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100"><Eye className="h-4 w-4" /></span>
              </button>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em]"><span className={document.accent === "orange" ? "text-orange-300" : document.accent === "emerald" ? "text-emerald-300" : "text-blue-300"}>{document.category}</span><span className="text-slate-500">{document.year}</span></div>
                <h3 className="mb-2 text-xl font-bold text-white">{document.title}</h3>
                <p className="min-h-[3.5rem] text-sm leading-relaxed text-slate-400">{document.description}</p>
                <button onClick={() => setSelectedDocument(document)} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-200 transition-colors hover:text-blue-300">{language === "fr" ? "Voir la pièce" : "View document"} <ArrowRight className="h-4 w-4" /></button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {selectedDocument && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02040c]/90 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={selectedDocument.title}>
          <div className="relative flex h-[min(90vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0a1024] shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">{selectedDocument.category} · {selectedDocument.year}</p><h3 className="mt-1 text-lg font-bold text-white">{selectedDocument.title}</h3></div><div className="flex items-center gap-2"><a href={selectedDocument.src} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-white/10"><ExternalLink className="h-4 w-4" /><span className="hidden sm:inline">Ouvrir</span></a><a href={selectedDocument.src} download className="flex h-10 items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/15 px-3 text-xs font-bold uppercase tracking-wider text-blue-100 hover:bg-blue-500/25"><Download className="h-4 w-4" /><span className="hidden sm:inline">Télécharger</span></a><button onClick={() => setSelectedDocument(null)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Fermer l'aperçu"><X className="h-5 w-5" /></button></div></div>
            <div className="min-h-0 flex-1 bg-black/20 p-3 md:p-5">{selectedDocument.type === "Image" ? <img src={selectedDocument.src} alt={selectedDocument.title} className="h-full w-full object-contain" /> : <iframe src={selectedDocument.src} title={selectedDocument.title} className="h-full w-full rounded-xl bg-white" />}</div>
          </div>
        </div>
      )}

      <section id="projets" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 md:px-10" aria-labelledby="projects-title">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">{language === "fr" ? "Projets" : "Projects"}</p>
            <h2 id="projects-title" className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              {language === "fr" ? "Des réalisations visibles dans le même parcours." : "Real work, right inside this journey."}
            </h2>
          </div>
          <Link href="/projets" className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-300 transition hover:text-white">
            {language === "fr" ? "Voir la page complète" : "View full project page"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.slice(0, 6).map((project) => {
            const Icon = project.icon;
            const category = language === "en" && project.category === "Logiciel" ? "Software" : language === "en" && project.category === "Électrotechnique" ? "Electrical engineering" : project.category;
            const status = language === "en" && project.status === "Terminé" ? "Completed" : language === "en" && project.status === "En cours" ? "In progress" : project.status;
            return (
              <Link key={project.id} href="/projets" className="group flex min-h-[18rem] flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/[0.08]">
                <div className="mb-8 flex items-start justify-between gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 ${project.color}`}><Icon className="h-6 w-6" /></span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{status}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{category}</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((technology) => <span key={technology} className="rounded-lg border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-300">{technology}</span>)}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      
      {/* Section Contact */}
      <ContactSection />
    </main>
      <Footer />
    </>
  );
}