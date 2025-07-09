import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { EllipsisVertical, FileText } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"

interface ItemProps {
  id: number
  title: string
  isActive: boolean
  onClick: () => void
}

export default function Item({ id, title, isActive, onClick }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const conditionalButtonClassName = isActive
    ? "bg-white border-1 hover:bg-white"
    : "border border-transparent"

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Button
        variant="fillout"
        onClick={onClick}
        className={conditionalButtonClassName}
      >
        <FileText color={isActive ? "orange" : "grey"} />
        <div className={isActive ? "text-black" : "text-gray-500"}>{title}</div>
        {isActive ? (
          <a onClick={() => console.log("three dots click")}>
            <EllipsisVertical color="grey" />
          </a>
        ) : (
          <EllipsisVertical color="transparent" />
        )}
      </Button>
    </div>
  )
}
