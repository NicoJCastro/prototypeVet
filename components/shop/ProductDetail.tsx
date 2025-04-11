"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/providers/CartProvider"
import { useToast } from "@/components/ui/use-toast"
import { Minus, Plus, Check, ShoppingCart } from "lucide-react"

interface ProductDetailProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    features?: string[]
    stock: number
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })

    toast({
      title: "Producto añadido",
      description: `${quantity} x ${product.name} se ha añadido al carrito`,
      duration: 3000,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">{product.description}</p>

          {product.features && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Características:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <span className="mr-4">Cantidad:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {product.stock > 0 ? `${product.stock} unidades disponibles` : "Producto agotado"}
          </p>
        </div>

        <Button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full md:w-auto" size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Añadir al Carrito
        </Button>
      </div>
    </div>
  )
}
