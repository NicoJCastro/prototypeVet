"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Cuidado veterinario de calidad",
    description: "Atención profesional para tu mascota con los mejores especialistas",
    cta: "Agendar Cita",
    link: "/citas",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Productos premium para mascotas",
    description: "Descubre nuestra selección de alimentos y accesorios de alta calidad",
    cta: "Visitar Tienda",
    link: "/tienda",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Servicio de peluquería canina",
    description: "Dale a tu perro el mejor look con nuestros estilistas profesionales",
    cta: "Reservar Turno",
    link: "/peluqueria",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">{slide.description}</p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href={slide.link}>{slide.cta}</Link>
            </Button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
