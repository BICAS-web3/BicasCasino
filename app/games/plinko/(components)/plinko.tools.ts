import { IMultipliersObject, IParabolaCoefs } from '@/types/games.types'

export const parabolaCoefs: IParabolaCoefs = {
  main: [
    81.8399972, 79.2742744, 77.3028316, 75.9256688, 75.142786, 74.9541832,
    75.3598604, 76.3598176, 77.9540548, 80.142572, 82.9253692,
    86.30244640000001, 90.27380360000001, 94.8394408, 99.999358, 105.7535552,
    112.10203239999998
  ],
  laptop: [
    81.8399972, 79.2742744, 77.3028316, 75.9256688, 75.142786, 74.9541832,
    75.3598604, 76.3598176, 77.9540548, 80.142572, 82.9253692,
    86.30244640000001, 90.27380360000001, 94.8394408, 99.999358, 105.7535552,
    112.10203239999998
  ],
  bigTablet: [
    78.6745, 77.279889816, 76.216235264, 75.483536344, 75.081793056, 75.0110054,
    75.27117337600001, 75.862296984, 76.784376224, 78.037411096, 79.6214016,
    81.536347736, 83.78224950399999, 86.35910690399999, 89.266919936,
    92.50568859999998, 96.07541289599999, 99.97609282399998
  ],
  other: [
    79.3333, 78.7212024053, 78.2956468212, 78.0566332477, 78.0041616848,
    78.1382321325, 78.4588445908, 78.9659990597, 79.6596955392, 80.5399340293,
    81.60671453, 82.86003704129999, 84.2999015632, 85.9263080957,
    87.73925663879999, 89.7387471925, 91.92477975679999, 94.29735433169999
  ]
}

export const newMultipliers: IMultipliersObject = {
  easyMultipliers: {
    16: [
      120, 28, 24, 8, 2, 0.9, 0.9, 0.6, 0.4, 0.6, 0.9, 0.9, 2, 8, 24, 28, 120
    ],
    15: [
      110, 45, 13, 9, 1.1, 0.9, 0.6, 0.4, 0.4, 0.6, 0.9, 1.1, 9, 13, 45, 110
    ],
    14: [100, 45, 9, 3, 1.1, 0.9, 0.6, 0.4, 0.6, 0.9, 1.1, 3, 9, 45, 100],
    13: [80, 17, 6, 4, 0.9, 0.6, 0.4, 0.4, 0.6, 0.9, 4, 6, 17, 80],
    12: [70, 16, 3, 2, 0.9, 0.6, 0.4, 0.6, 0.9, 2, 3, 16, 70],
    11: [65, 17, 4, 0.9, 0.6, 0.4, 0.4, 0.6, 0.9, 4, 17, 65],
    10: [47, 8, 2, 0.9, 0.6, 0.4, 0.6, 0.9, 2, 8, 47],
    9: [45, 8, 0.9, 0.6, 0.4, 0.4, 0.6, 0.9, 8, 45],
    8: [20.5, 4, 0.9, 0.6, 0.4, 0.6, 0.9, 4, 20.5]
  },
  normalMultipliers: {
    16: [520, 80, 15, 10, 3, 2, 0.5, 0.3, 0.2, 0.3, 0.5, 2, 3, 10, 15, 80, 520],
    15: [500, 60, 22, 8, 2, 0.9, 0.4, 0.2, 0.2, 0.4, 0.9, 2, 8, 22, 60, 500],
    14: [390, 55, 15, 4, 0.9, 0.8, 0.4, 0.2, 0.4, 0.8, 0.9, 4, 15, 55, 390],
    13: [250, 44, 7, 4, 0.9, 0.4, 0.2, 0.2, 0.4, 0.9, 4, 7, 44, 250],
    12: [175, 35, 4, 2, 0.6, 0.4, 0.2, 0.4, 0.6, 2, 4, 35, 175],
    11: [150, 20, 5, 0.6, 0.5, 0.2, 0.2, 0.5, 0.6, 5, 20, 150],
    10: [95, 10, 2, 0.9, 0.4, 0.2, 0.4, 0.9, 2, 10, 95],
    9: [66, 12, 0.5, 0.4, 0.2, 0.2, 0.4, 0.5, 12, 66],
    8: [50, 4, 0.5, 0.4, 0.2, 0.4, 0.5, 4, 50]
  },
  hardMultipliers: {
    16: [
      1000, 280, 30, 15, 1.5, 0.6, 0.5, 0.4, 0.1, 0.4, 0.5, 0.6, 1.5, 15, 30,
      280, 1000
    ],
    15: [
      800, 200, 50, 5, 0.8, 0.5, 0.3, 0.1, 0.1, 0.3, 0.5, 0.8, 5, 50, 200, 800
    ],
    14: [770, 65, 13, 3, 2, 0.5, 0.3, 0.1, 0.3, 0.5, 2, 3, 13, 65, 770],
    13: [500, 68, 7, 2, 0.9, 0.4, 0.2, 0.2, 0.4, 0.9, 2, 7, 68, 500],
    12: [380, 20, 4, 2, 0.8, 0.3, 0.1, 0.3, 0.8, 2, 4, 20, 380],
    11: [290, 15, 2, 0.8, 0.5, 0.3, 0.3, 0.5, 0.8, 2, 15, 290],
    10: [170, 15, 2, 0.3, 0.2, 0.1, 0.2, 0.3, 2, 15, 170],
    9: [143, 5, 0.7, 0.3, 0.1, 0.1, 0.3, 0.7, 5, 143],
    8: [100, 0.6, 0.2, 0.2, 0.1, 0.2, 0.2, 0.6, 100]
  }
}

export function genParabolaMovements(
  path: boolean[],
  screen: string,
  startingTop: number
) {
  var x: number = 0
  var y: number = 0

  const coefs = parabolaCoefs[screen]
    ? parabolaCoefs[screen]
    : parabolaCoefs['other']

  let yStep = Math.abs(coefs[16] - startingTop)
  let xStep = 0

  if (screen == 'main' || screen == 'laptop') {
    xStep = 1
  } else if (screen == 'bigTablet') {
    xStep = 0.764
  } else {
    xStep = 0.529
  }

  var to_return: any[] = []
  for (var p of path) {
    if (p) {
      to_return.push([
        {
          transform: `translate(${xStep * 1 + x}px, ${coefs[0] + y}px)`
        },
        {
          transform: `translate(${xStep * 2 + x}px, ${coefs[1] + y}px)`
        },
        {
          transform: `translate(${xStep * 3 + x}px, ${coefs[2] + y}px)`
        },
        {
          transform: `translate(${xStep * 4 + x}px, ${coefs[3] + y}px)`
        },
        {
          transform: `translate(${xStep * 5 + x}px, ${coefs[4] + y}px)`
        },
        {
          transform: `translate(${xStep * 6 + x}px, ${coefs[5] + y}px)`
        },
        {
          transform: `translate(${xStep * 7 + x}px, ${coefs[6] + y}px)`
        },
        {
          transform: `translate(${xStep * 8 + x}px, ${coefs[7] + y}px)`
        },
        {
          transform: `translate(${xStep * 9 + x}px, ${coefs[8] + y}px)`
        },
        {
          transform: `translate(${xStep * 10 + x}px, ${coefs[9] + y}px)`
        },
        {
          transform: `translate(${xStep * 11 + x}px, ${coefs[10] + y}px)`
        },
        {
          transform: `translate(${xStep * 12 + x}px, ${coefs[11] + y}px)`
        },
        {
          transform: `translate(${xStep * 13 + x}px, ${coefs[12] + y}px)`
        },
        {
          transform: `translate(${xStep * 14 + x}px, ${coefs[13] + y}px)`
        },
        {
          transform: `translate(${xStep * 15 + x}px, ${coefs[14] + y}px)`
        },
        {
          transform: `translate(${xStep * 16 + x}px, ${coefs[15] + y}px)`
        },
        {
          transform: `translate(${xStep * 17 + x}px, ${coefs[16] + y}px)`
        }
      ])
      x += xStep * 17
    } else {
      to_return.push([
        {
          transform: `translate(${x - xStep * 1}px, ${coefs[0] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 2}px, ${coefs[1] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 3}px, ${coefs[2] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 4}px, ${coefs[3] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 5}px, ${coefs[4] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 6}px, ${coefs[5] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 7}px, ${coefs[6] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 8}px, ${coefs[7] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 9}px, ${coefs[8] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 10}px, ${coefs[9] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 11}px, ${coefs[10] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 12}px, ${coefs[11] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 13}px, ${coefs[12] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 14}px, ${coefs[13] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 15}px, ${coefs[14] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 16}px, ${coefs[15] + y}px)`
        },
        {
          transform: `translate(${x - xStep * 17}px, ${coefs[16] + y}px)`
        }
      ])
      x -= xStep * 17
    }
    y += yStep
  }

  return to_return
}
