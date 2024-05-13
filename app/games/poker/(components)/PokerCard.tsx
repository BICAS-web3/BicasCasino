import * as api from '@/api'
import { GameModel } from '@/states'
import { PokerCardProps } from '@/types/games.types'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { FC, RefObject, useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

export const PokerCard: FC<PokerCardProps> = props => {
  const [isPlaying] = useUnit([GameModel.$pokerPlay])
  const {
    card,
    coat,
    isEmptyCard,
    openedCard,
    closeCard,
    onClick,
    setImageLoading,
    setOpenedCard
  } = props
  const [cardFlipped, setCardFlipped] = useState(false)
  const cardRef = useRef<HTMLElement | null>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const [musicType] = useUnit([GameModel.$playSounds])

  const [localFlip, setLocalFlip] = useState(false)

  const [playRedrawSound] = useSound(
    `https://game.greekkeepers.io/static/media/games_assets/poker/sounds/redrawCard.mp3`,
    { volume: 1 }
  )

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [cardRef])

  useEffect(() => {
    if (openedCard) {
      setOpenedCard?.(!openedCard)
    }
  }, [openedCard])

  const [localNumber, setLocalNumber] = useState(0)

  useEffect(() => {
    if (card) {
      setLocalNumber(card)
    }
  }, [])

  useEffect(() => {
    if (isPlaying && !openedCard) {
      setLocalFlip(true)
    }
  }, [card])

  return (
    <div
      ref={cardRef as RefObject<HTMLDivElement>}
      className={`
        min-w-[58px] xxxs:min-w-[62px] w-[15.5vw] h-[70px] rounded-[2.5px] xxs:h-[40%] xxs:w-[50%] xxs:min-w-[73px] xxs:min-h-[70px] duration-300
        sm:w-[90px] sm:h-[125px] tb:w-full tb:h-[21.5vw] tmd:w-[140px] tmd:h-[190px] emd:w-full emd:h-[18vw] relative flex items-center justify-center med:h-[280px]
        ${
          isEmptyCard ? 'bg-[rgba(15,_15,_15,_0.4)] rounded-[10px] h-auto ' : ''
        } ${
        isPlaying &&
        'sm:hover:translate-y-[-15px] hover:translate-y-[-5px] cursor-pointer'
      }`}
      onClick={
        !isEmptyCard
          ? () => {
              musicType !== 'off' && isPlaying && playRedrawSound()
              setCardFlipped(!cardFlipped)
              onClick()
            }
          : () => {}
      }
    >
      {!isEmptyCard &&
        (localFlip ? (
          <>
            <div
              className={`flex items-center justify-center transition-all duration-1000
                        absolute w-full left-0 top-0 h-full`}
              style={{
                backfaceVisibility: 'hidden',
                transform:
                  ((cardFlipped || openedCard) && isPlaying) || closeCard
                    ? 'rotateY(0)'
                    : 'rotateY(180deg)'
              }}
            >
              <Image
                onLoad={() => setImageLoading(false)}
                src={`/images/cards/back.png`}
                alt='card-image'
                width={200}
                height={278}
                className='h-auto w-full select-none'
                onDragStart={() => false}
              />
            </div>
            <div
              className={`flex items-center justify-center transition-all duration-1000
              absolute w-full left-0 top-0 h-full`}
              style={{
                backfaceVisibility: 'hidden',
                transform:
                  ((cardFlipped || openedCard) && isPlaying) || closeCard
                    ? 'rotateY(180deg)'
                    : 'rotateY(0)'
              }}
            >
              <Image
                onLoad={() => setImageLoading(false)}
                src={
                  card === 0 && coat === 0
                    ? `/images/cards/back.png`
                    : `/images/cards/${coat}/${card}.svg`
                }
                // src={`/images/cards/${coat}/${card}.svg`}
                alt='card-image'
                width={200}
                height={278}
                className='h-auto w-full select-none'
                onDragStart={() => false}
              />
            </div>
          </>
        ) : (
          <>
            <div
              className={`flex items-center justify-center transition-all duration-1000
              absolute w-full left-0 top-0 h-full`}
              style={{
                backfaceVisibility: 'hidden',
                transform:
                  ((cardFlipped || openedCard || localFlip) && isPlaying) ||
                  closeCard
                    ? 'rotateY(180deg)'
                    : 'rotateY(0)'
              }}
            >
              <Image
                onLoad={() => setImageLoading(false)}
                src={
                  card === 0 && coat === 0
                    ? `/images/cards/back.png`
                    : `/images/cards/${coat}/${card}.svg`
                }
                alt='card-image'
                width={200}
                height={278}
                className='h-auto w-full select-none'
                onDragStart={() => false}
              />
            </div>
            <div
              className={`flex items-center justify-center transition-all duration-1000
                        absolute w-full left-0 top-0 h-full`}
              style={{
                backfaceVisibility: 'hidden',
                transform:
                  ((cardFlipped || openedCard || localFlip) && isPlaying) ||
                  closeCard
                    ? 'rotateY(0)'
                    : 'rotateY(180deg)'
              }}
            >
              <Image
                onLoad={() => setImageLoading(false)}
                src={`/images/cards/back.png`}
                alt='card-image'
                width={200}
                height={278}
                className='h-auto w-full select-none'
                onDragStart={() => false}
              />
            </div>
          </>
        ))}
    </div>
  )
}
