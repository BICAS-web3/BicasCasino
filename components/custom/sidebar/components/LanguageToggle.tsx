'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type LanguageProps = {
  disabled: boolean
}
export function LanguageToggle({ disabled = true }: LanguageProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='p-0 border border-[#202020] text-[#7E7E7E] rounded-xl font-bold'
          size='icon'
          disabled={disabled}
        >
          EN
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>English</DropdownMenuItem>
        <DropdownMenuItem>Ukranian</DropdownMenuItem>
        <DropdownMenuItem>Russian</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
