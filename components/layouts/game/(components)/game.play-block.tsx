'use client'

import { Button } from '@/components/ui/button'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

import AutoBorder from '@/public/images/misc/autoBorder.svg'
import { SettingSVG } from '../(icons)'
import {
  BonusCoinSVG,
  DraxMiniSVG
} from '@/components/custom/header/components/icons'
import useSound from 'use-sound'
import { useTranslation } from 'react-i18next'
import InfoIcon from '@/public/images/misc/infoIcon.svg'
import * as CarModel from '@/states/car.store'
import { useMediaQuery } from 'usehooks-ts'

const GamePlayBlock = () => {
  const [pokerChange] = useSound('/music/poker_change.mp3')
  const [playSounds] = useUnit([GameModel.$playSounds])
  const [
    carResult,
    error,
    setIsPlaying,
    cryptoValue,
    setError,
    setFinishPoker,
    isPlaying,
    finishPoker,
    balance,
    setStop,
    apples,
    setStopWinning,
    keep,
    setAuto,
    autoVisibile,
    setWheelVisible,
    wheelVisible,
    appleWager,
    showResult,
    startAnimation,
    isDrax,
    rocketStar,
    betsAmount,
    setFinishGame,
    redrawCards,
    setRedrawCards,
    setBackCards,
    showAnimation,
    pokerPlay,
    setPokerPlay,
    applesPlay,
    setapplesPlay,
    backCards,
    waitingResponse,
    minesSelected,
    minesDelay,
    setMinesDelay,
    setMinesVisible,
    minesVisible,
    showNotification,
    plinkoVisible,
    setPlinkoVisible,
    access_token,
    setCoefficientData,
    setWonStatus,
    pickSide,
    setResult,
    setDemoCards,
    pickedTiles,
    setCarReset,
    carVisible,
    setCarVisible
  ] = useUnit([
    CarModel.$gameResult,
    WagerModel.$error,
    GameModel.setIsPlaying,
    WagerModel.$cryptoValue,
    WagerModel.setError,
    GameModel.setFinishPoker,
    GameModel.$isPlaying,
    GameModel.$finishPoker,
    UserModel.$balance,
    GameModel.setStop,
    GameModel.$apples,
    GameModel.setStopWinning,
    GameModel.$keep,
    GameModel.setAutoVisible,
    GameModel.$autoVisible,
    GameModel.setWheelVisible,
    GameModel.$wheelVisible,
    GameModel.$appleWager,
    GameModel.$showResult,
    GameModel.$startAnimation,
    UserModel.$isDrax,
    GameModel.$rocketStar,
    WagerModel.$pickedValue,
    GameModel.setFinishGame,
    GameModel.$redrawCards,
    GameModel.setRedrawCards,
    GameModel.setBackCards,
    GameModel.$showAnimation,
    GameModel.$pokerPlay,
    GameModel.setPokerPlay,
    GameModel.$applesPlay,
    GameModel.setapplesPlay,
    GameModel.$backCards,
    GameModel.$waitingResponse,
    GameModel.$minesSelected,
    GameModel.$minesDelay,
    GameModel.setMinesDelay,
    GameModel.setMinesVisible,
    GameModel.$minesVisible,
    UserModel.$showNotification,
    GameModel.$plinkoVisible,
    GameModel.setPlinkoVisible,
    RegistrModel.$access_token,
    GameModel.setCoefficientData,
    GameModel.setWonStatus,
    GameModel.pickSide,
    GameModel.setResult,
    GameModel.setDemoCards,
    GameModel.$pickedTiles,
    CarModel.setReset,
    GameModel.$carVisible,
    GameModel.setCarVisible
  ])

  const path = usePathname()
  const isMobile = useMediaQuery('(max-width: 1280px)')
  const [isCoinflip, setIsCoinflip] = useState(false)
  const [isRocket, setIsRocket] = useState(false)
  const [isApple, setIsApple] = useState(false)
  const [isMines, setIsMines] = useState(false)
  const [isRPS, setIsRPS] = useState(false)
  const [coinflipGame, setCoinflipGame] = useState(false)
  const [isPoker, setIsPoker] = useState(false)
  const [isThimbles, setIsThimbles] = useState(false)
  const [isPlinko, setIsPlinko] = useState(false)
  const [isCar, setIsCar] = useState(false)

  const [rocketDelay, setRocketDelay] = useState(0)
  const [rocketInGame, setRocketInGame] = useState(false)
  const [pokerDelay, setPokerDelay] = useState(false)

  useEffect(() => {
    if (isMines && isPlaying) {
      setMinesDelay(true)
    }
  }, [isPlaying])

  useEffect(() => {
    if (minesDelay) {
      setTimeout(() => setMinesDelay(false), 2500)
    }
  }, [minesDelay])

  useEffect(() => {
    if (pokerDelay) {
      setTimeout(() => setPokerDelay(false), 1000)
    }
  }, [pokerDelay])

  useEffect(() => {
    if (isPlaying && betsAmount && !rocketInGame) {
      setRocketDelay(betsAmount * 700)
    }
  }, [betsAmount, isPlaying])

  useEffect(() => {
    if (rocketDelay) {
      setRocketInGame(true)
      setTimeout(() => {
        setRocketInGame(false)
        setRocketDelay(0)
      }, rocketDelay)
    }
  }, [rocketDelay])

  useEffect(() => {
    if (path.includes('apples')) {
      setIsApple(true)
    } else {
      setIsApple(false)
    }

    if (path.includes('mines')) {
      setIsMines(true)
    } else {
      setIsMines(false)
    }

    if (path.includes('coinflip')) {
      setIsCoinflip(true)
    } else {
      setIsCoinflip(false)
    }
    if (path.includes('rock_paper_scissors')) {
      setIsRPS(true)
    } else {
      setIsRPS(false)
    }
    if (path.includes('rocket')) {
      setIsRocket(true)
    } else {
      setIsRocket(false)
    }
    if (path.includes('poker')) {
      setIsPoker(true)
    } else {
      setIsPoker(false)
    }
    if (path.includes('thimbles_3')) {
      setIsThimbles(true)
    } else {
      setIsThimbles(false)
    }
    if (path.includes('plinko')) {
      setIsPlinko(true)
    } else {
      setIsPlinko(false)
    }
    if (path.includes('cars')) {
      setIsCar(true)
    } else {
      setIsCar(false)
    }
  }, [path])

  useEffect(() => {
    if (isCoinflip) {
      if (isPlaying) {
        setCoinflipGame(true)
      } else {
        setTimeout(() => setCoinflipGame(false), 2100)
      }
    }
  }, [isPlaying, isCoinflip])

  useEffect(() => {
    if (redrawCards && isPoker) {
      setTimeout(() => {
        setRedrawCards(false)
        setBackCards(true)
        setPokerDelay(true)
      }, 2000)
    }
  }, [redrawCards, pokerPlay])

  useEffect(() => {
    if (backCards && playSounds !== 'off') {
      pokerChange()
    }
  }, [backCards])

  const [coinflipWin] = useSound('/music/coinflip_win.mp3')
  const handlePlay = () => {
    if (!access_token) {
      if (!access_token && isThimbles) setIsPlaying(true)
      if (isCoinflip || isRPS || isMines || isRocket) {
        setIsPlaying(true)
        const win = Math.random() < 0.6
        function getRandomNumber() {
          return Math.floor(Math.random() * 3)
        }
        setTimeout(
          () => {
            setResult({
              amount: '1',
              profit: win ? '2' : '0',
              num_games: betsAmount,
              bet_info: '{ car: 2 }',
              coin_id: 1,
              game_id: 1,
              id: 1,
              outcomes: isThimbles ? '[0]' : `{"action":${getRandomNumber()}}`,
              payouts: `[${getRandomNumber()}]`,
              profits: win ? '[2]' : '[0]',
              serverseed_id: 1,
              timestamp: 1,
              type: 'Bet',
              user_id: 3,
              userseed_id: 3,
              uuid: '',
              state: `{"state":[${pickedTiles}],"mines":[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],"game_num":1,"current_multiplier":"1.0312"}`
            })
          },
          isRPS ? 1500 : 1
        )
      }
      if (isPoker && !pokerPlay) {
        playSounds !== 'off' && pokerChange()
        setPokerPlay(true)
        if (!access_token) {
          function generateRandomCards(numCards) {
            const cards: { number: number; suit: number }[] = []

            for (let i = 0; i < numCards; i++) {
              const number = Math.floor(Math.random() * 13) + 1
              const suit = Math.floor(Math.random() * 4)

              const card = {
                number: number > 13 ? 13 : number,
                suit: suit > 3 ? 3 : suit
              }
              cards.push(card)
            }

            return JSON.stringify({ cards_in_hand: cards })
          }
          const cards = generateRandomCards(5)
          setDemoCards(cards)
          setResult({
            amount: '1',
            profit: '',
            num_games: betsAmount,
            bet_info: '{ car: 2 }',
            coin_id: 1,
            game_id: 1,
            id: 1,
            outcomes: isThimbles ? '[0]' : '{"action":1}',
            payouts: '',
            profits: '',
            serverseed_id: 1,
            timestamp: 1,
            type: 'State',
            user_id: 3,
            userseed_id: 3,
            uuid: '',
            state: cards
          })
        }
      }
      if (pokerPlay && isPoker) {
        setFinishGame(true)
        return
      }
      return
    }
    if (!minesSelected && isMines) {
      showNotification && toast(t(`toast.select`))
      return
    }

    if (redrawCards && isPoker) {
      setRedrawCards(false)
      setBackCards(true)
      return
    }
    if (pokerPlay && isPoker) {
      setFinishGame(true)
      return
    }
    if (isCar && carResult?.length !== 0) {
      setCarReset(true)
      return
    }
    if (isPoker && !pokerPlay) {
      setPokerDelay(true)
    }
    if (cryptoValue * betsAmount > balance) {
      showNotification && toast(t(`toast.top_up`))
      setError(true)
      return
    }
    if (cryptoValue < 1) {
      showNotification && toast(t(`toast.min`))
      setError(true)
      return
    }
    if (!cryptoValue) {
      showNotification && toast(t(`toast.place`))
      setError(true)
    } else {
      if (isPoker && !pokerPlay) {
        playSounds !== 'off' && pokerChange()
        setPokerPlay(true)
      } else if (isApple) {
        if (!applesPlay) {
          setapplesPlay(true)
        } else {
          setStop(true)
        }
      } else if (!isPlaying) {
        setIsPlaying(true)
      } else {
        setFinishPoker(!finishPoker)
      }
    }
  }

  const wheelGame = usePathname().includes('wheel_of_fortune')

  const minesClick = () => {
    setStopWinning('YES')
  }
  const { t } = useTranslation()
  return (
    <div className='w-full sm:w-auto flex gap-[13px] sm:gap-5 row-start-4 m-[0_auto] mt-[20px] sm:mt-0 col-start-1 col-end-3 items-center justify-end -order-5 sm:order-none'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='flex justify-center items-center'>
            <InfoIcon className='w-6 h-6 aspect-square cursor-pointer text-[#676767]' />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('pages.games.info')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {wheelGame && (
        <SettingSVG
          className={`cursor-pointer duration-500 ${
            wheelVisible ? 'text-[#FFE09D] bg-transparent' : 'text-[#676767]'
          }`}
          onClick={() => {
            setWheelVisible(!wheelVisible)
            setAuto(false)
          }}
        />
      )}
      {isMines && (
        <SettingSVG
          className={`cursor-pointer duration-500 ${
            minesVisible ? 'text-[#FFE09D] bg-transparent' : 'text-[#676767]'
          }`}
          onClick={() => {
            setMinesVisible(!minesVisible)
            setAuto(false)
          }}
        />
      )}
      {isPlinko && (
        <SettingSVG
          className={`cursor-pointer duration-500 ${
            plinkoVisible ? 'text-[#FFE09D] bg-transparent' : 'text-[#676767]'
          }`}
          onClick={() => {
            setPlinkoVisible(!plinkoVisible)
            setAuto(false)
          }}
        />
      )}
      {isCar && isMobile && (
        <SettingSVG
          className={`cursor-pointer duration-500 ${
            carVisible ? 'text-[#FFE09D] bg-transparent' : 'text-[#676767]'
          }`}
          onClick={() => {
            setCarVisible(!carVisible)
            setAuto(false)
          }}
        />
      )}
      {!isPoker && !isMines && !isApple && !isThimbles && !isPlinko && (
        <div
          data-game-auto
          className={`h-[30px] flex items-center justify-center cursor-pointer min-w-[52px] relative`}
          onClick={() => {
            console.log('CLICK', autoVisibile)
            setAuto(!autoVisibile)
            setWheelVisible(false)
          }}
        >
          <span
            className={`uppercase text-[10px] font-semibold block ${
              autoVisibile ? 'text-[#FFE09D]' : 'text-[#7e7e7e]'
            }`}
          >
            {t('pages.games.auto')}
          </span>
          <AutoBorder
            className={`absolute top-0 left-0 w-full h-full ${
              autoVisibile ? 'fill-[#FFE09D]' : 'fill-[#7e7e7e]'
            }`}
          />
        </div>
      )}
      <Button
        disabled={
          coinflipGame ||
          (isApple && showResult) ||
          (isApple && apples.length === 0 && applesPlay) ||
          (isRPS && startAnimation) ||
          (isRPS && isPlaying) ||
          (isRocket && rocketInGame) ||
          (redrawCards && isPoker) ||
          (isPoker && pokerDelay) ||
          (isThimbles && isPlaying) ||
          (isThimbles && showAnimation) ||
          (isMines && waitingResponse) ||
          (isMines && minesDelay) ||
          (isPlinko && isPlaying) ||
          (isCar && isPlaying) ||
          (!access_token &&
            !isCoinflip &&
            !isRPS &&
            !isMines &&
            !isRocket &&
            !isPoker &&
            !isCar &&
            !isThimbles)
        }
        onClick={handlePlay}
        variant='wagerPlay'
        className={`uppercase flex items-center gap-[10px] ${
          isApple && applesPlay
            ? 'border-[#49B446] text-white'
            : 'border-[#FFE7B4] text-[#FFE7B4]'
        }`}
      >
        {!access_token &&
        !isCoinflip &&
        !isRPS &&
        !isMines &&
        !isRocket &&
        !isCar &&
        !isPoker &&
        !isThimbles ? (
          'Registration!'
        ) : !access_token ? (
          'Demo play'
        ) : isCar && carResult?.length > 0 ? (
          'Reset'
        ) : isPoker && pokerPlay ? (
          `${t('pages.games.redraw')}`
        ) : applesPlay && isApple ? (
          <>
            {t('pages.games.refund')} ${appleWager.toFixed(2)}
            {cryptoValue &&
              (isDrax ? (
                <DraxMiniSVG width={20} height={20} />
              ) : (
                <BonusCoinSVG width={20} height={20} />
              ))}
          </>
        ) : (
          `${t('pages.games.Play')}`
        )}
      </Button>
      {isMines && keep && (
        <Button onClick={minesClick} variant='wagerPlay' className='uppercase'>
          {t('pages.games.refund')}
        </Button>
      )}
    </div>
  )
}

export default GamePlayBlock
