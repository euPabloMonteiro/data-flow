"use client";

import React from "react";
import { Button } from "../ui/button";
import { CodeXml, MoveRight, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Header = () => {
  return (
    <header
      id="home"
      className="relative w-full min-h-[90vh] px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-linear-to-b from-df-light-bg to-white"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-df-accent via-df-accent-light/20 to-transparent pointer-events-none" />
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-df-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-df-accent-violet/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 0.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-4xl mx-auto flex flex-col items-center text-center py-32"
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-df-light-bg border border-df-accent/90 text-df-accent text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema de Alta Performance</span>
            <span className="w-2 h-2 bg-df-success rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUpVariants}
          className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-df-white leading-[1.1]"
        >
          Processe grandes volumes
          <br className="hidden sm:block" />
          {" "}de dados sem{" "}
          <span className="bg-linear-to-b from-df-accent to-df-accent-violet bg-clip-text text-transparent">
            travar seu sistema.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          className="mt-6 text-lg sm:text-xl text-df-muted max-w-2xl leading-relaxed"
        >
          O DataFlow transforma planilhas brutas em métricas acionáveis através
          de processamento assíncrono em background, com dashboards interativos
          em tempo real.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-df-accent hover:bg-df-accent-hover text-white px-8 py-6 rounded-full text-base font-semibold cursor-pointer transition-all hover:shadow-xl hover:shadow-df-accent/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              Acessar Dashboard
              <MoveRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a href="#architecture" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-df-muted/20 text-df-light-text px-8 py-6 rounded-full text-base font-medium cursor-pointer hover:bg-white hover:border-df-accent/30 transition-all"
            >
              Ver Arquitetura
              <CodeXml className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { value: "1M+", label: "Linhas processadas" },
            { value: "<2s", label: "Tempo de resposta" },
            { value: "99.9%", label: "Uptime garantido" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-df-light-muted mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
