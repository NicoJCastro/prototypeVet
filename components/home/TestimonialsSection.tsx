import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María García",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Excelente atención para mi perro Max. Los veterinarios son muy profesionales y cariñosos con las mascotas.",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "La peluquería canina es fantástica. Mi Bella siempre sale hermosa y feliz después de su sesión de belleza.",
  },
  {
    id: 3,
    name: "Laura Martínez",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Muy buena selección de productos en la tienda. Precios razonables y envío rápido. Recomendado.",
  },
]

export default function TestimonialsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold">{testimonial.name}</h4>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600 italic">"{testimonial.text}"</p>
        </div>
      ))}
    </div>
  )
}
