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
} from '../icons'

import { cn } from '@/lib/utils'

import { GameModel } from '@/states'

interface IAppleData {
  number: number
  value: number
}

interface IAppleTable {
  chunkedApplesArr: any[]
  appleData: IAppleData[]
  inGame: boolean
  mines: boolean[][]
  setAppleData: any
  setAppleItem: any
}

const AppleTable: FC<IAppleTable> = props => {
  const {
    chunkedApplesArr,
    appleData,
    inGame,
    mines,
    setAppleData,
    setAppleItem
  } = props

  const [playSounds, appleGameResult, isPlaying] = useUnit([
    GameModel.$playSounds,
    GameModel.$gameResult,
    GameModel.$isPlaying
  ])

  const [playApple] = useSound('/music/apple_click.mp3', { volume: 1 })

  return (
    <div className='flex overflow-hidden flex-col gap-[10px] sm:gap-3 pt-[18px] sm:pt-5 -mt-3 sm:-mt-4'>
      {chunkedApplesArr &&
        chunkedApplesArr.map((item: any, ind: any) => {
          const currentIndex = Math.abs(ind - 8)
          return (
            <div
              className='gap-[2.8px] sm:gap-1 grid grid-cols-3 relative px-1'
              key={ind}
            >
              {ind === chunkedApplesArr.length - 1 && (
                <>
                  <span
                    className={
                      '-left-[11px] z-[20] rotate-[-90deg] bg-[linear-gradient(90deg,rgba(5,36,48,1)0%,rgba(255,255,255,0)100%,rgba(245,245,245,0)100%)] w-5 h-[10px] blur-0 absolute'
                    }
                  ></span>
                  <span
                    className={
                      '-right-[11px] z-[20] rotate-[-90deg] bg-[linear-gradient(90deg,rgba(5,36,48,1)0%,rgba(255,255,255,0)100%,rgba(245,245,245,0)100%)] w-5 h-[10px] blur-0 absolute'
                    }
                  ></span>
                  <span
                    className={
                      '-left-[11px] z-[20] rotate-[-90deg] bg-[linear-gradient(90deg,rgba(5,36,48,1)0%,rgba(255,255,255,0)100%,rgba(245,245,245,0)100%)] w-5 h-[10px] blur-0 absolute'
                    }
                  ></span>
                  <span
                    className={
                      '-right-[11px] z-[20] rotate-[-90deg] bg-[linear-gradient(90deg,rgba(5,36,48,1)0%,rgba(255,255,255,0)100%,rgba(245,245,245,0)100%)] w-5 h-[10px] blur-0 absolute'
                    }
                  ></span>
                </>
              )}
              {((inGame || appleGameResult?.length > 0
                ? currentIndex === appleData.length - 1
                : currentIndex === appleData.length) ||
                (9 === appleData.length && ind === 0)) && (
                <CfBgActiveSVG className='absolute -top-[11px] sm:-top-[18px] left-[49.9%] -translate-x-[49.8%] w-[99%] sm:w-full' />
              )}

              <div className='w-[25%] sm:w-full h-[14px] sm:h-5 bottom-5 sm:bottom-[30.5px] left-1/2 max-w-[110px] absolute flex justify-center items-center px-[2px] -translate-x-1/2'>
                {(currentIndex >= appleData.length || currentIndex === 8) && (
                  <span className='mb-[11px] text-[8.5px] mr-[2px] sm:mb-3 sm:mr-1 font-semibold sm:text-xs text-[#979797] z-[5]'>
                    {item.cf.toFixed(2)}
                  </span>
                )}
                {(inGame || appleGameResult?.length > 0
                  ? currentIndex > appleData.length - 1
                  : currentIndex > appleData.length) && (
                  <CfBgSVG className='w-full sm:h-auto h-full absolute top-[-5px]  left-0' />
                )}
              </div>
              {item.apples.map((_: any, ind2: any) => {
                const picked = appleData[currentIndex]?.value === ind2
                const resultExist =
                  mines &&
                  mines[currentIndex] &&
                  mines[currentIndex][ind2] === false
                const falseResult =
                  mines && mines[currentIndex] && mines[currentIndex][ind2]
                // falseResult && alert(falseResult);
                // appleGameResult[currentIndex] ===
                // appleData[currentIndex]?.value;
                return (
                  <div
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
                    onClick={e => {
                      if (isPlaying) {
                        if (currentIndex < appleData.length) {
                          // alert(1);
                          return
                        }
                        currentIndex <= appleData.length &&
                          playSounds !== 'off' &&
                          isPlaying &&
                          appleGameResult?.length === 0 &&
                          playApple()
                        const indexToUpdate = currentIndex
                        if (
                          currentIndex <= appleData.length &&
                          appleGameResult?.length === 0 &&
                          isPlaying
                        ) {
                          if (appleData[indexToUpdate] !== undefined) {
                            setAppleData((prev: IAppleData[]) => {
                              const updatedArray = [...prev]
                              updatedArray[indexToUpdate] = {
                                number: indexToUpdate,
                                value: ind2
                              }
                              return updatedArray
                            })
                          } else {
                            setAppleData((prev: IAppleData[]) => [
                              ...prev,
                              { number: indexToUpdate, value: ind2 }
                            ])
                          }
                          setAppleItem(prev => [...prev, ind2])
                        }
                      }
                    }}
                    className={cn(
                      'rounded-[5px] bg-[#2a394b] relative h-7 sm:h-10 px-[10px] overflow-hidden duration-500',
                      currentIndex <= appleData.length &&
                        appleGameResult?.length === 0 &&
                        isPlaying &&
                        'cursor-pointer rounded-[5px] hover:bg-[#293e3e] shadow-[0px_0px_4px_0px_rgba(79,202,136,0.65)inset]',
                      picked &&
                        'bg-[#293e3e] cursor-default shadow-[0px_0px_6px_0px_#4fca88_inset]',
                      falseResult &&
                        'bg-[#b44646] shadow-none hover:shadow-[0px_0px_4px_0px_#b44646]',
                      // picked &&
                      !falseResult &&
                        resultExist &&
                        'bg-[#4e9f31] shadow-none hover:shadow-[0px_0px_4px_0px_#4e9f31]',
                      currentIndex === appleData.length &&
                        isPlaying &&
                        appleGameResult?.length === 0 &&
                        'cursor-pointer bg-[#293e3e] shadow-[0px_0px_4px_0px_rgba(79,202,136,0.65)inset]',
                      isPlaying &&
                        currentIndex < appleData.length &&
                        'cursor-auto'
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
  )
}

export default AppleTable
