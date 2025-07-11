import { useSortable } from "@dnd-kit/sortable"
import { FileText } from "lucide-react"
import React from "react"

import DropdownMenu from "@/app/dropdown-menu"
import { Button } from "@/components/ui/button"
import { type NavigationItem } from "@/lib/types"

interface NavigationItemProps extends NavigationItem {
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
  const [menuOpen, setMenuOpen] = React.useState(false)

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
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="group"
    >
      <Button
        variant="fillout"
        onClick={onClick}
        className={conditionalButtonClassName}
      >
        <FileText color={isActive ? "orange" : "grey"} />
        <div className={isActive ? "text-black" : "text-gray-500"}>{title}</div>
        <span
          className={`opacity-${isActive || menuOpen ? "100" : "0"} group-hover:opacity-100 transition-opacity duration-200`}
        >
          <DropdownMenu onDelete={onDelete} onOpenChange={setMenuOpen} />
        </span>
      </Button>
    </div>
  )
}
