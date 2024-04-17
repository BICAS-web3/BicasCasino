import GameMenu from './(components)/game.menu'

const GameLayout = ({ children }) => {
  return (
    <div className='w-full h-full p-5 sm:p-10 flex flex-col min-h-[880px]'>
      <div className='h-full relative'>{children}</div>
      <GameMenu />
    </div>
  )
}

export default GameLayout
