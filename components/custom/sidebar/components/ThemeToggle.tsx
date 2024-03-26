'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ToggleProps = {
  disabled: boolean
  open: boolean
}

const data = [
  {
    id: 'dark',
    icon: <Moon className='h-4 w-4 aspect-square object-contain' />
  },
  {
    id: 'light',
    icon: <Sun className='h-4 w-4 aspect-square object-contain' />
  }
]

export function ThemeToggle({ open }: ToggleProps) {
  const { setTheme, theme } = useTheme()

  return (
    <div
      className={cn(
        'flex flex-nowrap border border-[#202020] rounded-xl',
        open ? '' : 'flex-col w-max'
      )}
    >
      {open ? (
        data.map((item, index) => (
          <Button
            variant='ghost'
            size='icon'
            key={`button-${item.id}-${index}`}
            onClick={() => setTheme(item.id)}
            className={cn(
              'rounded-xl',
              theme === item.id
                ? 'bg-[#202020] text-[#7E7E7E]'
                : 'bg-transparent text-[#363636]'
            )}
          >
            {item.icon}
          </Button>
        ))
      ) : (
        <Button
          variant='ghost'
          size='icon'
          key={`button-${data[0].id}`}
          onClick={() => setTheme(theme === 'dark' ? data[1].id : data[0].id)}
          className={cn(
            'rounded-xl',
            theme === data[0].id
              ? 'border border-[#202020] text-[#7E7E7E]'
              : 'bg-transparent text-[#363636]'
          )}
        >
          {theme === 'dark' ? data[0].icon : data[1].icon}
        </Button>
      )}
    </div>
  )
}
