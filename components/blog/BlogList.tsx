import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

// Mock blog posts data - in a real app, this would come from an API
const blogPosts = [
  {
    id: "1",
    title: "Cuidados básicos para tu perro en verano",
    excerpt: "Consejos para mantener a tu mascota fresca y saludable durante los meses de calor.",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Dr. Juan Pérez",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: new Date(2023, 11, 15),
    category: "Perros",
    tags: ["verano", "cuidados", "hidratación"],
  },
  {
    id: "2",
    title: "Alimentación adecuada para gatos adultos",
    excerpt: "Guía completa sobre la nutrición felina y cómo elegir el mejor alimento para tu gato.",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Dra. María López",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: new Date(2023, 10, 28),
    category: "Gatos",
    tags: ["alimentación", "nutrición", "salud"],
  },
  {
    id: "3",
    title: "Señales de alerta en la salud de tu mascota",
    excerpt: "Aprende a identificar los signos que indican que tu mascota necesita atención veterinaria urgente.",
    content: "Lorem ipsum dolor sit amet...",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Dr. Carlos Rodríguez",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: new Date(2023, 9, 10),
    category: "Salud",
    tags: ["emergencias", "síntomas", "prevención"],
  },
]

export default function BlogList() {
  return (
    <div className="space-y-8">
      {blogPosts.map((post) => (
        <article key={post.id} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-64 w-full">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(post.date, { addSuffix: true, locale: es })}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600 mb-4">{post.excerpt}</p>

            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Leer más →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
