import AppointmentForm from "@/components/appointments/AppointmentForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Agendar Cita - VetCare",
  description: "Agenda una cita para tu mascota en nuestra clínica veterinaria o peluquería canina",
}

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Agendar Cita</h1>

      <Tabs defaultValue="clinica" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="clinica">Clínica Veterinaria</TabsTrigger>
          <TabsTrigger value="peluqueria">Peluquería Canina</TabsTrigger>
        </TabsList>

        <TabsContent value="clinica">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              Agenda una cita con nuestros veterinarios para consultas, vacunaciones, tratamientos y otros servicios
              médicos para tu mascota.
            </p>
            <AppointmentForm type="clinica" />
          </div>
        </TabsContent>

        <TabsContent value="peluqueria">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6">
              Reserva un turno de peluquería para tu perro. Ofrecemos servicios de baño, corte, cepillado y más para que
              tu mascota luzca increíble.
            </p>
            <AppointmentForm type="peluqueria" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
