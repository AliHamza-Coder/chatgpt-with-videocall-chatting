import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to dashboard page
  redirect("/dashboard")

  return null
}
