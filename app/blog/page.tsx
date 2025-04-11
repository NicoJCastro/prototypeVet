import { Suspense } from "react"
import BlogList from "@/components/blog/BlogList"
import BlogSidebar from "@/components/blog/BlogSidebar"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Blog - VetCare",
  description: "Artículos y consejos sobre el cuidado de tu mascota",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog de Cuidados</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <Suspense fallback={<BlogListSkeleton />}>
            <BlogList />
          </Suspense>
        </div>

        <div className="lg:w-1/4">
          <BlogSidebar />
        </div>
      </div>
    </div>
  )
}

function BlogListSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}
