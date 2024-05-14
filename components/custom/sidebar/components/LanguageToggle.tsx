'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import i18n from '@/i18n'
import { useTranslation } from 'react-i18next'

type LanguageProps = {
  disabled: boolean
}
export function LanguageToggle({ disabled = true }: LanguageProps) {
  const lngs = {
    eng: { nativeName: 'English' },
    uk: { nativeName: 'Ukraine' },
    ru: { nativeName: 'Russian' },
    br: { nativeName: 'Brasil' }
  }

  const { t } = useTranslation(['translation', 'common'])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='p-0 border border-[#202020] text-[#7E7E7E] rounded-xl font-bold'
          size='icon'
          disabled={disabled}
        >
          {/* {i18n.resolvedLanguage === lng && EN} */}EN
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {Object.keys(lngs).map((lng, index) => (
          <DropdownMenuItem
            className='cursor-pointera'
            onClick={() => i18n.changeLanguage(lng)}
          >
            {(lngs as any)[lng].nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
