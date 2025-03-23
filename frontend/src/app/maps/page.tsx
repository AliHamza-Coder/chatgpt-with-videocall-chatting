"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Menu, Search, MapPin } from "lucide-react"
import { useSidebar } from "@/lib/sidebar-context"

export default function MapsPage() {
  const { showSidebar, setShowSidebar, toggleSidebar } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")

  // Initialize sidebar based on screen size
  // useEffect(() => {
  //   const handleResize = () => {
  //     setShowSidebar(window.innerWidth >= 768)
  //   }

  //   // Set initial state
  //   handleResize()

  //   // Add event listener for window resize
  //   window.addEventListener("resize", handleResize)

  //   // Clean up
  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar overlay */}
      {showSidebar && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed md:static inset-y-0 left-0 z-30 md:transform-none md:transition-none transition-transform duration-300 ease-in-out`}
      >
        <Sidebar onClose={toggleSidebar} isMobile={true} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden text-gray-500 dark:text-gray-400"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Maps</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <img src="/placeholder.svg?height=32&width=32" alt="User" />
            </Avatar>
          </div>
        </div>

        {/* Maps content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <div className="mb-4 flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for a location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <Button className="ml-2 bg-purple-600 hover:bg-purple-700 text-white">Search</Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[calc(100vh-12rem)]">
              <div className="relative w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Map Integration</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This is where the map would be displayed. In a real implementation, you would integrate with a
                    mapping service like Google Maps, Mapbox, or OpenStreetMap.
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Current Location</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

