import { PlusCircle } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { type NavigationItem } from "@/lib/types"

type PlusButtonProps = {
  setItems: React.Dispatch<React.SetStateAction<NavigationItem[]>>
  currentIndex: number
}

export default function PlusButton({
  setItems,
  currentIndex,
}: PlusButtonProps) {
  const clickAddButton = () => {
    setItems((items) => {
      // IDs as increasing integers
      const maxId =
        items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0
      const newItem = { id: maxId + 1, title: "New Page" }

      // Inserts new item where + button was clicked
      return items
        .slice(0, currentIndex + 1)
        .concat(newItem, items.slice(currentIndex + 1))
    })
  }

  return (
    <div className="flex items-center group relative">
      <div className="w-8"></div>
      <Button
        variant="ghost"
        size="icon"
        className={`
        opacity-0 scale-75
        group-hover:opacity-100 group-hover:scale-100
        transition-all duration-200
        absolute left-1/2 -translate-x-1/2 bg-white shadow`}
        onClick={clickAddButton}
      >
        <PlusCircle color="grey" />
      </Button>
    </div>
  )
}
