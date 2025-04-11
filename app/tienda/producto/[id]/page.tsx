import { notFound } from "next/navigation"
import ProductDetail from "@/components/shop/ProductDetail"
import RelatedProducts from "@/components/shop/RelatedProducts"

// Mock product data - in a real app, this would come from an API
const mockProducts = [
  {
    id: "1",
    name: "Premium Dog Food",
    description:
      "Alimento balanceado para perros adultos con ingredientes naturales y sin conservantes artificiales. Ideal para mantener la salud y vitalidad de tu mascota. Contiene proteínas de alta calidad, vitaminas y minerales esenciales.",
    price: 25.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "food",
    animal: "dog",
    features: [
      "Ingredientes naturales",
      "Sin conservantes artificiales",
      "Alto contenido proteico",
      "Vitaminas y minerales esenciales",
    ],
    stock: 15,
  },
  {
    id: "2",
    name: "Cat Scratching Post",
    description:
      "Poste rascador para gatos con juguete integrado. Estructura estable y duradera que permite a tu gato afilar sus uñas de forma natural y segura. Incluye una plataforma superior y juguetes colgantes para mantener a tu gato entretenido.",
    price: 34.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "accessories",
    animal: "cat",
    features: ["Material resistente", "Base estable", "Incluye juguetes", "Fácil de montar"],
    stock: 8,
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Producto no encontrado - VetCare",
    }
  }

  return {
    title: `${product.name} - VetCare`,
    description: product.description.substring(0, 160),
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <RelatedProducts currentProductId={product.id} category={product.category} animal={product.animal} />
      </div>
    </div>
  )
}
