import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VetCare</h3>
            <p className="text-blue-200 mb-4">
              Cuidado veterinario profesional y productos de calidad para tu mascota.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/clinica" className="text-blue-200 hover:text-white transition-colors">
                  Clínica Veterinaria
                </Link>
              </li>
              <li>
                <Link href="/peluqueria" className="text-blue-200 hover:text-white transition-colors">
                  Peluquería Canina
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-blue-200 hover:text-white transition-colors">
                  Tienda de Mascotas
                </Link>
              </li>
              <li>
                <Link href="/farmacia" className="text-blue-200 hover:text-white transition-colors">
                  Farmacia Veterinaria
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/citas" className="text-blue-200 hover:text-white transition-colors">
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Blog de Cuidados
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-blue-200 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-blue-200 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <address className="not-italic text-blue-200">
              <p className="mb-2">Av. Veterinaria 123</p>
              <p className="mb-2">Ciudad, CP 12345</p>
              <p className="mb-2">Tel: (123) 456-7890</p>
              <p>Email: info@vetcare.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} VetCare. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
