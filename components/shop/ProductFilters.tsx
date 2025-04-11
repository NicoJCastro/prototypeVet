"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [animal, setAnimal] = useState(searchParams.get("animal") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 100),
  ])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)
    if (animal) params.set("animal", animal)
    if (category) params.set("category", category)
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 100) params.set("maxPrice", priceRange[1].toString())

    router.push(`${pathname}?${params.toString()}`)
  }

  const resetFilters = () => {
    setSearch("")
    setAnimal("")
    setCategory("")
    setPriceRange([0, 100])
    router.push(pathname)
  }

  const hasActiveFilters = search || animal || category || priceRange[0] > 0 || priceRange[1] < 100

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="mb-4 w-full flex items-center justify-center"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar Filtros
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Buscar productos..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
        />
      </div>

      <Accordion type="multiple" defaultValue={["animal", "category", "price"]}>
        <AccordionItem value="animal">
          <AccordionTrigger>Tipo de Mascota</AccordionTrigger>
          <AccordionContent>
            <Select value={animal} onValueChange={setAnimal}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las mascotas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las mascotas</SelectItem>
                <SelectItem value="dog">Perros</SelectItem>
                <SelectItem value="cat">Gatos</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Categoría</AccordionTrigger>
          <AccordionContent>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="food">Alimentos</SelectItem>
                <SelectItem value="accessories">Accesorios</SelectItem>
                <SelectItem value="toys">Juguetes</SelectItem>
                <SelectItem value="health">Salud</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full">
        Aplicar Filtros
      </Button>
    </div>
  )
}
