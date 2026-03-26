"use client";

import React from "react";
import { motion } from "framer-motion";

// Icons
import { FaReact } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";
import { SiTurborepo, SiPostgresql } from "react-icons/si";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";

// Data
const data = [
  {
    icon: <FaReact className="w-7 h-7" />,
    title: "Next.js & React",
    description:
      "Interface construída com Next.js App Router para SSR/SSG otimizado. Componentes estilizados com Tailwind CSS e baseados no shadcn/ui.",
    iconColor: "text-blue-400",
    glowColor: "hover:shadow-blue-400/20",
  },
  {
    icon: <FaShieldAlt className="w-7 h-7" />,
    title: "Zod Validation",
    description:
      "Validação centralizada e type-safe com Zod. Garante dados estritamente no formato esperado antes de qualquer processamento.",
    iconColor: "text-emerald-400",
    glowColor: "hover:shadow-emerald-400/20",
  },
  {
    icon: <FaServer className="w-7 h-7" />,
    title: "BullMQ + Redis",
    description:
      "Sistema de filas robusto para processamento assíncrono. Desacopla ingestão de processamento, evitando timeouts.",
    iconColor: "text-orange-400",
    glowColor: "hover:shadow-orange-400/20",
  },
  {
    icon: <SiTurborepo className="w-7 h-7" />,
    title: "Turborepo",
    description:
      "Arquitetura Monorepo com Turborepo e PNPM Workspaces. Separação clara entre frontend, backend e pacotes compartilhados.",
    iconColor: "text-violet-400",
    glowColor: "hover:shadow-violet-400/20",
  },
  {
    icon: <SiPostgresql className="w-7 h-7" />,
    title: "PostgreSQL + Prisma",
    description:
      "ORM type-safe com migrações versionadas para um banco relacional robusto e previsível.",
    iconColor: "text-cyan-400",
    glowColor: "hover:shadow-cyan-400/20",
  },
  {
    icon: <PiPlugsConnectedFill className="w-7 h-7" />,
    title: "API REST com Express",
    description:
      "Framework Node.js de alta performance com serialização otimizada e plugins modulares.",
    iconColor: "text-rose-400",
    glowColor: "hover:shadow-rose-400/20",
  },
  {
    icon: <SlEnergy className="w-7 h-7" />,
    title: "Polling & Real Time",
    description:
      "O frontend consulta o status do processamento periodicamente, refletindo mudanças automaticamente na UI.",
    iconColor: "text-amber-400",
    glowColor: "hover:shadow-amber-400/20",
  },
];

const Architecture = () => {
  return (
    <section
      id="architecture"
      className="w-full bg-df-bg-primary py-24 lg:py-32 overflow-hidden flex flex-col"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-4 mb-16"
        >
          <span className="text-df-accent font-semibold text-sm uppercase tracking-widest">
            Por debaixo dos panos
          </span>
          <h2 className="text-df-white font-bold text-3xl sm:text-4xl lg:text-5xl">
            Arquitetura Escalável
          </h2>
          <p className="w-full max-w-2xl text-df-muted text-lg">
            Projetado com as melhores práticas de engenharia de software para
            garantir robustez e manutenibilidade.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex items-center mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-r from-df-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-l from-df-bg-primary to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex w-max cursor-grab active:cursor-grabbing"
        >
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-6 pr-6">
              {data.map((item, index) => (
                <div
                  key={`${set}-${index}`}
                  className={`group relative shrink-0 w-[260px] sm:w-[320px] lg:w-[420px] bg-df-bg-secondary rounded-4xl border border-df-surface/30 p-6 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${item.glowColor} hover:border-df-surface/50`}
                >
                  <div className="flex flex-col gap-6 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-df-surface/30 flex items-center justify-center ${item.iconColor} transition-transform duration-500 group-hover:scale-110 shadow-inner`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-df-white font-bold text-xl sm:text-2xl tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-df-muted text-base sm:text-lg leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="absolute inset-0 rounded-4xl bg-linear-to-b from-df-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
