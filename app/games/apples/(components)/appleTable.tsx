import cf from '@/public/images/apples/line.png'
import { useUnit } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import useSound from 'use-sound'
import {
  AppleBgFalseSVG,
  AppleBgSVG,
  AppleBgTrueSVG,
  AppleFalseIcoSVG,
  AppleIcoSVG,
  CfBgSVG
} from '../(icons)'

import AppleBgF from '@/public/icons/appleIco.svg'

import { cn } from '@/lib/utils'

import { GameModel, UserModel, WagerModel } from '@/states'
import { IAppleData, IAppleTable, appleItemData } from '@/types/games.types'
import Image from 'next/image'
import { GameStatus } from '@/states/game_model.store'

const AppleTable: FC<IAppleTable> = ({
  chunkedApplesArr,
  appleData,
  // inGame,
  mines,
  setAppleData,
  setAppleItem,
  setAppleGameResult,
  setApples,
  setMines,
  // setInGame,
  setIsPlaying,
  setKeep,
  setFirstBet,
  handleReset,
  setStop,
  localStatus,
  setLocalStatus
}) => {
  const [
    playSounds,
    appleGameResult,
    isPlaying,
    gameStatus,
    setGameStatus,
    setApplesWagerr,
    cryptoValue,
    showResult,
    setShowResult,
    isDrax
  ] = useUnit([
    GameModel.$playSounds,
    GameModel.$gameResult,
    GameModel.$applesPlay,
    GameModel.$gameStatus,
    GameModel.setGameStatus,
    GameModel.setApplesWagerr,
    WagerModel.$cryptoValue,
    GameModel.$showResult,
    GameModel.setShowResult,
    UserModel.$isDrax
  ])

  useEffect(() => {
    setGameStatus(null)
  }, [])

  const [playApple] = useSound('/music/apple_click.mp3', { volume: 1 })

  const handleMine = (id, index) => {
    if (showResult) return
    setApplesWagerr(cryptoValue * chunkedApplesArr[Math.abs(index - 8)].cf)
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

  useEffect(() => {
    if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) {
      setShowResult(true)
      setLocalStatus(gameStatus)
      setGameStatus(null)
    }
  }, [gameStatus])

  useEffect(() => {
    setLocalStatus(null)
  }, [])

  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        setAppleGameResult([])
        setAppleData([])
        setApples([])
        setMines([])
        // setInGame(false)
        // alert(1)
        setIsPlaying(false)
        setKeep(false)
        setFirstBet(true)
        handleReset()
        setStop(false)
        setAppleItem([])
        setApplesWagerr(0)
        setLocalStatus(null)
        setTimeout(() => setShowResult(false), 500)
      }, 1500)
    }
  }, [showResult])

  return (
    <div className='scale-[1.2] exxs:scale-[1.3] sm:scale-[1] w-[269px] sm:w-[471px] h-[311px] sm:h-[544px] mt-14 mb-10 pt-[27px] sm:pt-12 pl-[29px] sm:pl-[55px] pr-[21px] sm:pr-[42px] pb-5 sm:pb-4 lg:mt-[17px] rounded-xl  relative'>
      <Image
        // px-4 py-5 sm:px-6 sm:pt-8 sm:pb-5
        width={504}
        height={595}
        className='absolute top-0 left-0 w-full h-full'
        src='/images/apples/table.png'
        alt=''
      />
      <div className='flex overflow-hidden flex-col gap-[6.8px] sm:gap-3 pt-[18px] sm:pt-5 -mt-3 sm:-mt-4'>
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
              {((isPlaying || appleGameResult?.length > 0
                ? currentIndex === appleData.length
                : currentIndex === appleData.length) ||
                (9 === appleData.length && index === 0)) && (
                <Image
                  src={cf}
                  className='absolute top-[-10px] sm:-top-[18px] left-1/2 -translate-x-1/2 w-full'
                  alt=''
                />
              )}

              <div className='w-[25%] sm:w-full h-5 bottom-3 sm:bottom-[30.5px] left-1/2 max-w-[110px] absolute flex justify-center items-center px-[2px] -translate-x-1/2'>
                {(currentIndex >= appleData.length || currentIndex === 8) && (
                  <span className='mb-2.5 text-[6px] sm:mb-3 font-semibold sm:text-xs text-[#979797] z-[5] flex gap-1 items-center'>
                    {cryptoValue
                      ? (item.cf * cryptoValue).toFixed(2)
                      : item.cf.toFixed(2)}
                  </span>
                )}
                {(isPlaying || appleGameResult?.length > 0
                  ? currentIndex > appleData.length
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
                      if (showResult) return
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
                      'rounded-[5px] bg-[#151A22] border border-[#363636] relative h-[22px] sm:h-10 px-2.5 overflow-hidden duration-500 group',
                      currentIndex <= appleData.length &&
                        appleGameResult?.length === 0 &&
                        isPlaying &&
                        !showResult &&
                        'cursor-pointer rounded-[5px]  shadow-[0px_0px_4px_0px_rgba(79,202,136,0.65)inset]', // hover:bg-[#293e3e]
                      picked &&
                        'bg-[#293e3e] cursor-default shadow-[0px_0px_6px_0px_#4fca88_inset]',
                      falseResult &&
                        showResult &&
                        currentIndex === appleData.length - 1 &&
                        localStatus === GameStatus.Lost &&
                        'bg-[#b44646] shadow-none hover:shadow-[0px_0px_4px_0px_#b44646]',
                      !falseResult &&
                        resultExist &&
                        picked &&
                        'bg-[#4e9f31] shadow-none hover:shadow-[0px_0px_4px_0px_#4e9f31]',
                      currentIndex === appleData.length &&
                        isPlaying &&
                        appleGameResult?.length === 0 &&
                        !showResult &&
                        'cursor-pointer bg-[#0D2020] shadow-[0px_0px_4px_0px_rgba(79,202,136,0.65)inset] hover:shadow-[0px_0px_6px_0px_#4FCA88_inset] duration-500',
                      isPlaying &&
                        currentIndex < appleData.length &&
                        'cursor-auto'
                    )}
                  >
                    {resultExist && picked ? (
                      falseResult && localStatus === GameStatus.Lost ? (
                        <AppleBgFalseSVG className='absolute w-full h-full object-cover left-0' />
                      ) : (
                        <AppleBgTrueSVG className='absolute w-full h-full object-cover left-0' />
                      )
                    ) : (
                      <AppleBgSVG className='absolute w-full h-full object-cover left-0' />
                    )}
                    <div className='w-full flex h-full justify-center items-center relative'>
                      <div
                        className={`w-[17px] sm:w-8 h-[17px] sm:h-8 border rounded-full flex items-center justify-center duration-500 ${
                          falseResult &&
                          currentIndex + 1 === appleData.length &&
                          showResult &&
                          localStatus === GameStatus.Lost
                            ? 'bg-[#300505] border-[#B44646]'
                            : currentIndex === appleData.length && isPlaying
                            ? 'bg-[#165339] border-[#2A3D34]'
                            : picked
                            ? resultExist && falseResult
                              ? 'bg-[#300505] border-[#B44646]'
                              : 'bg-[#165339] border-[#76B446]'
                            : 'bg-[#212328] border-[#212222]'
                        }`}
                      >
                        {falseResult &&
                        currentIndex + 1 === appleData.length &&
                        showResult &&
                        localStatus === GameStatus.Lost ? (
                          <AppleFalseIcoSVG
                            className={`duration-500 w-[9.76px] sm:w-[17px] h-[11px] sm:h-[19px] text-[#b44646]`}
                          />
                        ) : resultExist && picked ? (
                          <AppleIcoSVG
                            className={`duration-500 w-[9.15px] sm:w-[17px] h-[9.15px] sm:h-[17px] ${
                              picked
                                ? resultExist && falseResult
                                  ? 'text-[#b44646]'
                                  : 'text-[#49b446]'
                                : 'text-[#5E675E]'
                            }`}
                          />
                        ) : (
                          <AppleBgF
                            className={`duration-300 w-[9.15px] h-[9.15px] sm:w-[17px] sm:h-[17px] ${
                              currentIndex === appleData.length && isPlaying
                                ? 'text-[#49B446]'
                                : picked
                                ? falseResult
                                  ? 'text-[#b44646]'
                                  : 'text-[#49b446]'
                                : 'text-[#5E675E]' //////////
                            } ${
                              currentIndex === appleData.length &&
                              isPlaying &&
                              appleGameResult?.length === 0 &&
                              !showResult &&
                              'group-hover:text-[#49b446] group-active:scale-[1.2]'
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
