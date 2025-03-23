// Contact type
export interface Contact {
  id: number
  name: string
  lastMessage: string
  time: string
  avatar: string
  online?: boolean
}

// Message type
export interface Message {
  id: string
  contactId: number
  sender: string
  content: string
  timestamp: string
  isUser: boolean
  attachments?: {
    name: string
    type: string
  }[]
}

// User profile type
export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  bio: string
  avatar: string
}

// Dashboard message type
export interface DashboardMessage {
  id: string
  content: string
  timestamp: string
  isUser: boolean
}

// Video contact type
export interface VideoContact {
  id: number
  name: string
  lastSeen: string
  time: string
  avatar: string
  online?: boolean
}

