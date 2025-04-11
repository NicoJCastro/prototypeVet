"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/providers/AuthProvider"
import { Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface AppointmentFormProps {
  type: "clinica" | "peluqueria"
}

// Mock data for veterinarians and services
const veterinarians = [
  { id: "1", name: "Dr. Juan Pérez", specialty: "Medicina General" },
  { id: "2", name: "Dra. María López", specialty: "Cirugía" },
  { id: "3", name: "Dr. Carlos Rodríguez", specialty: "Dermatología" },
]

const groomingServices = [
  { id: "1", name: "Baño Completo", duration: 60, price: 25 },
  { id: "2", name: "Corte de Pelo", duration: 90, price: 35 },
  { id: "3", name: "Baño + Corte", duration: 120, price: 50 },
  { id: "4", name: "Corte de Uñas", duration: 30, price: 15 },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function AppointmentForm({ type }: AppointmentFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [reason, setReason] = useState("")
  const [service, setService] = useState("")
  const [veterinarian, setVeterinarian] = useState("")
  const [step, setStep] = useState(1)

  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleNext = () => {
    if (step === 1) {
      if (!date || !timeSlot) {
        toast({
          title: "Error",
          description: "Por favor selecciona fecha y hora para la cita",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!petName || !petType) {
        toast({
          title: "Error",
          description: "Por favor completa la información de tu mascota",
          variant: "destructive",
        })
        return
      }

      if (type === "clinica" && !veterinarian) {
        toast({
          title: "Error",
          description: "Por favor selecciona un veterinario",
          variant: "destructive",
        })
        return
      }

      if (type === "peluqueria" && !service) {
        toast({
          title: "Error",
          description: "Por favor selecciona un servicio",
          variant: "destructive",
        })
        return
      }
    }

    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would be an API call to save the appointment
    toast({
      title: "Cita agendada",
      description: `Tu cita ha sido agendada para el ${format(date!, "PPP", { locale: es })} a las ${timeSlot}`,
    })

    // Redirect to confirmation page
    setTimeout(() => {
      router.push("/citas/confirmacion")
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "clinica" ? "Cita Veterinaria" : "Reserva de Peluquería"}</CardTitle>
        <CardDescription>
          {type === "clinica"
            ? "Agenda una consulta con nuestros veterinarios"
            : "Reserva un turno de peluquería para tu mascota"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Selecciona una fecha</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    // Disable weekends and past dates
                    const day = date.getDay()
                    const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0))
                    return day === 0 || day === 6 || isPastDate
                  }}
                  className="rounded-md border mx-auto"
                />
              </div>

              {date && (
                <div>
                  <Label className="mb-2 block">Selecciona un horario</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={timeSlot === time ? "default" : "outline"}
                        onClick={() => setTimeSlot(time)}
                        className="flex items-center justify-center"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="petName">Nombre de la mascota</Label>
                  <Input id="petName" value={petName} onChange={(e) => setPetName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="petType">Tipo de mascota</Label>
                  <Select value={petType} onValueChange={setPetType}>
                    <SelectTrigger id="petType">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Perro</SelectItem>
                      <SelectItem value="cat">Gato</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {type === "clinica" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="veterinarian">Veterinario</Label>
                    <Select value={veterinarian} onValueChange={setVeterinarian}>
                      <SelectTrigger id="veterinarian">
                        <SelectValue placeholder="Selecciona veterinario" />
                      </SelectTrigger>
                      <SelectContent>
                        {veterinarians.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name} - {vet.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Motivo de la consulta</Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Describe brevemente el motivo de la consulta"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {type === "peluqueria" && (
                <div className="space-y-2">
                  <Label htmlFor="service">Servicio</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecciona servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {groomingServices.map((svc) => (
                        <SelectItem key={svc.id} value={svc.id}>
                          {svc.name} - ${svc.price} ({svc.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Resumen de la Cita</h3>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Fecha:</span>
                    <span>{date ? format(date, "PPP", { locale: es }) : ""}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Hora:</span>
                    <span>{timeSlot}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Mascota:</span>
                    <span>
                      {petName} ({petType === "dog" ? "Perro" : petType === "cat" ? "Gato" : "Otro"})
                    </span>
                  </div>

                  {type === "clinica" && (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Veterinario:</span>
                        <span>{veterinarian && veterinarians.find((v) => v.id === veterinarian)?.name}</span>
                      </div>

                      {reason && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">Motivo:</span>
                          <span className="text-right max-w-[60%]">{reason}</span>
                        </div>
                      )}
                    </>
                  )}

                  {type === "peluqueria" && service && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Servicio:</span>
                      <span>
                        {groomingServices.find((s) => s.id === service)?.name} - $
                        {groomingServices.find((s) => s.id === service)?.price}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Al confirmar esta cita, aceptas nuestros términos y condiciones. Puedes cancelar o reprogramar tu cita
                  hasta 24 horas antes del horario reservado.
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            Atrás
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <Button type="button" onClick={handleNext}>
            Siguiente
          </Button>
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Confirmar Cita
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
