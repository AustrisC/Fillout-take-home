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
import { arrayMove } from "@dnd-kit/sortable"
import { useState } from "react"

import { Row } from "./row"

export default function BottomNavigation() {
  const [items, setItems] = useState([
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
    <div>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
        sensors={sensors}
      >
        <Row items={items}></Row>
      </DndContext>
    </div>
  )
}
