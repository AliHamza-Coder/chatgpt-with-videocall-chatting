import type { Contact, Message, UserProfile, DashboardMessage, VideoContact } from "./types"
import contactsData from "@/api/contacts.json"
import messagesData from "@/api/messages.json"
import profileData from "@/api/profile.json"
import dashboardMessagesData from "@/api/dashboard-messages.json"
import videoContactsData from "@/api/video-contacts.json"

// Mock API delay to simulate network request
const apiDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch contacts
export async function fetchContacts(): Promise<Contact[]> {
  // Simulate API call
  await apiDelay(800)

  return contactsData
}

// Fetch messages for a specific contact
export async function fetchMessages(contactId: number): Promise<Message[]> {
  // Simulate API call
  await apiDelay(600)

  // Get messages for the specific contact ID
  const contactMessages = messagesData[contactId.toString() as keyof typeof messagesData] || []

  return contactMessages
}

// Fetch user profile
export async function fetchUserProfile(): Promise<UserProfile> {
  // Simulate API call
  await apiDelay(700)

  return profileData
}

// Fetch dashboard messages
export async function fetchDashboardMessages(): Promise<DashboardMessage[]> {
  // Simulate API call
  await apiDelay(500)

  return dashboardMessagesData
}

// Fetch video contacts
export async function fetchVideoContacts(): Promise<VideoContact[]> {
  // Simulate API call
  await apiDelay(800)

  return videoContactsData
}

