"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserCog, Mail, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "client",
    status: "active",
    pets: 2,
    lastLogin: "2023-12-10T14:30:00",
  },
  {
    id: "2",
    name: "María López",
    email: "maria.lopez@example.com",
    role: "vet",
    status: "active",
    specialty: "Medicina General",
    lastLogin: "2023-12-12T09:15:00",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    role: "vet",
    status: "active",
    specialty: "Cirugía",
    lastLogin: "2023-12-11T16:45:00",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    role: "client",
    status: "inactive",
    pets: 1,
    lastLogin: "2023-11-28T10:20:00",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro.sanchez@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-12-12T11:30:00",
  },
]

export default function AdminUsersTab() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Administrador</Badge>
      case "vet":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Veterinario</Badge>
      case "client":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cliente</Badge>
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar usuarios..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button>
          <UserCog className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Detalles</TableHead>
              <TableHead>Último Acceso</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No se encontraron usuarios
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        user.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === "client" ? `${user.pets} mascotas` : user.role === "vet" ? user.specialty : ""}
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastLogin).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
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
                          <UserCog className="mr-2 h-4 w-4" />
                          Editar Usuario
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Lock className="mr-2 h-4 w-4" />
                          Restablecer Contraseña
                        </DropdownMenuItem>
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
