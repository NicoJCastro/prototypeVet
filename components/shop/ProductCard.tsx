"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/providers/CartProvider"
import { useToast } from "@/components/ui/use-toast"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido al carrito`,
      duration: 3000,
    })
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/tienda/producto/${product.id}`} className="block relative h-48">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </Link>

      <div className="p-4">
        <Link href={`/tienda/producto/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>

        <Button onClick={handleAddToCart} className="w-full">
          Añadir al Carrito
        </Button>
      </div>
    </div>
  )
}
