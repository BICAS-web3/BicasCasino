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
    br: { nativeName: 'Brasil' },
    sp: { nativeName: 'Spain' }
  }

  const { t } = useTranslation(['translation', 'common'])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='z-[150]' asChild>
        <Button
          variant='ghost'
          className='p-0 border border-[#202020] text-[#7E7E7E] rounded-xl font-bold'
          size='icon'
          disabled={disabled}
        >
          {i18n.resolvedLanguage === 'eng' && 'EN'}
          {i18n.resolvedLanguage === 'br' && 'BR'}
          {i18n.resolvedLanguage === 'ru' && 'RU'}
          {i18n.resolvedLanguage === 'uk' && 'UK'}
          {i18n.resolvedLanguage === 'sp' && 'ES'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' z-[111]' align='end'>
        {Object.keys(lngs).map((lng, index) => (
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => i18n.changeLanguage(lng)}
          >
            {(lngs as any)[lng].nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
