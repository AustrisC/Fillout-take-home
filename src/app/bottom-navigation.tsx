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
import { useEffect, useRef, useState } from "react"

import NavigationItem from "@/app/navigation-item"
import PlusButton from "@/app/plus-button"
import { Button } from "@/components/ui/button"

import { useNavigation } from "./navigation-context"

export default function BottomNavigation() {
  const { items, activeId, setActiveId, setItems } = useNavigation()
  const [distance, setDistance] = useState<number | null>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const addRef = useRef<HTMLDivElement>(null)
  const defaultDistance = 660

  // Calculation used for a dynamic dotted line calculation
  useEffect(() => {
    if (infoRef.current && addRef.current) {
      const infoRect = infoRef.current.getBoundingClientRect()
      const addRect = addRef.current.getBoundingClientRect()
      setDistance(addRect.right - infoRect.left)
    }
  }, [items])

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
      <div className="flex items-center relative">
        <svg width={distance || defaultDistance} height={50} className="-z-10">
          <line
            x1={0}
            x2={distance || defaultDistance}
            y1={25}
            y2={25}
            stroke="lightgrey"
            strokeWidth={1}
            strokeDasharray="3,3"
          />
        </svg>
        <div className="flex absolute">
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((item, idx) => (
              <div
                className="flex items-center"
                key={item.id}
                ref={idx === 0 ? infoRef : null}
              >
                <NavigationItem
                  id={item.id}
                  title={item.title}
                  isActive={activeId === item.id}
                  onClick={() => setActiveId(item.id)}
                  onDelete={() =>
                    setItems((items) => items.filter((i) => i.id !== item.id))
                  }
                />
                <PlusButton setItems={setItems} currentIndex={idx} />
              </div>
            ))}
          </SortableContext>
          <div ref={addRef}>
            <AddPage />
          </div>
        </div>
      </div>
    </DndContext>
  )
}
