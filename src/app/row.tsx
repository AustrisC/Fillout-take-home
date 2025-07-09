"use client"

import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable"
import dynamic from "next/dynamic"
import React, { useState } from "react"

// Imports this way to avoid a hydration mismatch
const Item = dynamic(() => import("./item"), { ssr: false })

type ItemType = { id: number; title: string }

export const Row = ({ items }: { items: ItemType[] }) => {
  // Sets lowest id as 1, needs to be picked dynamically
  const [activeId, setActiveId] = useState<number | null>(1)

  return (
    <div className="flex">
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {items.map((item) => (
          <div className="p-2" key={item.id}>
            <Item
              id={item.id}
              title={item.title}
              isActive={activeId === item.id}
              onClick={() => setActiveId(item.id)}
            />
          </div>
        ))}
      </SortableContext>
    </div>
  )
}
