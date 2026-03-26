"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Fingerprint,
  ShieldCheck,
  Timer,
  FileCheck2,
  KeyRound,
} from "lucide-react";

const steps = [
  {
    icon: <Fingerprint className="w-6 h-6" />,
    title: "Login com OAuth",
    description:
      "Acesso seguro com provedores confiáveis. Nenhuma senha armazenada no servidor.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Rotas Protegidas",
    description:
      "Acesso restrito automaticamente. Apenas usuários autenticados entram.",
  },
  {
    icon: <Timer className="w-6 h-6" />,
    title: "Controle de Acesso",
    description:
      "A API previne abuso e ataques limitando requisições automaticamente.",
  },
  {
    icon: <FileCheck2 className="w-6 h-6" />,
    title: "Validação de Dados",
    description:
      "Entrada validada no frontend e backend com as mesmas regras. Dados inválidos são barrados.",
  },
  {
    icon: <KeyRound className="w-6 h-6" />,
    title: "Headers de Segurança",
    description:
      "Proteção contra clickjacking, injeção de conteúdo e outros ataques comuns.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function SecurityPipeline() {
  return (
    <section
      id="security"
      className="relative py-24 sm:py-32 bg-df-bg-primary overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[50%] w-[500px] h-[500px] bg-df-accent/5 rounded-full blur-[150px] -translate-x-1/2" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-df-accent font-semibold text-sm uppercase tracking-widest mb-4">
            Segurança
          </span>
          <h2 className="text-df-white font-bold text-3xl sm:text-4xl lg:text-5xl">
            <span className="text-df-accent">5</span> Camadas de Proteção
          </h2>
          <p className="text-df-muted text-lg max-w-xl mx-auto mt-4">
            Cada request passa por múltiplas verificações antes de processar
            qualquer dado.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl border border-df-surface/20 bg-df-bg-secondary/60 p-6 transition-all duration-300 hover:border-df-accent/30 hover:bg-df-bg-secondary"
            >
              {/* Step number */}
              <span className="absolute top-4 right-5 text-[2.5rem] font-black text-df-surface/30 leading-none select-none">
                {index + 1}
              </span>

              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-df-accent/10 border border-df-accent/20 flex items-center justify-center text-df-accent mb-5 transition-colors duration-300 group-hover:bg-df-accent/15">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="text-df-white font-semibold text-base mb-2">
                {step.title}
              </h3>
              <p className="text-df-muted text-sm leading-relaxed flex-1">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          {steps.map((_, i) => (
            <React.Fragment key={i}>
              <div className="w-2.5 h-2.5 rounded-full bg-df-accent/60" />
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-df-accent/30" />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
