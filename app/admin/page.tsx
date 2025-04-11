import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminProductsTab from "@/components/admin/AdminProductsTab"
import AdminAppointmentsTab from "@/components/admin/AdminAppointmentsTab"
import AdminUsersTab from "@/components/admin/AdminUsersTab"

export const metadata = {
  title: "Panel de Administración - VetCare",
  description: "Gestión de productos, citas y usuarios",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <AdminProductsTab />
        </TabsContent>

        <TabsContent value="appointments">
          <AdminAppointmentsTab />
        </TabsContent>

        <TabsContent value="users">
          <AdminUsersTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
