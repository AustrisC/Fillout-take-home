import "@/styles/globals.css"

import { LucideHome } from "lucide-react"
import type { Metadata } from "next"

import BottomNavigation from "./bottom-navigation"
import { NavigationProvider } from "./navigation-context"

export const metadata: Metadata = {
  title: "Fillout take home",
  description: "Fillout take home assignment",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <NavigationProvider>
          <div className="flex flex-col min-h-screen">
            <header className="h-16 px-6 flex items-center bg-gray-100 border-b-[0.5px] border-gray-300">
              <LucideHome className="text-gray-500" />
            </header>
            <div className="flex flex-1">
              <aside className="w-80 p-6 flex flex-col bg-gray-100 border-x-[0.5px] border-gray-300">
                <div>Sidebar</div>
                <div className="flex-1" />
              </aside>
              <div className="flex flex-col flex-1">
                <main className="flex flex-col flex-1 p-6 pb-3">
                  <div className="bg-gray-900 text-white p-6 flex-1 rounded-xl">
                    {children}
                  </div>
                </main>
                <div className="flex h-16 px-8">
                  <BottomNavigation />
                </div>
              </div>
            </div>
          </div>
        </NavigationProvider>
      </body>
    </html>
  )
}
