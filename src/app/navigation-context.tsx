"use client"

import React, { createContext, useContext, useState } from "react"

import { type NavigationItem } from "@/lib/types"

const defaultItems: NavigationItem[] = [
  { id: 0, title: "Info" },
  { id: 1, title: "Details" },
  { id: 2, title: "Other" },
  { id: 3, title: "Ending" },
]

const NavigationContext = createContext<{
  items: NavigationItem[]
  activeId: number | null
  setActiveId: (id: number) => void
  setItems: React.Dispatch<React.SetStateAction<NavigationItem[]>>
} | null>(null)

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeId, setActiveId] = useState<number | null>(0)
  const [items, setItems] = useState(defaultItems)
  return (
    <NavigationContext.Provider
      value={{ items, activeId, setActiveId, setItems }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const ctx = useContext(NavigationContext)
  if (!ctx)
    throw new Error("useNavigation must be used within NavigationProvider")
  return ctx
}
