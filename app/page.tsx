import HeroSlider from "@/components/home/HeroSlider"
import QuickAccess from "@/components/home/QuickAccess"
import ServiceSection from "@/components/home/ServiceSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSlider />

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Accesos Rápidos</h2>
        <QuickAccess />
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <ServiceSection />
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Lo Que Dicen Nuestros Clientes</h2>
          <TestimonialsSection />
        </div>
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Necesitas atención para tu mascota?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Agenda una cita con nuestros veterinarios profesionales y dale a tu mascota el cuidado que merece.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Agendar Cita Ahora
        </Button>
      </section>
    </div>
  )
}
