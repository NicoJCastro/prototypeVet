"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/providers/CartProvider"
import { useAuth } from "@/components/providers/AuthProvider"
import CartSidebar from "@/components/shop/CartSidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Clínica", href: "/clinica" },
  { name: "Peluquería", href: "/peluqueria" },
  { name: "Tienda", href: "/tienda" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartOpen, setCartOpen, cartItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            VetCare
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="relative text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="h-6 w-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/perfil">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mis-mascotas">Mis Mascotas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mis-citas">Mis Citas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/mis-compras">Mis Compras</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Panel de Administración</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "vet" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/vet">Panel de Veterinario</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-gray-50">
          <div className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium py-2 ${
                  pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
    </header>
  )
}
