import Image from "next/image"
import Link from "next/link"
import { Stethoscope, Scissors, Pill } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Clínica Veterinaria",
    description: "Atención médica completa para tu mascota con profesionales especializados",
    icon: Stethoscope,
    link: "/clinica",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Peluquería Canina",
    description: "Servicios de baño, corte y estética para que tu perro luzca increíble",
    icon: Scissors,
    link: "/peluqueria",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Farmacia Veterinaria",
    description: "Medicamentos y suplementos de calidad para la salud de tu mascota",
    icon: Pill,
    link: "/farmacia",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function ServiceSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service) => (
        <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="relative h-48">
            <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <service.icon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link href={service.link} className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Conocer más →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
