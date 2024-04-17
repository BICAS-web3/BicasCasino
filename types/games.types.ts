import { Tile } from '@/app/games/mines/data'
import { GameModel } from '@/states'
import {
  GameStatus,
  IResult,
  WinningType,
  WonStatus
} from '@/states/game_model.store'
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
