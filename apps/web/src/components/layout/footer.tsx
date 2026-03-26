import { LuDatabaseZap } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const techStack = [
  "Next.js",
  "React",
  "Express",
  "BullMQ",
  "Redis",
  "PostgreSQL",
  "Prisma",
  "Turborepo",
];

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 bg-df-bg-deep border-t border-df-surface/20 pt-16 pb-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <LuDatabaseZap className="w-8 h-8 text-white bg-df-accent rounded-lg p-1.5" />
              <h3 className="text-df-white font-bold text-xl">
                Data<span className="gradient-text">Flow</span>
              </h3>
            </Link>
            <p className="text-df-muted text-sm leading-relaxed max-w-xs">
              Plataforma moderna para processamento de grandes volumes de dados
              com dashboards interativos em tempo real.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/eupablomonteiro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-df-surface/30 flex items-center justify-center text-df-muted hover:text-df-white hover:bg-df-accent/20 transition-all"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/eupablomonteiro/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-df-surface/30 flex items-center justify-center text-df-muted hover:text-df-white hover:bg-df-accent/20 transition-all"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-df-white font-semibold text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                "Home",
                "Como Funciona",
                "Arquitetura",
                "Segurança",
                "Dashboard",
              ].map((item) => (
                <a
                  key={item}
                  href={
                    item === "Dashboard"
                      ? "/dashboard"
                      : `#${item.toLowerCase().replace(/ /g, "-")}`
                  }
                  className="text-df-muted text-sm hover:text-df-accent-light transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Tech stack */}
          <div className="flex flex-col gap-4">
            <h4 className="text-df-white font-semibold text-sm uppercase tracking-wider">
              Tecnologias
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-df-surface/20 border border-df-surface/30 text-df-muted text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-df-surface/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-df-muted/70 text-sm">
            © {new Date().getFullYear()} DataFlow. Projeto de demonstração
            técnica.
          </p>
          <p className="text-df-muted/50 text-xs">
            Desenvolvido por{" "}
            <a
              href="https://github.com/eupablomonteiro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-df-accent-light hover:text-df-accent transition-colors"
            >
              Pablo Monteiro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
