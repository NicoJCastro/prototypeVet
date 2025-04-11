"use client"

import { X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/components/providers/CartProvider"
import Image from "next/image"
import Link from "next/link"

interface CartSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CartSidebar({ open, setOpen }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-4">
              <p className="mb-4 text-gray-500">Tu carrito está vacío</p>
              <Button onClick={() => setOpen(false)} asChild>
                <Link href="/tienda">Ir a la Tienda</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto p-4">
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onRemove={() => removeFromCart(item.id)}
                      onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                    />
                  ))}
                </ul>
              </div>

              <div className="border-t p-4">
                <div className="mb-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceder al Pago</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

interface CartItemRowProps {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

function CartItemRow({ item, onRemove, onUpdateQuantity }: CartItemRowProps) {
  return (
    <li className="py-4">
      <div className="flex items-center">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center">
          <button onClick={() => onUpdateQuantity(item.quantity - 1)} className="rounded-full p-1 hover:bg-gray-100">
            <Minus className="h-4 w-4" />
            <span className="sr-only">Disminuir cantidad</span>
          </button>
          <span className="mx-2 w-6 text-center">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.quantity + 1)} className="rounded-full p-1 hover:bg-gray-100">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Aumentar cantidad</span>
          </button>
        </div>
        <button
          onClick={onRemove}
          className="ml-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Eliminar</span>
        </button>
      </div>
    </li>
  )
}
