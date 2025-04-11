"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

// Mock product data - in a real app, this would come from an API
const mockProducts = [
  {
    id: "1",
    name: "Premium Dog Food",
    description: "Alimento balanceado para perros adultos",
    price: 25.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "food",
    animal: "dog",
  },
  {
    id: "2",
    name: "Cat Scratching Post",
    description: "Poste rascador para gatos con juguete",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    animal: "cat",
  },
  {
    id: "3",
    name: "Dog Collar",
    description: "Collar ajustable para perros medianos",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    animal: "dog",
  },
  {
    id: "4",
    name: "Cat Food Premium",
    description: "Alimento húmedo para gatos",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "food",
    animal: "cat",
  },
  {
    id: "5",
    name: "Dog Toy Bundle",
    description: "Set de juguetes para perros",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "toys",
    animal: "dog",
  },
  {
    id: "6",
    name: "Cat Bed",
    description: "Cama suave y cómoda para gatos",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    animal: "cat",
  },
]

interface RelatedProductsProps {
  currentProductId: string
  category: string
  animal: string
}

export default function RelatedProducts({ currentProductId, category, animal }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    // Filter products by category and animal, excluding the current product
    const filtered = mockProducts
      .filter(
        (product) => product.id !== currentProductId && (product.category === category || product.animal === animal),
      )
      .slice(0, 3) // Limit to 3 products

    setRelatedProducts(filtered)
  }, [currentProductId, category, animal])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
