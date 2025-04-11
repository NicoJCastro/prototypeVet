import Link from "next/link"
import { Calendar, ShoppingBag, BookOpen } from "lucide-react"

const quickAccessItems = [
  {
    id: 1,
    title: "Sacar Turno",
    description: "Agenda una cita con nuestros veterinarios",
    icon: Calendar,
    link: "/citas",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Tienda Online",
    description: "Productos de calidad para tu mascota",
    icon: ShoppingBag,
    link: "/tienda",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Blog de Cuidados",
    description: "Consejos y artículos sobre salud animal",
    icon: BookOpen,
    link: "/blog",
    color: "bg-purple-500",
  },
]

export default function QuickAccess() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {quickAccessItems.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className={`${item.color} p-4 rounded-full mb-4 text-white`}>
            <item.icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
          <p className="text-gray-600 text-center">{item.description}</p>
        </Link>
      ))}
    </div>
  )
}
