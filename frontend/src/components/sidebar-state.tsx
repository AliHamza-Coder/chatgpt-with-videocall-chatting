"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type SidebarContextType = {
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  showMessagesSidebar: boolean
  setShowMessagesSidebar: (show: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showMessagesSidebar, setShowMessagesSidebar] = useState(true)

  // Check localStorage on mount to restore sidebar state
  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarState")
    const storedMessagesSidebarState = localStorage.getItem("messagesSidebarState")

    if (storedSidebarState) {
      setShowSidebar(storedSidebarState === "true")
    }

    if (storedMessagesSidebarState) {
      setShowMessagesSidebar(storedMessagesSidebarState === "true")
    }
  }, [])

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("sidebarState", showSidebar.toString())
  }, [showSidebar])

  useEffect(() => {
    localStorage.setItem("messagesSidebarState", showMessagesSidebar.toString())
  }, [showMessagesSidebar])

  return (
    <SidebarContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        showMessagesSidebar,
        setShowMessagesSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarState() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebarState must be used within a SidebarProvider")
  }
  return context
}

