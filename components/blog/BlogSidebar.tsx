import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Mock categories and tags data
const categories = [
  { name: "Perros", count: 12 },
  { name: "Gatos", count: 8 },
  { name: "Salud", count: 15 },
  { name: "Alimentación", count: 7 },
  { name: "Comportamiento", count: 5 },
]

const popularTags = [
  "cuidados",
  "alimentación",
  "salud",
  "entrenamiento",
  "vacunas",
  "adopción",
  "higiene",
  "comportamiento",
]

export default function BlogSidebar() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Buscar</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input type="search" placeholder="Buscar artículos..." className="pl-8" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categorías</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/blog/categoria/${category.name.toLowerCase()}`}
                className="flex justify-between items-center py-2 hover:text-blue-600 transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tags Populares</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Suscríbete</h3>
        <p className="text-sm text-gray-600 mb-4">
          Recibe los últimos artículos y consejos para el cuidado de tu mascota.
        </p>
        <div className="space-y-2">
          <Input placeholder="Tu email" type="email" />
          <Button className="w-full">Suscribirse</Button>
        </div>
      </div>
    </div>
  )
}
