"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash2, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Premium Dog Food",
    price: 25.99,
    category: "food",
    animal: "dog",
    stock: 15,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Cat Scratching Post",
    price: 34.99,
    category: "accessories",
    animal: "cat",
    stock: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Dog Collar",
    price: 12.99,
    category: "accessories",
    animal: "dog",
    stock: 22,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Cat Food Premium",
    price: 18.99,
    category: "food",
    animal: "cat",
    stock: 30,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Dog Toy Bundle",
    price: 15.99,
    category: "toys",
    animal: "dog",
    stock: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function AdminProductsTab() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const { toast } = useToast()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.animal.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setDeleteDialogOpen(false)
      setProductToDelete(null)

      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente",
      })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Animal</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative w-10 h-10 rounded-md overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className="capitalize">{product.category}</span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{product.animal}</span>
                  </TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
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
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setProductToDelete(product.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
