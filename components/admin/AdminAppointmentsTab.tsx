"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Search, MoreHorizontal, Eye, X, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock appointments data
const mockAppointments = [
  {
    id: "1",
    date: new Date(2023, 11, 20, 10, 30),
    type: "clinica",
    petName: "Max",
    petType: "dog",
    ownerName: "Juan Pérez",
    status: "confirmed",
    veterinarian: "Dr. Carlos Rodríguez",
  },
  {
    id: "2",
    date: new Date(2023, 11, 21, 15, 0),
    type: "peluqueria",
    petName: "Luna",
    petType: "dog",
    ownerName: "María García",
    status: "pending",
    service: "Baño + Corte",
  },
  {
    id: "3",
    date: new Date(2023, 11, 22, 9, 0),
    type: "clinica",
    petName: "Michi",
    petType: "cat",
    ownerName: "Pedro López",
    status: "completed",
    veterinarian: "Dra. María López",
  },
  {
    id: "4",
    date: new Date(2023, 11, 23, 16, 30),
    type: "peluqueria",
    petName: "Rocky",
    petType: "dog",
    ownerName: "Ana Martínez",
    status: "cancelled",
    service: "Baño Completo",
  },
  {
    id: "5",
    date: new Date(2023, 11, 24, 11, 0),
    type: "clinica",
    petName: "Simba",
    petType: "cat",
    ownerName: "Carlos Sánchez",
    status: "confirmed",
    veterinarian: "Dr. Juan Pérez",
  },
]

export default function AdminAppointmentsTab() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? appointment.status === statusFilter : true
    const matchesType = typeFilter ? appointment.type === typeFilter : true

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completada</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto md:flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar por mascota o dueño..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="confirmed">Confirmadas</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="completed">Completadas</SelectItem>
              <SelectItem value="cancelled">Canceladas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="clinica">Clínica</SelectItem>
              <SelectItem value="peluqueria">Peluquería</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Mascota</TableHead>
              <TableHead>Dueño</TableHead>
              <TableHead>Detalles</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No se encontraron citas
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {format(appointment.date, "PPP", { locale: es })}
                    <br />
                    <span className="text-gray-500">{format(appointment.date, "HH:mm", { locale: es })}</span>
                  </TableCell>
                  <TableCell>{appointment.type === "clinica" ? "Clínica" : "Peluquería"}</TableCell>
                  <TableCell>
                    {appointment.petName}
                    <br />
                    <span className="text-gray-500 capitalize">{appointment.petType === "dog" ? "Perro" : "Gato"}</span>
                  </TableCell>
                  <TableCell>{appointment.ownerName}</TableCell>
                  <TableCell>
                    {appointment.type === "clinica" ? appointment.veterinarian : appointment.service}
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        {appointment.status === "pending" && (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            Confirmar
                          </DropdownMenuItem>
                        )}
                        {(appointment.status === "pending" || appointment.status === "confirmed") && (
                          <DropdownMenuItem className="text-red-600">
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
