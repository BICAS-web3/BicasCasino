import { FC } from 'react'
import InfoIco from '@/public/images/misc/infoIco.svg'
import { Button } from '@/components/ui/button'

interface GamePlayBlockProps {}

export const GamePlayBlock: FC<GamePlayBlockProps> = () => {
  return (
    <div className='flex gap-[20px] items-center justify-end'>
      <div className='cursor-pointer'>
        <InfoIco className='w-[24px] h-[24px]' />
      </div>
      <Button variant='wagerPlay'>Play</Button>
    </div>
  )
}
