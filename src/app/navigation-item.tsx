import { useSortable } from "@dnd-kit/sortable"
import { EllipsisVertical, FileText } from "lucide-react"
import React from "react"

import DropdownMenu from "@/app/dropdown-menu"
import { Button } from "@/components/ui/button"

interface NavigationItemProps {
  id: number
  title: string
  isActive: boolean
  onClick: () => void
  onDelete?: () => void
}

export default function NavigationItem({
  id,
  title,
  isActive,
  onClick,
  onDelete,
}: NavigationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  // Makes width and height static for elements - otherwise scaleX (width) was resizing when swapping positions
  const transformStatic = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(1) scaleY(1)`
    : undefined

  const style: React.CSSProperties = {
    transform: transformStatic,
    transition,
  }

  // Positions draggable item on top of others
  if (isDragging) {
    style.position = "relative"
    style.zIndex = 999
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
          <DropdownMenu onDelete={onDelete} />
        ) : (
          <EllipsisVertical color="transparent" />
        )}
      </Button>
    </div>
  )
}
