"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "client" | "vet" | "admin"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing user from localStorage:", error)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // This would be an API call in a real application
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from the API
      const userData: User = {
        id: "1",
        name: "Usuario Demo",
        email,
        role: "client",
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true)
    try {
      // This would be an API call in a real application
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from the API
      const userData: User = {
        id: "1",
        name,
        email,
        role,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      router.push("/")
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
