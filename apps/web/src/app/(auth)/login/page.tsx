"use client";

import React from "react";
import { AuthTabs } from "@/features/auth/components/auth-tabs";
import { AuthBackground } from "@/features/auth/components/auth-background";
import { motion } from "framer-motion";
import { LuDatabaseZap } from "react-icons/lu";
import Link from "next/link";
import { ArrowLeft, Shield, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-5 h-5 text-df-accent" />,
    title: "Processamento Rápido",
    desc: "Milhões de linhas processadas em segundos",
  },
  {
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    title: "Seguro & Confiável",
    desc: "Validação rigorosa em todas as etapas",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
    title: "Dashboard Interativo",
    desc: "Visualize métricas em tempo real",
  },
];

const LoginPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col lg:flex-row overflow-y-auto">
      <AuthBackground />

      {/* Left panel — Branding (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 flex-col justify-between p-10 xl:p-16 z-10 min-h-screen"
      >
        <div>
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-df-muted hover:text-df-white transition-colors text-sm mb-16 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar ao início
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <LuDatabaseZap className="w-10 h-10 text-white bg-df-accent rounded-xl p-2" />
              <div className="absolute inset-0 bg-df-accent rounded-xl blur-lg opacity-40" />
            </div>
            <h1 className="text-3xl font-bold text-df-white">
              Data<span className="gradient-text">Flow</span>
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="text-4xl xl:text-5xl font-bold text-df-white leading-tight mb-4">
            Transforme dados
            <br />
            em <span className="gradient-text">decisões.</span>
          </h2>
          <p className="text-df-muted text-lg max-w-md leading-relaxed">
            Acesse sua plataforma de processamento de dados e visualize métricas
            em dashboards interativos de alta performance.
          </p>
        </div>

        {/* Feature cards */}
        <div className="space-y-4 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-df-surface/15 border border-df-surface/20 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-df-surface/30 flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <div>
                <p className="text-df-white text-sm font-semibold">
                  {feature.title}
                </p>
                <p className="text-df-muted text-xs">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="text-df-muted/50 text-xs mt-8">
          © {new Date().getFullYear()} DataFlow. Todos os direitos reservados.
        </p>
      </motion.div>

      {/* Right panel — Auth form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 z-10 py-8 lg:py-12"
      >
        {/* Mobile only: back link + logo */}
        <div className="lg:hidden w-full max-w-[450px] mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-df-muted hover:text-df-white transition-colors text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-2.5">
            <LuDatabaseZap className="w-8 h-8 text-white bg-df-accent rounded-lg p-1.5" />
            <h1 className="text-2xl font-bold text-df-white">
              Data<span className="gradient-text">Flow</span>
            </h1>
          </div>
        </div>

        <AuthTabs />

        <footer className="mt-6 text-center text-xs text-df-muted/50 lg:hidden">
          © {new Date().getFullYear()} DataFlow. Todos os direitos reservados.
        </footer>
      </motion.div>
    </main>
  );
};

export default LoginPage;
