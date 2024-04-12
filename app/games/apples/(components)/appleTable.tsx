import { useUnit } from 'effector-react'
import useSound from 'use-sound'
import { FC } from 'react'

import {
  AppleBgFalseSVG,
  AppleBgSVG,
  AppleBgTrueSVG,
  AppleFalseIcoSVG,
  AppleIcoSVG,
  CfBgActiveSVG,
  CfBgSVG
} from '../(icons)'

import { cn } from '@/lib/utils'

import { GameModel } from '@/states'

interface IAppleData {
  number: number
  value: number
}

interface appleItemData {
  apples: any[]
  cf: number
}

interface IAppleTable {
  chunkedApplesArr: appleItemData[]
  appleData: IAppleData[]
  inGame: boolean
  mines: boolean[][]
  setAppleData: any
  setAppleItem: any
}

const AppleTable: FC<IAppleTable> = ({
  chunkedApplesArr,
  appleData,
  inGame,
  mines,
  setAppleData,
  setAppleItem
}) => {
  const [playSounds, appleGameResult, isPlaying] = useUnit([
    GameModel.$playSounds,
    GameModel.$gameResult,
    GameModel.$isPlaying
  ])

  const [playApple] = useSound('/music/apple_click.mp3', { volume: 1 })

  const handleMine = (id, index) => {
    if (isPlaying) {
      if (index < appleData.length) return
      index <= appleData.length &&
        playSounds !== 'off' &&
        isPlaying &&
        appleGameResult?.length === 0 &&
        playApple()
      const indexToUpdate = index
      if (
        index <= appleData.length &&
        appleGameResult?.length === 0 &&
        isPlaying
      ) {
        if (appleData[indexToUpdate] !== undefined) {
          setAppleData((prev: IAppleData[]) => {
            const updatedArray = [...prev]
            updatedArray[indexToUpdate] = {
              number: indexToUpdate,
              value: id
            }
            return updatedArray
          })
        } else {
          setAppleData((prev: IAppleData[]) => [
            ...prev,
            { number: indexToUpdate, value: id }
          ])
        }
        setAppleItem(prev => [...prev, id])
      }
    }
  }

  return (
    <div
      className='max-w-xs mt-0 mb-10 px-4 py-5 sm:px-6 sm:pt-8 sm:pb-5 lg:mt-[30px] bg-[#03212d] border border-[#105453] rounded-xl sm:max-w-md w-full relative'
      style={{
        boxShadow: '0px 0px 16px rgba(25, 102, 101, 0.89)'
      }}
    >
      <div className='flex overflow-hidden flex-col gap-2.5 sm:gap-3 pt-[18px] sm:pt-5 -mt-3 sm:-mt-4'>
        {chunkedApplesArr.map((item: appleItemData, index: number) => {
          const currentIndex = Math.abs(index - 8)
          return (
            <div
              className='gap-[3px] sm:gap-1 grid grid-cols-3 relative px-1'
              key={`game-apples-table--${item.cf}-${index}`}
            >
              {index === chunkedApplesArr.length - 1 && (
                <>
                  {[...Array(4)].map((_, chunkedIndex) => (
                    <span
                      key={chunkedIndex}
                      className='-left-[11px] z-20 -rotate-90 bg-[linear-gradient(90deg,rgba(5,36,48,1)0%,rgba(255,255,255,0)100%,rgba(245,245,245,0)100%)] w-5 h-2.5 blur-0 absolute'
                      style={{}}
                    />
                  ))}
                </>
              )}
              {((inGame || appleGameResult?.length > 0
                ? currentIndex === appleData.length - 1
                : currentIndex === appleData.length) ||
                (9 === appleData.length && index === 0)) && (
                <CfBgActiveSVG className='absolute -top-1.5 sm:-top-4 left-1/2 -translate-x-1/2 w-full' />
              )}

              <div className='w-[25%] sm:w-full h-3.5 sm:h-5 bottom-5 sm:bottom-[30.5px] left-1/2 max-w-[110px] absolute flex justify-center items-center px-[2px] -translate-x-1/2'>
                {(currentIndex >= appleData.length || currentIndex === 8) && (
                  <span className='mb-2.5 text-[8.5px] mr-.5 sm:mb-3 sm:mr-1 font-semibold sm:text-xs text-[#979797] z-[5]'>
                    {item.cf.toFixed(2)}
                  </span>
                )}
                {(inGame || appleGameResult?.length > 0
                  ? currentIndex > appleData.length - 1
                  : currentIndex > appleData.length) && (
                  <CfBgSVG className='w-full sm:h-auto h-full absolute top-[-5px] left-0' />
                )}
              </div>
              {item.apples.map((_: any, id: any) => {
                const picked = appleData[currentIndex]?.value === id
                const resultExist =
                  mines &&
                  mines[currentIndex] &&
                  mines[currentIndex][id] === false
                const falseResult =
                  mines && mines[currentIndex] && mines[currentIndex][id]
                return (
                  <div
                    key={`game-apple-table--mines-${id}`}
                    onContextMenu={e => {
                      e.preventDefault()

                      if (e.button === 2) {
                        if (
                          appleData.length !== 0 &&
                          appleData[appleData.length - 1].number ===
                            currentIndex
                        ) {
                          const poppedArr = appleData.slice(0, currentIndex)
                          setAppleData(poppedArr)
                        }
                      }
                    }}
                    onClick={() => handleMine(id, currentIndex)}
                    className={cn(
                      'rounded-[5px] bg-[#2a394b] relative h-7 sm:h-10 px-2.5 overflow-hidden duration-500'
                      // currentIndex <= appleData.length &&
                      //   appleGameResult?.length === 0 &&
                      //   isPlaying &&
                      //   'cursor-pointer rounded-[5px] hover:bg-[#293e3e] shadow-[0px_0px_4px_0px_rgba(79,202,136,0.65)inset]',
                      // picked &&
                      //   'bg-[#293e3e] cursor-default shadow-[0px_0px_6px_0px_#4fca88_inset]',
                      // falseResult &&
                      //   'bg-[#b44646] shadow-none hover:shadow-[0px_0px_4px_0px_#b44646]',
                      // !falseResult &&
                      //   resultExist &&
                      //   'bg-[#4e9f31] shadow-none hover:shadow-[0px_0px_4px_0px_#4e9f31]',
                      // currentIndex === appleData.length &&
                      //   isPlaying &&
                      //   appleGameResult?.length === 0 &&
                      //   'cursor-pointer bg-[#293e3e] shadow-[0px_0px_4px_0px_rgba(79,202,136,0.65)inset]',
                      // isPlaying &&
                      //   currentIndex < appleData.length &&
                      //   'cursor-auto'
                    )}
                  >
                    {resultExist && picked ? (
                      falseResult ? (
                        <AppleBgFalseSVG className='absolute w-full h-full object-cover left-0' />
                      ) : (
                        <AppleBgTrueSVG className='absolute w-full h-full object-cover left-0' />
                      )
                    ) : (
                      <AppleBgSVG className='absolute w-full h-full object-cover left-0' />
                    )}
                    <div className='w-full flex h-full justify-center items-center'>
                      <div className='w-[22px] h-[22px] sm:w-auto sm:h-auto'>
                        {resultExist && picked ? (
                          falseResult ? (
                            <AppleFalseIcoSVG
                              className={`duration-500 w-full h-full ${
                                picked &&
                                (resultExist && falseResult
                                  ? 'text-[#b44646]'
                                  : 'text-[#49b446]')
                              }`}
                            />
                          ) : (
                            <AppleIcoSVG
                              className={`duration-500 w-full h-full ${
                                picked &&
                                (resultExist && falseResult
                                  ? 'text-[#b44646]'
                                  : 'text-[#49b446]')
                              }`}
                            />
                          )
                        ) : (
                          <AppleIcoSVG
                            className={`duration-500 w-full h-full ${
                              picked &&
                              (resultExist && falseResult
                                ? 'text-[#b44646]'
                                : 'text-[#49b446]')
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AppleTable
