"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextType {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false)

  // Initialize sidebar state based on screen size and stored preference
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(true)
      } else {
        const storedSidebarState = localStorage.getItem("sidebarOpen")
        setShowSidebar(storedSidebarState === "true")
      }
    }

    // Set initial state
    handleResize()

    // Add event listener for window resize
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update localStorage when sidebar state changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      localStorage.setItem("sidebarOpen", showSidebar.toString())
    }
  }, [showSidebar])

  const toggleSidebar = () => {
    setShowSidebar((prev) => {
      const newState = !prev
      if (window.innerWidth < 768) {
        localStorage.setItem("sidebarOpen", newState.toString())
      }
      return newState
    })
  }

  // Ensure sidebar is always visible on desktop without animation
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth >= 768) {
        // Immediately set to true without animation for desktop
        setShowSidebar(true)
      }
    }

    // Listen for route changes in Next.js
    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar, toggleSidebar }}>{children}</SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

