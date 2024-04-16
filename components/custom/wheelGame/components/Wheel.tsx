import { useMediaQuery } from 'usehooks-ts'

import { GameModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC, useEffect, useState } from 'react'
interface IWheelColors {
  segment: '#100C1E' | '#1F1435'
  border: string
}

interface IWheel {
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

const Wheel: FC<IWheel> = props => {
  const {
    count,
    segColors,
    winningSegment,
    onFinished,
    isOnlyOnce = true,
    size = 500,
    upDuration = 1000,
    downDuration = 100,
    fontFamily = 'proxima-nova',
    width = 100,
    height = 100,
    setInSpeen
  } = props
  const isMobile = useMediaQuery('(max-width: 650px)')
  const isDesktop = useMediaQuery('(max-width: 1280px)')
  const [level, pickedValue] = useUnit([
    GameModel.$level,
    WagerModel.$pickedRows
  ])
  let currentSegment = ''
  let isStarted = false
  const [isFinished, setFinished] = useState(false)
  let timerHandle = 0
  const timerDelay = 10
  let angleCurrent = 0
  let angleDelta = 0
  let canvasContext: any = null
  let maxSpeed = Math.PI / 10
  const upTime = 10 * upDuration
  const downTime = 10 * downDuration
  let spinStart = 0
  let frames = 0
  const centerX = isMobile ? 130 : isDesktop ? 155 : 212
  const centerY = isMobile ? 130 : isDesktop ? 155 : 212
  useEffect(() => {
    if (segColors?.length > 1) {
      initCanvas()
      wheelDraw(segColors)
    }
  }, [segColors, isDesktop, isMobile])
  function setupCanvas(canvas: HTMLCanvasElement) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1
    // Get the size of the canvas in CSS pixels.
    var rect = canvas?.getBoundingClientRect()
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas!.width = rect?.width * dpr
    canvas!.height = rect?.height * dpr
    var ctx = canvas?.getContext('2d')
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx!.scale(dpr, dpr)
    return ctx
  }

  const initCanvas = () => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    if (navigator.appVersion.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas')
      canvas.setAttribute('width', `${width}`)
      canvas.setAttribute('height', `${height}`)
      canvas.setAttribute('id', 'canvas')
      var dpr = window.devicePixelRatio || 1
      var rect = canvas?.getBoundingClientRect()
      canvas!.width = rect?.width * dpr
      canvas!.height = rect?.height * dpr
      var ctx = canvas?.getContext('2d')
      ctx!.scale(dpr, dpr)
      document!.getElementById('wheel')!.appendChild(canvas)
    }
    // canvas!.addEventListener("click", spin, false);
    canvasContext = canvas!.getContext('2d')
  }

  const wheelDraw = (colors: IWheelColors[]) => {
    clear()
    drawWheel(colors)
    // drawNeedle();
  }

  const draw = (colors: IWheelColors[]) => {
    clear()
    drawWheel(colors)
    drawNeedle()
  }

  const drawSegment = (
    key: number,
    lastAngle: number,
    angle: number,
    colors: IWheelColors[]
  ) => {
    const ctx = canvasContext

    function toRad(deg: number): number {
      return deg * (Math.PI / 180.0)
    }
    const width = (document.getElementById('canvas') as HTMLCanvasElement).width
    const height = (document.getElementById('canvas') as HTMLCanvasElement)
      .height

    const centerX = width / 2
    const centerY = height / 2
    const radius = width / 2 - (isMobile ? 14 : 5)
    ctx!.beginPath()
    ctx!.arc(centerX, centerY, radius, toRad(0), toRad(360))
    ctx!.lineTo(centerX, centerY)
    ctx!.fill()
    let currentDeg = 0
    let step = 360 / count
    let startDeg = currentDeg
    for (let i = 0; i < count; i++, startDeg += step) {
      let endDeg = startDeg + step

      let color = colors[i].segment
      let colorStyle = color

      ctx!.beginPath()
      // Рисуем сегмент без обводки
      ctx!.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg))
      ctx!.lineTo(centerX, centerY)
      let colorStyle2 = colors[i].border
      ctx!.fillStyle = colorStyle2
      ctx!.fill()
      ctx!.beginPath()
      // Рисуем сегмент с обводкой
      ctx!.arc(
        centerX,
        centerY,
        radius - (isMobile ? 12 : isDesktop ? 16 : 18),
        toRad(startDeg - (isMobile ? 0.4 : 0.25)),
        toRad(endDeg)
      )
      ctx!.fillStyle = colorStyle
      ctx!.lineTo(centerX, centerY)
      ctx!.fill()
    }
    // ctx.restore();
  }

  const drawWheel = (colors: IWheelColors[]) => {
    const ctx = canvasContext
    let lastAngle = angleCurrent
    const len = count
    const PI2 = Math.PI * 2

    ctx.font = '1em ' + fontFamily
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent
      drawSegment(i - 1, lastAngle, angle, colors)
      lastAngle = angle
    }

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, size, 0, PI2, false)
    ctx.closePath()
  }

  const drawNeedle = () => {
    const ctx = canvasContext
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(centerX + count, centerY - 40)
    ctx.lineTo(centerX - count, centerY - 40)
    ctx.lineTo(centerX, centerY - 60)
    ctx.closePath()
    ctx.fill()
    const change = angleCurrent + Math.PI / 2
    let i = count - Math.floor((change / (Math.PI * 2)) * count) - 1
    if (i < 0) i = i + count
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'transparent'
    ctx.font = 'bold 1.5em ' + fontFamily
    // currentSegment = segments[i];
    isStarted && ctx.fillText(' ', centerX + count, centerY + size + 50)
  }
  const clear = () => {
    const ctx = canvasContext
    ctx.clearRect(0, 0, 1000, 800)
  }

  return (
    <div
      id='wheel'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        id='canvas'
        width={isMobile ? 260 : isDesktop ? 310 : 424}
        height={isMobile ? 260 : isDesktop ? 310 : 424}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto'
        }}
      />
    </div>
  )
}

export default Wheel
