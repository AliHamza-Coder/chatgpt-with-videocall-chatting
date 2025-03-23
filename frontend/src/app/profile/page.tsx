"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Menu, Camera, Mail, Phone, Building, Calendar } from "lucide-react"
import { useSidebar } from "@/lib/sidebar-context"
import { fetchUserProfile } from "@/utils/api"

export default function ProfilePage() {
  const { showSidebar, setShowSidebar, toggleSidebar } = useSidebar()
  const [isLoading, setIsLoading] = useState(true)

  // Profile form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true)
      try {
        const profile = await fetchUserProfile()
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setEmail(profile.email)
        setPhone(profile.phone)
        setCompany(profile.company)
        setPosition(profile.position)
        setBio(profile.bio)
        setAvatar(profile.avatar)
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSaveProfile = () => {
    // In a real app, this would send the updated profile to the server
    alert("Profile saved successfully!")
  }

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
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Profile</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <img src={avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
            </Avatar>
          </div>
        </div>

        {/* Profile content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500 dark:text-gray-400">Loading profile...</div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Profile header */}
                <div className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-600">
                  <div className="absolute -bottom-16 left-8">
                    <div className="relative">
                      <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800">
                        <img src={avatar || "/placeholder.svg?height=128&width=128"} alt="Profile" />
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-purple-600 hover:bg-purple-700 text-white h-8 w-8"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {position} at {company}
                  </p>

                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                          </label>
                          <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                            <Input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company
                          </label>
                          <div className="flex items-center">
                            <Building className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                            <Input
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                          </label>
                          <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                            <Input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Position
                          </label>
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                            <Input
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                      <textarea
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white p-2"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

