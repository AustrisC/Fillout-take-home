"use client"

import { useNavigation } from "./navigation-context"
export default function Home() {
  const { items, activeId } = useNavigation()
  const activeItem = items.find((i) => i.id === activeId)
  return <div>{activeItem ? activeItem.title : "No item selected"}</div>
}
