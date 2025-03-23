"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Menu, Send, Paperclip } from "lucide-react"
import { useSidebar } from "@/lib/sidebar-context"
import { fetchDashboardMessages } from "@/utils/api"
import type { DashboardMessage } from "@/utils/types"
import { Avatar } from "@/components/ui/avatar"

export default function DashboardPage() {
  const { showSidebar, setShowSidebar, toggleSidebar } = useSidebar()
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState<DashboardMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch dashboard messages
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true)
      try {
        const messagesData = await fetchDashboardMessages()
        setMessages(messagesData)
      } catch (error) {
        console.error("Error loading messages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === "") return

    const newMessage: DashboardMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      timestamp: "Just now",
      isUser: true,
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: DashboardMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm your productivity assistant. I can help you manage tasks, schedule meetings, and provide information about your projects.",
        timestamp: "Just now",
        isUser: false,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <img src="/placeholder.svg?height=32&width=32" alt="User" />
            </Avatar>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500 dark:text-gray-400">Loading messages...</div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 mr-3 mt-1">
                      <img src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] ${message.isUser ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white"} rounded-lg p-3 shadow-sm`}
                  >
                    <div>{message.content}</div>
                    <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
                  </div>
                  {message.isUser && (
                    <Avatar className="h-8 w-8 ml-3 mt-1">
                      <img src="/placeholder.svg?height=32&width=32" alt="You" />
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Message Fastwork AI..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="mx-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

