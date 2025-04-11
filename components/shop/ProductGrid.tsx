"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { useSearchParams } from "next/navigation"

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

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)

  useEffect(() => {
    let filtered = [...mockProducts]

    const animal = searchParams.get("animal")
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")

    if (animal) {
      filtered = filtered.filter((product) => product.animal === animal)
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= Number(minPrice))
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number(maxPrice))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
      )
    }

    setFilteredProducts(filtered)
  }, [searchParams])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
        <p className="text-gray-500">Intenta con otros filtros o términos de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
