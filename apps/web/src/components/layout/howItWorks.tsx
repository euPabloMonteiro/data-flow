"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaFileCsv } from "react-icons/fa6";
import { FaServer } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";

const data = [
  {
    icon: <FaFileCsv className="text-df-accent text-xl" />,
    title: "Upload de CSV",
    description:
      "Arraste e solte arquivos pesados. O frontend realiza a validação inicial antes do envio.",
    color: "bg-df-accent/10",
    borderColor: "group-hover:border-df-accent/40",
    step: "01",
  },
  {
    icon: <FaServer className="text-rose-400 text-xl" />,
    title: "Fila Assíncrona",
    description:
      "O arquivo é enviado para um Worker (BullMQ + Redis) para processamento em background.",
    color: "bg-rose-400/10",
    borderColor: "group-hover:border-rose-400/40",
    step: "02",
  },
  {
    icon: <FaSpinner className="text-emerald-400 text-xl" />,
    title: "Acompanhamento",
    description:
      "Acompanhe em tempo real o progresso via polling, sem bloquear a interface.",
    color: "bg-emerald-400/10",
    borderColor: "group-hover:border-emerald-400/40",
    step: "03",
  },
  {
    icon: <GrAnalytics className="text-orange-400 text-xl" />,
    title: "Visualização",
    description:
      "Acesse as métricas processadas em um dashboard interativo e de alta performance.",
    color: "bg-orange-400/10",
    borderColor: "group-hover:border-orange-400/40",
    step: "04",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 bg-df-light-bg overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <span className="text-df-accent font-semibold text-sm uppercase tracking-widest">
            Passo a passo
          </span>
          <h2 className="text-df-light-text font-bold text-center text-3xl sm:text-4xl lg:text-5xl">
            Como Funciona
          </h2>
          <p className="w-full max-w-2xl text-df-light-muted text-center text-lg">
            Fluxo de processamento otimizado para lidar com milhões de linhas
            sem impactar a experiência do usuário.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative bg-white border border-df-muted/15 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-df-accent/5 hover:-translate-y-1 ${item.borderColor}`}
            >
              {/* Step number */}
              <div className="absolute top-3 right-4 text-4xl font-black text-df-muted/20 select-none">
                {item.step}
              </div>

              {/* Icon */}
              <div
                className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-5`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-df-light-text font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-df-light-muted text-sm leading-relaxed flex-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
