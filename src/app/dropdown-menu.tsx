import {
  ClipboardIcon,
  EllipsisVertical,
  Flag,
  Layers2Icon,
  PenLineIcon,
  Trash2Icon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DropdownMenuComponentProps = {
  onDelete?: () => void
  onOpenChange?: (open: boolean) => void
}

export default function DropdownMenuComponent({
  onDelete,
  onOpenChange,
}: DropdownMenuComponentProps) {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <a>
          <EllipsisVertical color="grey" />
        </a>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Flag color="blue" />
            Set as first page
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PenLineIcon />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClipboardIcon />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onDelete}>
            <Trash2Icon color="red" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
