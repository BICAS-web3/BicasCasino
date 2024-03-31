import { useCallback, useEffect, useRef, useState } from 'react'

interface useDropdownReturn {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>
}

export function useDropdown(): useDropdownReturn {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, dropdownRef, setIsOpen])

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, toggle, open, close, dropdownRef }
}
