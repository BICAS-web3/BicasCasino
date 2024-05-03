import { Tile } from '@/app/games/mines/data'
import { GameModel, WagerModel } from '@/states'
import {
  GameStatus,
  IResult,
  WinningType,
  WonStatus
} from '@/states/game_model.store'
import { StaticImageData } from 'next/image'
import { Dispatch, SetStateAction } from 'react'

export enum CoinAction {
  Rotation = 'Rotation',
  HeadsHeads = 'HeadsHeads',
  HeadsTails = 'HeadsTails',
  TailsHeads = 'TailsHeads',
  TailsTails = 'TailsTails',
  Stop = ''
}

export interface IAppleData {
  number: number
  value: number
}

export interface appleItemData {
  apples: any[]
  cf: number
}

export interface IAppleTable {
  chunkedApplesArr: appleItemData[]
  appleData: IAppleData[]
  inGame: boolean
  mines: boolean[][]
  setAppleData: Dispatch<SetStateAction<IAppleData[]>>
  setAppleItem: Dispatch<SetStateAction<number[]>>
  setAppleGameResult: any
  setApples: any
  setMines: any
  setInGame: any
  setIsPlaying: any
  setKeep: any
  setFirstBet: any
  handleReset: any
  setStop: any
  localStatus: GameStatus | null
  setLocalStatus: Dispatch<SetStateAction<GameStatus | null>>
}

export interface IParabolaCoefs {
  main: any[]
  bigTablet: any[]
  other: any[]
  [key: string]: any
}

export interface PokerProps {
  gameText: string
}
export interface ModelProps {
  action: CoinAction
  initial: GameModel.Side
  start?: number
  setStart?: (el: number) => void
}

export interface ISelectedMine {
  type: Tile
  waitingResponse: boolean
  index: number
}

export interface IHandleResult {
  result: IResult | null
  setInGame: Dispatch<SetStateAction<boolean>>
  setWaitingResponse: Dispatch<SetStateAction<boolean>>
  setGameStatus: Dispatch<SetStateAction<GameStatus | null>>
  setWonStatus: Dispatch<SetStateAction<WonStatus | null>>
  setLostStatus: Dispatch<SetStateAction<number>>
  setKeep: Dispatch<SetStateAction<boolean>>
  setCoefficientData: Dispatch<SetStateAction<number[]>>
  setCryptoValue: Dispatch<SetStateAction<number>>
  setTotalOpenedTiles: Dispatch<SetStateAction<number>>
  triggerRedraw: Dispatch<SetStateAction<boolean>> //----
  setStopWinning: Dispatch<SetStateAction<WinningType>>
  setGameField: Dispatch<SetStateAction<Tile[]>>
  setPickedTiles: Dispatch<SetStateAction<boolean[]>>

  gameField: Tile[]
}

export interface IPlinkoPyramid {
  path: boolean[][] | undefined
  multipliers: number[]
  setMultipliers: (el: number[]) => void
  ballsArr: { value: number; index: number }[]
  setBallsArr: any
  middleC: number
  inGame: boolean
}

export interface InterfaceMultipliersColor {
  r: number
  g: number
  b: number
}

export interface IRowItem {
  isMobile: boolean
  value: number
  color: string
  ball: {
    value: number
  }
  animationDelay: boolean
  index: number
}

export interface IGameAmount {
  min: number
  max: number
  step?: number
  inputType?: WagerModel.RangeType
  title: string
}

export interface IMultipliersObject {
  [key: string]: {
    [key: number]: number[]
  }
}

export interface itemProps {
  img: StaticImageData
}

export interface PokerCardProps {
  coat: number | undefined
  card: number | undefined
  isEmptyCard: boolean
  onClick: () => void
  setImageLoading: (el: boolean) => void
}

export interface PokerCombinationProps {
  combinationName: string
  tokenImage: React.ReactNode
  profit?: string | number
  multiplier: string | number
}

export interface ICards {
  suit: number
  number: number
}

export interface ThimblesGameProps {
  gameText?: string
}

export interface IBall {
  index: number
  value: number
}

export interface ICoefficient {
  ballsArr: IBall[] | number[]
  multipliers?: number[] | Record<string, string>[] | number | bigint
  common?: boolean
}

export interface IWheelColors {
  segment: '#100C1E' | '#1F1435'
  border: string
}

export interface IWheelCoef {
  color: string
  value: number
}

export interface IWheel {
  localNumber?: number
  count: number
  segColors: IWheelColors[]
  winningSegment: any
  onFinished?: any
  onRotate?: boolean
  onRotatefinish?: boolean
  primaryColor: string
  primaryColoraround: any
  contrastColor: string
  buttonText: string
  isOnlyOnce?: boolean
  size?: number
  upDuration?: number
  downDuration?: number
  fontFamily?: string
  width?: number
  height?: number
  inSpeen: boolean
  setInSpeen: (el: boolean) => void
}
