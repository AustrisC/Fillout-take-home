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
import { Plus } from "lucide-react"
import dynamic from "next/dynamic"

import DottedLine from "@/app/dotted-line"
import { Button } from "@/components/ui/button"

import { useNavigation } from "./navigation-context"
// Imports this way to avoid a hydration mismatch
const NavigationItem = dynamic(() => import("@/app/navigation-item"), {
  ssr: false,
})

export default function BottomNavigation() {
  const { items, activeId, setActiveId, setItems } = useNavigation()
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

  function AddPage() {
    const maxId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0
    const addClick = () => {
      setItems((items) => [...items, { id: maxId + 1, title: "New Item" }])
    }

    return (
      <>
        <DottedLine setItems={setItems} currentIndex={maxId} />
        <Button
          variant="fillout"
          onClick={addClick}
          className="bg-white border-1 hover:bg-white"
        >
          <Plus color="black" />
          <div className="text-black">Add page</div>
        </Button>
      </>
    )
  }

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
        <AddPage />
      </div>
    </DndContext>
  )
}
