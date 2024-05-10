import { IWheelColors } from '@/types/games.types'
import {
  BLUE_COLOR,
  GREEN_COLOR,
  PURPLE_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR
} from '../(components)/data'

export const setMediumLevel = ({
  setMedium10SegColors,
  medium10SegColors,
  medium20SegColors,
  setMedium20SegColors,
  medium30SegColors,
  medium40SegColors,
  medium50SegColors,
  setMedium30SegColors,
  setMedium40SegColors,
  setMedium50SegColors
}: {
  medium10SegColors: any[]
  setMedium10SegColors: any
  medium20SegColors: any
  setMedium20SegColors: any
  medium30SegColors: any
  medium40SegColors: any
  medium50SegColors: any
  setMedium30SegColors: any
  setMedium40SegColors: any
  setMedium50SegColors: any
}) => {
  if (medium10SegColors?.length < 11) {
    Array.from({ length: 10 }).map((_, el: number) => {
      if (el === 2) {
        setMedium10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else if (el === 0) {
        setMedium10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: GREEN_COLOR
            }
          ]
        })
      } else if (el === 6) {
        setMedium10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: YELLOW_COLOR
            }
          ]
        })
      } else if (el === 4 || el === 8) {
        setMedium10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: BLUE_COLOR
            }
          ]
        })
      } else {
        setMedium10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (medium20SegColors?.length < 21) {
    Array.from({ length: 20 }).map((_, el: number) => {
      if (el === 1 || el === 9) {
        setMedium20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: BLUE_COLOR
            }
          ]
        })
      } else if (el === 13) {
        setMedium20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else if (el === 11) {
        setMedium20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: GREEN_COLOR
            }
          ]
        })
      } else if (
        el === 3 ||
        el === 5 ||
        el === 7 ||
        el === 15 ||
        el === 17 ||
        el === 19
      ) {
        setMedium20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: YELLOW_COLOR
            }
          ]
        })
      } else {
        setMedium20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (medium30SegColors?.length < 31) {
    Array.from({ length: 30 }).map((_, el: number) => {
      if (el === 23) {
        setMedium30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else if (el === 15) {
        setMedium30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: GREEN_COLOR
            }
          ]
        })
      } else if (el === 25) {
        setMedium30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: 'red'
            }
          ]
        })
      } else if (
        el === 5 ||
        el === 9 ||
        el === 11 ||
        el === 19 ||
        el === 21 ||
        el === 29
      ) {
        setMedium30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: YELLOW_COLOR
            }
          ]
        })
      } else if (
        el === 1 ||
        el === 3 ||
        el === 7 ||
        el === 13 ||
        el === 17 ||
        el === 27
      ) {
        setMedium30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: BLUE_COLOR
            }
          ]
        })
      } else {
        setMedium30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (medium40SegColors?.length < 41) {
    Array.from({ length: 40 }).map((_, el: number) => {
      if (el === 3 || el === 9 || el === 19 || el === 33) {
        setMedium40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else if (el === 27) {
        setMedium40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: GREEN_COLOR
            }
          ]
        })
      } else if (
        el === 1 ||
        el === 5 ||
        el === 15 ||
        el === 23 ||
        el === 25 ||
        el === 29 ||
        el === 37
      ) {
        setMedium40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: YELLOW_COLOR
            }
          ]
        })
      } else if (
        el === 7 ||
        el === 11 ||
        el === 13 ||
        el === 17 ||
        el === 21 ||
        el === 31 ||
        el === 35 ||
        el === 39
      ) {
        setMedium40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: BLUE_COLOR
            }
          ]
        })
      } else {
        setMedium40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (medium50SegColors?.length < 51) {
    Array.from({ length: 50 }).map((_, el: number) => {
      if (el === 9 || el === 19 || el === 33) {
        setMedium50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else if (el === 43) {
        setMedium50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: GREEN_COLOR
            }
          ]
        })
      } else if (
        el === 1 ||
        el === 5 ||
        el === 15 ||
        el === 23 ||
        el === 27 ||
        el === 29 ||
        el === 37 ||
        el === 47
      ) {
        setMedium50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: YELLOW_COLOR
            }
          ]
        })
      } else if (
        el === 3 ||
        el === 7 ||
        el === 11 ||
        el === 13 ||
        el === 17 ||
        el === 21 ||
        el === 25 ||
        el === 31 ||
        el === 35 ||
        el === 39 ||
        el === 41 ||
        el === 45 ||
        el === 49
      ) {
        setMedium50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: BLUE_COLOR
            }
          ]
        })
      } else {
        setMedium50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
}

export const setHardLevel = ({
  setHard10SegColors,
  hard10SegColors,
  hard20SegColors,
  setHard20SegColors,
  hard30SegColors,
  hard40SegColors,
  hard50SegColors,
  setHard30SegColors,
  setHard40SegColors,
  setHard50SegColors
}: {
  hard10SegColors: any[]
  setHard10SegColors: any
  hard20SegColors: any
  setHard20SegColors: any
  hard30SegColors: any
  hard40SegColors: any
  hard50SegColors: any
  setHard30SegColors: any
  setHard40SegColors: any
  setHard50SegColors: any
}) => {
  if (hard10SegColors?.length < 11) {
    Array.from({ length: 10 }).map((_, el: number) => {
      if (el === 0) {
        setHard10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: BLUE_COLOR
            }
          ]
        })
      } else {
        setHard10SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (hard20SegColors?.length < 21) {
    Array.from({ length: 20 }).map((_, el: number) => {
      if (el === 0) {
        setHard20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else {
        setHard20SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (hard30SegColors?.length < 31) {
    Array.from({ length: 30 }).map((_, el: number) => {
      if (el === 0) {
        setHard30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else {
        setHard30SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (hard40SegColors?.length < 41) {
    Array.from({ length: 40 }).map((_, el: number) => {
      if (el === 0) {
        setHard40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else {
        setHard40SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
  if (hard50SegColors?.length < 51) {
    Array.from({ length: 50 }).map((_, el: number) => {
      if (el === 0) {
        setHard50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: PURPLE_COLOR
            }
          ]
        })
      } else {
        setHard50SegColors(prev => {
          return [
            ...prev,
            {
              segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
              border: WHITE_COLOR
            }
          ]
        })
      }
    })
  }
}

export const generateSegmentColors_easy = (
  count: number,
  greenIndex: number
): IWheelColors[] => {
  return Array.from({ length: count }).map((_, el: number) => {
    if ([1, 11, 21, 31, 41].includes(el)) {
      return {
        segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
        border: GREEN_COLOR
      }
    } else if ([0, 5, 10, 15, 20, 25, 30, 35, 40, 45].includes(el)) {
      return {
        segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
        border: WHITE_COLOR
      }
    } else {
      return {
        segment: el % 2 === 1 ? '#1F1435' : '#100C1E',
        border: BLUE_COLOR
      }
    }
  })
}

export const setCoefLevel = ({
  setLevelCoef,
  level,
  pickedValue
}: {
  setLevelCoef: any
  level: any
  pickedValue: number
}) => {
  if (level === 'Easy') {
    setLevelCoef([
      { value: 0.0, color: WHITE_COLOR },
      { value: 1.2, color: BLUE_COLOR },
      { value: 1.5, color: GREEN_COLOR }
    ])
  } else if (level === 'Medium') {
    if (pickedValue === 10) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.5, color: BLUE_COLOR },
        { value: 1.9, color: PURPLE_COLOR },
        { value: 2.0, color: YELLOW_COLOR },
        { value: 3.0, color: GREEN_COLOR }
      ])
    } else if (pickedValue === 20) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.5, color: BLUE_COLOR },
        { value: 1.8, color: PURPLE_COLOR },
        { value: 2.0, color: YELLOW_COLOR },
        { value: 3.0, color: GREEN_COLOR }
      ])
    } else if (pickedValue === 30) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.5, color: BLUE_COLOR },
        { value: 1.7, color: PURPLE_COLOR },
        { value: 2.0, color: YELLOW_COLOR },
        { value: 3.0, color: GREEN_COLOR },
        { value: 4.0, color: '#FF0000' }
      ])
    } else if (pickedValue === 40) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.5, color: BLUE_COLOR },
        { value: 1.6, color: GREEN_COLOR },
        { value: 2.0, color: YELLOW_COLOR },
        { value: 3.0, color: PURPLE_COLOR }
      ])
    } else if (pickedValue === 50) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 1.5, color: BLUE_COLOR },
        { value: 2.0, color: YELLOW_COLOR },
        { value: 3.0, color: PURPLE_COLOR },
        { value: 5.0, color: GREEN_COLOR }
      ])
    }
  } else {
    if (pickedValue === 10) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 9.9, color: BLUE_COLOR }
      ])
    } else if (pickedValue === 20) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 19.8, color: PURPLE_COLOR }
      ])
    } else if (pickedValue === 30) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 29.7, color: PURPLE_COLOR }
      ])
    } else if (pickedValue === 40) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 39.6, color: PURPLE_COLOR }
      ])
    } else if (pickedValue === 50) {
      setLevelCoef([
        { value: 0.0, color: WHITE_COLOR },
        { value: 49.5, color: PURPLE_COLOR }
      ])
    }
  }
}
