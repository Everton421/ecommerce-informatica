"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-secondary/10">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-accent w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Ofertas Especiais
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-balance">
              Tecnologia de Ponta para o Seu{" "}
              <span className=" text-accent">
                Setup Perfeito
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Encontre os melhores periféricos, hardware e produtos gamer com preços imbatíveis. Parcele em até 12x sem
              juros e receba com frete grátis.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="text-base bg-accent">
                <Link href="#produtos">Ver Ofertas</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base   bg-accent">
                <Link href="/categoria/gamer" className="text-white">Setup Gamer</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-muted-foreground">Produtos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-muted-foreground">Avaliação</div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl">
              <img src="/gaming-setup-desk-rgb.jpg" alt="Gaming Setup" className="h-full w-full object-cover" />

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute left-4 top-4 rounded-lg bg-background/95 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="text-sm font-medium">Até 50% OFF</div>
                <div className="text-xs text-muted-foreground">Em produtos selecionados</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-4 right-4 rounded-lg bg-background/95 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="text-sm font-medium">Frete Grátis</div>
                <div className="text-xs text-muted-foreground">Acima de R$ 299</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-4 bottom-1/4 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />
    </section>
  )
}
