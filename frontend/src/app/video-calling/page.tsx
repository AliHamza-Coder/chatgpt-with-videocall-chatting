"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Menu, Mic, MicOff, VideoOff, Phone, Video, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/lib/sidebar-context"
import { fetchVideoContacts } from "@/utils/api"
import type { VideoContact } from "@/utils/types"

export default function VideoCallingPage() {
  const { showSidebar, setShowSidebar, toggleSidebar } = useSidebar()
  const [micMuted, setMicMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)
  const [inCall, setInCall] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [contacts, setContacts] = useState<VideoContact[]>([])
  const [activeContact, setActiveContact] = useState<VideoContact | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch video contacts
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true)
      try {
        const contactsData = await fetchVideoContacts()
        setContacts(contactsData)
      } catch (error) {
        console.error("Error loading contacts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [])

  const startCall = () => {
    setInCall(true)
  }

  const endCall = () => {
    setInCall(false)
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Video Calling</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <img src="/placeholder.svg?height=32&width=32" alt="User" />
            </Avatar>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row">
          {/* Contacts list */}
          {!inCall || !activeContact ? (
            <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Contacts</h2>

                {isLoading ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading contacts...</div>
                ) : filteredContacts.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">No contacts found</div>
                ) : (
                  <div className="space-y-2">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-3 rounded-lg flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setActiveContact(contact)}
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <Avatar className="h-10 w-10 mr-3">
                              <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{contact.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{contact.lastSeen}</div>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveContact(contact)
                            startCall()
                          }}
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Video call area */}
          <div className={`flex-1 ${inCall ? "bg-gray-900" : "bg-gray-50 dark:bg-gray-900"}`}>
            {inCall && activeContact ? (
              <div className="relative h-full">
                {/* Call header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 text-white bg-black bg-opacity-50 hover:bg-black hover:bg-opacity-70"
                      onClick={() => {
                        endCall()
                        setActiveContact(null)
                      }}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <img src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                      </Avatar>
                      <div>
                        <div className="font-medium">{activeContact.name}</div>
                        <div className="text-xs text-gray-300">{activeContact.online ? "Online" : "Offline"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>

                {/* Main video display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {videoOff ? (
                    <div className="flex flex-col items-center justify-center">
                      <Avatar className="h-32 w-32 mb-4">
                        <img src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                      </Avatar>
                      <h2 className="text-2xl font-bold text-white mb-2">{activeContact.name}</h2>
                      <p className="text-gray-300">Video paused</p>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=720&width=1280"
                        alt="Video Call"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Self view */}
                <div className="absolute bottom-24 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                  {videoOff ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <Avatar className="h-16 w-16">
                        <img src="/placeholder.svg?height=64&width=64" alt="You" />
                      </Avatar>
                    </div>
                  ) : (
                    <img
                      src="/placeholder.svg?height=144&width=192"
                      alt="Self View"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Call controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-gray-800 bg-opacity-70 px-6 py-3 rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${micMuted ? "bg-red-500 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
                    onClick={() => setMicMuted(!micMuted)}
                  >
                    {micMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-red-500 text-white hover:bg-red-600"
                    onClick={() => {
                      endCall()
                      setActiveContact(null)
                    }}
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${videoOff ? "bg-red-500 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
                    onClick={() => setVideoOff(!videoOff)}
                  >
                    {videoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            ) : activeContact ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="text-center mb-8">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <img src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                  </Avatar>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{activeContact.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{activeContact.lastSeen}</p>
                  <div className="flex justify-center space-x-4">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={startCall}>
                      <Video className="mr-2 h-5 w-5" />
                      Start Video Call
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-300 dark:border-gray-600"
                      onClick={() => setActiveContact(null)}
                    >
                      <X className="mr-2 h-5 w-5" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="text-center mb-8">
                  <Video className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Video Calling</h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Select a contact from the list to start a video call
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

