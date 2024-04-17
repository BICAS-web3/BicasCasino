import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { randInt } from 'three/src/math/MathUtils.js'
import { useStore, useUnit } from 'effector-react'

import { useMediaQuery } from 'usehooks-ts'
import { useDeviceType } from '@/lib/hooks/useDeviceType'

import { BallSVG } from './icons'
import { genParabolaMovements, newMultipliers } from './plinko.tools'

import { $pickedRows } from '@/states/game_model.store'
import { GameModel } from '@/states'
import RowItem from './row.item'

interface IPlinkoPyramid {
  path: boolean[][] | undefined
  multipliers: number[]
  setMultipliers: (el: number[]) => void
  ballsArr: { value: number; index: number }[]
  setBallsArr: any
  middleC: number
  inGame: boolean
}

const PlinkoPyramid: FC<IPlinkoPyramid> = props => {
  const isDesktop = useMediaQuery('(max-width: 1200px)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [ball, setBolls] = useUnit([GameModel.$arrayStore, GameModel.setBolls])
  const pickedRows = useStore($pickedRows)
  const [rowCount, setRowCount] = useState(pickedRows)
  const device = useDeviceType()

  const [currentLevel, setCurrentLevel] = useState('')

  const [animationFinished, setAnimationFinished] = useState<boolean>(true)
  const [path, setPath] = useState<boolean[] | undefined>(undefined)
  const [balls, setBalls] = useState<any[]>([])

  const [ballTop, setBallTop] = useState<number>(-90)

  let lastMove = 0
  let [firstMove, setFirstMove] = useState<number>(0)
  let movingDeep = 0
  let sidesMove = 0
  const [ballLeft, setBallLeft] = useState<number>(0)

  useEffect(() => {
    if (ballLeft != 0) {
      setBalls(
        props.path?.map((_, index) => {
          return (
            <div
              id={`ball${index}`}
              className='absolute w-fit'
              style={{
                top: `${ballTop}px`,
                left: `calc(50% + ${ballLeft}px)`
              }}
            >
              <BallSVG />
            </div>
          )
        }) as any[]
      )
    }
  }, [props.path, ballLeft, device])

  useEffect(() => {
    if (device) {
      if (device == 'bigTablet') {
        setBallLeft(-4)
        movingDeep = 15
        setFirstMove(81)
        lastMove = 11
        sidesMove = 13
      } else if (device == 'main' || device == 'laptop') {
        setBallLeft(-5)
        setFirstMove(85)
        movingDeep = 26
        lastMove = 26
        sidesMove = 17.5
      } else {
        setBallLeft(-3.5)
        setFirstMove(81)
        movingDeep = 11
        lastMove = 5
        sidesMove = 9
      }
    }
  }, [device])

  useEffect(() => {
    if (balls && balls.length > 0 && props.path && device) {
      props.path?.map((val, index) => {
        const ball = document.querySelector(`#ball${index}`)
        let animation: any[] = []

        const ballTiming = {
          duration: 400 * (props.path as any)[0].length + 2,
          iterations: 1,
          easing: 'ease-in',
          fill: 'forwards' as any,
          delay: (400 + randInt(10, 50)) * index
        }
        animation.push({
          transform: `translate(0px, 0px)`
        })
        animation.push({
          transform: `translate(0px, ${firstMove}px)`
        })
        const anim = genParabolaMovements(val, device?.toString(), firstMove)
        for (var an of anim) {
          for (var a of an) {
            animation.push(a)
          }
        }

        ball?.animate(animation, ballTiming)
      })
    }
  }, [balls])

  const [level] = useUnit([GameModel.$level])

  useEffect(() => {
    setCurrentLevel(level)
  }, [level])

  const updateMultipliers = (rowCount: number, lvl: string) => {
    const easyMultipliersArray = newMultipliers.easyMultipliers[rowCount]
    const normalMultipliersArray = newMultipliers.normalMultipliers[rowCount]
    const hardMultipliersArray = newMultipliers.hardMultipliers[rowCount]

    if (lvl == 'easy') {
      props.setMultipliers(easyMultipliersArray)
    } else if (lvl == 'normal') {
      props.setMultipliers(normalMultipliersArray)
    } else if (lvl == 'hard') {
      props.setMultipliers(hardMultipliersArray)
    }
  }

  useLayoutEffect(() => {
    const updateDotSizes = (rowCount: number) => {
      const dotWidth =
        device === 'main'
          ? '5px'
          : device === 'bigTablet'
          ? '3px'
          : device === 'tablet'
          ? '3px'
          : device === 'phone'
          ? '3px'
          : '5px'
      const dotHeight =
        device === 'main'
          ? '5px'
          : device === 'bigTablet'
          ? '3px'
          : device === 'tablet'
          ? '3px'
          : device === 'phone'
          ? '3px'
          : '5px'
      document.documentElement.style.setProperty('--dot-width', dotWidth)
      document.documentElement.style.setProperty('--dot-height', dotHeight)
    }
    updateDotSizes(pickedRows)
  }, [device])

  useEffect(() => {
    updateMultipliers(pickedRows, currentLevel)
  }, [pickedRows, currentLevel])

  useEffect(() => {
    setRowCount(pickedRows)
  }, [pickedRows])

  const [multipliersSteps, setMultipliersSteps] = useState<number>(
    countMultipliersSteps(props.multipliers.length)
  )

  // Стилизация Кубиков со значениями
  function countMultipliersSteps(length: number): number {
    return (length - 1) / 2
  }

  useEffect(() => {
    setMultipliersSteps(countMultipliersSteps(props.multipliers.length))
  }, [props.multipliers.length])

  const [animationDelay, setAnimaitionDelay] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setAnimaitionDelay(animationFinished)
    }, pickedRows * (isDesktop ? 210 : 215))
  }, [animationFinished])

  const [resetColor, setResetColor] = useState(false)
  const [blueColor, setBlueColor] = useState<
    { value: boolean; index: number }[]
  >([])
  function setAnimation(time: number) {
    const delay = time * 200
    if (time === rowCount - 1) {
      setTimeout(() => {
        setBlueColor([])
      }, (time + 1) * 200)
    }
    setTimeout(() => {
      setBlueColor(prev => [...prev, { index: time, value: true }])
    }, delay)
  }

  useEffect(() => {
    let arr = Array.from({ length: rowCount })
    if (blueColor.length !== 0) {
      return
    }
    {
      if (path || props.inGame) {
        arr.forEach((_, i) => setAnimation(i))
      }
    }
  }, [resetColor])
  useEffect(() => {
    setResetColor(prev => !prev)
  }, [path, rowCount, props.inGame])

  useEffect(() => {
    let intervalId: any

    if (props.inGame) {
      intervalId = setInterval(() => {
        setResetColor(prev => !prev)
      }, 200)
    }

    return () => clearInterval(intervalId)
  }, [props.inGame])

  const generateRows = () => {
    const rows: any[] = []
    for (let i = 0; i < rowCount; i++) {
      const dots: any[] = []
      for (let j = 0; j < i + 3; j++) {
        dots.push(
          <span
            className={`flex justify-center items-center duration-500 mx-[7.5px] sm:mx-[11.5px] lg:mx-[15px] my-1 sm:my-1.5 lg:my-[11px] rounded-[50%] w-[var(--dot-width)] h-[var(--dot-height)] ${
              blueColor[i]?.value
                ? 'bg-[#3dadff]'
                : ' bg-[linear-gradient(to_bottom,#ffffff,#ececec,#d9d9d9,#bebebe,#cdcdcd)]'
            }`}
            key={j}
          ></span>
        )
      }

      rows.push(
        <div className='{styles.pyramid_row}' key={i}>
          <span className='hidden'>ball</span>
          <div className='flex justify-center items-center'>{dots}</div>
        </div>
      )
    }

    // Назначение цветов
    interface InterfaceMultipliersColor {
      r: number
      g: number
      b: number
    }
    // rgba(205, 93, 33, 1) rgba(255, 170, 92, 1)
    const multipliersColorCenter: string = 'rgba(255, 170, 92, 1)' // вот цвета. Крайние и центральный. Надо, чтобы обязательно затемнялись. На высветвление надо другое делать
    const multipliersColorStart: InterfaceMultipliersColor = {
      r: 205,
      g: 93,
      b: 33 // это тоже цвета
    }
    const multipliersColorEnd: InterfaceMultipliersColor = {
      r: 255,
      g: 170,
      b: 92
    }
    // Высчитывание цвета на один шаг
    const calcMultipliersColor: InterfaceMultipliersColor = {
      r: (multipliersColorEnd.r - multipliersColorStart.r) / multipliersSteps,
      g: (multipliersColorEnd.g - multipliersColorStart.g) / multipliersSteps,
      b: (multipliersColorEnd.b - multipliersColorStart.b) / multipliersSteps
    }

    function multipliersBackground(i: number): string {
      if (i !== multipliersSteps) {
        if (i / (multipliersSteps / 2) < 2) {
          const formula: number = calcMultipliersColor.r * (i + 1)
          return `rgb(${multipliersColorStart.r + formula}, ${
            multipliersColorStart.g + formula
          }, ${multipliersColorStart.b + formula})`
        } else if (i / (multipliersSteps / 2) > 2) {
          const formula: number =
            calcMultipliersColor.r * (multipliersSteps * 2 + 1 - i)
          return `rgb(${multipliersColorStart.r + formula}, ${
            multipliersColorStart.g + formula
          }, ${multipliersColorStart.b + formula})`
        }
      }
      return multipliersColorCenter
    }
    const multiplierElements = props.multipliers.map((value, i) => {
      const color = multipliersBackground(i).replace(/\s/g, '')
      return (
        <RowItem
          key={i}
          animationDelay={animationDelay}
          isMobile={isMobile}
          index={i}
          value={value}
          ball={ball}
          color={color}
        />
      )
    })
    rows.push(
      <div className='flex justify-center items-center' key={rowCount}>
        {multiplierElements}
      </div>
    )

    return rows
  }

  return (
    <div className='flex justify-center flex-col relative mb-5 sm:mb-10 lg:mb-20 items-center'>
      {generateRows()}
      {props.path && (
        <div className='absolute w-full h-full top-0 bottom-0'>{balls}</div>
      )}
    </div>
  )
}
export default PlinkoPyramid
