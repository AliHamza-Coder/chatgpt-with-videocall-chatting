"use client"
import { useRouter, usePathname } from "next/navigation"
import { Home, Map, MessageSquare, Video, User, LogOut, X } from "lucide-react"
import { useEffect } from "react"
import { Button } from "./ui/button"

interface SidebarProps {
  onClose?: () => void
  isMobile?: boolean
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
}

export function Sidebar({ onClose, isMobile = false, showSidebar, setShowSidebar }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768 // md breakpoint

      // Only update state if we're transitioning between mobile and desktop
      if (isDesktop) {
        setShowSidebar(true)
      } else if (!isDesktop && showSidebar) {
        // On mobile, respect the stored preference
        const storedSidebarState = localStorage.getItem("sidebarOpen")
        setShowSidebar(storedSidebarState === "true")
      }
    }

    // Set initial state based on screen size and stored preference
    const isDesktop = window.innerWidth >= 768
    if (isDesktop) {
      setShowSidebar(true)
    } else {
      const storedSidebarState = localStorage.getItem("sidebarOpen")
      setShowSidebar(storedSidebarState === "true")
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [setShowSidebar, showSidebar])

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose()
      localStorage.setItem("sidebarOpen", "false")
    }
    router.push("/login")
  }

  // Update the navigateTo function to only close the sidebar on mobile
  const navigateTo = (path: string) => {
    // Only close the sidebar on mobile
    if (window.innerWidth < 768 && onClose) {
      onClose()
      localStorage.setItem("sidebarOpen", "false")
    }
    router.push(path)
  }

  return (
    <div
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } fixed md:static inset-y-0 left-0 z-30 md:transform-none md:transition-none transition-transform duration-300 ease-in-out`}
    >
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="font-bold text-xl text-gray-800 dark:text-white">Fastwork AI</div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-500 dark:text-gray-400"
              onClick={() => {
                if (onClose) onClose()
                localStorage.setItem("sidebarOpen", "false")
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/dashboard") ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700"}`}
              onClick={() => navigateTo("/dashboard")}
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/chat") ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700"}`}
              onClick={() => navigateTo("/chat")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Chatting
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/maps") ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700"}`}
              onClick={() => navigateTo("/maps")}
            >
              <Map className="mr-2 h-5 w-5" />
              Maps
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/video-calling") ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700"}`}
              onClick={() => navigateTo("/video-calling")}
            >
              <Video className="mr-2 h-5 w-5" />
              Video Calling
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${isActive("/profile") ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700"}`}
              onClick={() => navigateTo("/profile")}
            >
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

