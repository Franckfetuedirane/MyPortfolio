"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, Code2, Cloud, Zap, CircleDot, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type ProjectStatus = "En cours" | "Terminé";
type ProjectCategory = "Tous" | "Logiciel" | "Cloud" | "Électrotechnique";

const fallbackProjects = [
  {
    id: 1,
    title: "TechFix App",
    category: "Logiciel",
    status: "En cours" as ProjectStatus,
    icon: Code2,
    description: "Plateforme backend robuste développée avec Django. Gestion de bases de données relationnelles, migrations complexes et environnements virtuels sécurisés Python.",
    tech: ["Python", "Django", "PostgreSQL", "Scripts"],
    image: "",
    video: "",
    color: "from-blue-500 to-cyan-400",
    shadow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    border: "group-hover:border-blue-500/50",
  },
  {
    id: 2,
    title: "Infrastructure OmniSys",
    category: "Cloud",
    status: "Terminé" as ProjectStatus,
    icon: Cloud,
    description: "Déploiement d'une architecture haute disponibilité sur AWS. Conteneurisation des services et mise en place d'un pipeline d'intégration continue (CI/CD).",
    tech: ["AWS EC2", "Docker", "DevOps", "Linux"],
    image: "",
    video: "",
    color: "from-orange-500 to-amber-400",
    shadow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]",
    border: "group-hover:border-orange-500/50",
  },
  {
    id: 3,
    title: "Fresh Natura Web",
    category: "Logiciel",
    status: "En cours" as ProjectStatus,
    icon: Code2,
    description: "Cahier des charges strict et conception architecturale pour un écosystème digital. Optimisation de l'interface utilisateur et structuration des données.",
    tech: ["Next.js", "UI/UX", "Architecture", "Figma"],
    image: "",
    video: "",
    color: "from-blue-500 to-cyan-400",
    shadow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    border: "group-hover:border-blue-500/50",
  },
  {
    id: 4,
    title: "Contrôle Puissance",
    category: "Électrotechnique",
    status: "Terminé" as ProjectStatus,
    icon: Zap,
    description: "Diagnostic et maintenance de systèmes matériels (XPS, HP). Configuration BIOS avancée, pilotes RST et gestion de l'alimentation électrique industrielle.",
    tech: ["Hardware", "Circuits", "Maintenance", "BIOS"],
    image: "",
    video: "",
    color: "from-emerald-500 to-green-400",
    shadow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
    border: "group-hover:border-emerald-500/50",
  },
];

const categories: ProjectCategory[] = ["Tous", "Logiciel", "Cloud", "Électrotechnique"];
const statuses: ProjectStatus[] = ["En cours", "Terminé"];

export default function Projets() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Tous");
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch("http://localhost:8000/api/projects/")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((remoteProjects) => {
        if (Array.isArray(remoteProjects) && remoteProjects.length > 0) {
          setProjects(remoteProjects.map((project) => ({
            ...project,
            icon: project.icon === "Cloud" ? Cloud : project.icon === "Zap" ? Zap : Code2,
            tech: project.technologies,
            image: project.image_url,
            video: project.video_url,
            shadow: project.category === "Cloud" ? "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]" : "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
            border: project.category === "Électrotechnique" ? "group-hover:border-emerald-500/50" : "group-hover:border-blue-500/50",
          })));
        }
      })
      .catch(() => undefined);
  }, []);

  // Filtrage dynamique
  const filteredProjects = projects.filter((project) => 
    activeCategory === "Tous" ? true : project.category === activeCategory
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050816] text-white overflow-hidden relative pt-20">
        {/* Background interactif */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#050816] to-[#050816] -z-10" />
              <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-6 pt-12 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-600">& Réalisations</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
            Une sélection de systèmes intégrés, de la conception logicielle au déploiement d&apos;infrastructures Cloud, en passant par l&apos;ingénierie matérielle.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-10 md:grid-cols-2">
          {statuses.map((status) => {
            const statusProjects = projects.filter((project) => project.status === status && (activeCategory === "Tous" || project.category === activeCategory));
            const isCompleted = status === "Terminé";
            const StatusIcon = isCompleted ? CheckCircle2 : CircleDot;

            return (
              <section key={status} aria-labelledby={`status-${status}`}>
                <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-3">
                  <StatusIcon className={isCompleted ? "h-5 w-5 text-emerald-400" : "h-5 w-5 text-amber-400"} />
                  <h2 id={`status-${status}`} className="text-xl font-bold text-white">{status}</h2>
                  <span className="text-sm text-slate-500">{statusProjects.length} projet{statusProjects.length > 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-3">
                  {statusProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <span className="font-medium text-slate-200">{project.title}</span>
                      <span className="text-xs uppercase tracking-wider text-slate-500">{project.category}</span>
                    </div>
                  ))}
                  {statusProjects.length === 0 && <p className="text-sm text-slate-500">Aucun projet dans cette catégorie.</p>}
                </div>
              </section>
            );
          })}
        </div>

        {/* Barre de filtrage interactive (L'effet "Pastille flottante") */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-16 relative z-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                activeCategory === category ? "text-slate-900" : "text-slate-400 hover:text-white bg-white/5"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Grille de projets avec animations de réorganisation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 ${project.border} ${project.shadow}`}
                >
                  {project.video ? (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black">
                      <video src={project.video} controls preload="metadata" className="h-full w-full object-cover" aria-label={`Vidéo du projet ${project.title}`} />
                    </div>
                  ) : project.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                      <img src={project.image} alt={`Image du projet ${project.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                    </div>
                  ) : null}

                  {/* Effet de lueur au survol */}
                  <div className={`absolute -inset-px bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem]`} />
                  
                  {/* Contenu */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-3">
                        <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${project.status === "Terminé" ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200" : "border-amber-400/30 bg-amber-500/15 text-amber-200"}`}>
                          {project.status}
                        </span>
                        <div className="flex gap-2">
<button className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-colors">
  <GitBranch className="w-5 h-5" />
</button>
                        <button className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                                                </div>
                      </div>
                    </div>

                    <div className="mb-4 inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/10 bg-white/5 text-slate-300 w-max">
                      {project.category}
                    </div>

                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed mb-8 flex-grow font-light text-sm md:text-base">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-4 py-2 text-xs font-semibold tracking-wider bg-slate-900/50 border border-white/5 rounded-lg text-slate-300 group-hover:border-white/20 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
      <Footer />
    </>
  );
}