import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import { LuDatabaseZap } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-df-bg-primary flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-df-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] bg-df-accent-violet/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 0.5px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 mb-12 group"
        >
          <div className="relative">
            <LuDatabaseZap className="w-8 h-8 text-white bg-df-accent rounded-lg p-1.5 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-df-accent rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          <h1 className="text-df-white font-bold text-xl">
            Data<span className="gradient-text">Flow</span>
          </h1>
        </Link>

        {/* 404 number */}
        <div className="relative mb-6">
          <span className="text-[8rem] sm:text-[10rem] font-black leading-none bg-linear-to-b from-df-accent/30 to-df-accent/5 bg-clip-text text-transparent select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 text-df-accent/30" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-df-white text-2xl sm:text-3xl font-bold mb-3">
          Página não encontrada
        </h2>
        <p className="text-df-muted text-base leading-relaxed mb-10">
          A página que você está procurando não existe ou foi movida.
          Verifique o endereço ou volte para a página inicial.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-df-accent hover:bg-df-accent-hover text-white px-6 py-5 rounded-xl font-semibold cursor-pointer transition-all hover:shadow-lg hover:shadow-df-accent/25 gap-2">
              <Home className="w-4 h-4" />
              Página Inicial
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-df-surface/40 text-df-text hover:bg-df-surface/15 px-6 py-5 rounded-xl font-medium cursor-pointer transition-all gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Ir para Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
