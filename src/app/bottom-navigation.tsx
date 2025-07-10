"use client"

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable"
import dynamic from "next/dynamic"
import { useState } from "react"

import DottedLine from "@/app/dotted-line"
import { BottomNavigationItem } from "@/lib/types"
// Imports this way to avoid a hydration mismatch
const NavigationItem = dynamic(() => import("@/app/navigation-item"), {
  ssr: false,
})

export default function BottomNavigation() {
  // TODO: change this - sets the first page as active one by default
  const [activeId, setActiveId] = useState<number | null>(1)
  const [items, setItems] = useState<BottomNavigationItem[]>([
    { id: 1, title: "Details" },
    { id: 2, title: "Other" },
    { id: 3, title: "Ending" },
  ])

  const getTaskPosition = (id: number) =>
    items.findIndex((item) => item.id === id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) {
      return
    }

    setItems((items) => {
      const originalPosition = getTaskPosition(active.id as number)
      const newPostion = getTaskPosition(over?.id as number)
      return arrayMove(items, originalPosition, newPostion)
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
      sensors={sensors}
    >
      <div className="flex items-center">
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.map((item, idx) => (
            <div className="flex items-center" key={item.id}>
              <NavigationItem
                id={item.id}
                title={item.title}
                isActive={activeId === item.id}
                onClick={() => setActiveId(item.id)}
                onDelete={() =>
                  setItems((items) => items.filter((i) => i.id !== item.id))
                }
              />
              {idx < items.length - 1 && (
                <DottedLine setItems={setItems} currentIndex={idx} />
              )}
            </div>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}
