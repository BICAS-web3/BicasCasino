import * as api from '@/api'
import { PokerCardProps } from '@/types/games.types'
import Image from 'next/image'
import { FC, RefObject, useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'
// import * as GameModel from '@/widgets/GamePage/model'

export const PokerCard: FC<PokerCardProps> = props => {
  const [cardFlipped, setCardFlipped] = useState(false)
  const cardRef = useRef<HTMLElement | null>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const aspectRatio = 1.5

  const [playRedrawSound] = useSound(
    `/static/media/games_assets/poker/sounds/redrawCard.mp3`,
    { volume: 1 }
  )

  // const [musicType] = useUnit([GameModel.$playSounds])

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [cardRef])

  // const height = cardWidth * aspectRatio

  return (
    <div
      ref={cardRef as RefObject<HTMLDivElement>}
      // className={`${s.poker_table_cards_list_item} ${
      //   cardFlipped && s.flipped
      // } ${props.isEmptyCard && s.empty_card}`}
      className={`
        w-[15.5vw] h-[70px] rounded-[2.5px] xxs:h-[40%] xxs:w-[50%] xxs:min-w-[50px] xxs:min-h-[70px]
        sm:w-[90px] sm:h-[125px] tb:w-full tb:h-[21.5vw] tmd:w-[140px] tmd:h-[190px] emd:w-full emd:h-[18vw]
        relative flex items-center justify-center cursor-pointer med:h-[280px]
        ${
          props.isEmptyCard
            ? 'bg-[rgba(15,_15,_15,_0.4)] rounded-[10px] h-auto '
            : ''
        }
      `}
      onClick={
        !props.isEmptyCard
          ? () => {
              // musicType !== 'off' && playRedrawSound()
              setCardFlipped(!cardFlipped)
              props.onClick()
            }
          : () => {}
      }
      //style={{ height: height }}
    >
      {!props.isEmptyCard ? (
        <>
          <div
            className={`
              flex items-center justify-center transition-all duration-1000
              absolute w-full left-0 top-0 h-full
              
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
            }}
          >
            <Image
              onLoad={() => props.setImageLoading(false)}
              src={`${api.BaseStaticUrl}/media/games_assets/poker/${props.coat}/${props.card}.svg`}
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
              transform: cardFlipped ? 'rotateY(0)' : 'rotateY(180deg)'
            }}
          >
            <Image
              onLoad={() => props.setImageLoading(false)}
              src={`${api.BaseStaticUrl}/media/games_assets/poker/0/0.svg`}
              alt='card-image'
              width={200}
              height={278}
              className='
              h-auto w-full select-none
              '
              onDragStart={() => false}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
