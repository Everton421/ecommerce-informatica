"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/cart-context"

const categories = [
  { name: "Periféricos", href: "/categoria/perifericos" },
  { name: "Gamer", href: "/categoria/gamer" },
  { name: "Hardware", href: "/categoria/hardware" },
  { name: "Notebooks", href: "/categoria/notebooks" },
  { name: "Monitores", href: "/categoria/monitores" },
  { name: "Componentes", href: "/categoria/componentes" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top Bar */}
      <div className="bg-black text-secondary-foreground">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-sm">
            🔥 Frete grátis para compras acima de R$ 299 | Parcele em até 12x sem juros
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
              <span className="text-xl font-bold text-primary-foreground">TI</span>
            </div>
            <span className="hidden text-xl font-bold md:inline-block">TechInfo</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-xl md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Buscar produtos..." className="w-full pl-10" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>

            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories - Desktop */}
        <div className="hidden border-t py-3 md:block">
          <div className="flex items-center justify-center gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar produtos..." className="w-full pl-10" />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Mobile User Link */}
              <div className="mt-4 border-t pt-4">
                <Link
                  href="/conta"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Minha Conta
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
