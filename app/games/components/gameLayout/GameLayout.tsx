import { GameMenu } from '../gameMenu/GameMenu'

export function GameLayout({ children }) {
  return (
    <div className='w-full h-full p-[20px] sm:p-[20px_40px_40px_40px] flex flex-col min-h-[880px] '>
      <div className=' h-full '>{children}</div>
      <GameMenu />
    </div>
  )
}
