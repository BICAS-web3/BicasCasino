import { useMediaQuery } from 'usehooks-ts'

import { IWheel, IWheelColors } from '@/types/games.types'
import { FC, useEffect, useState } from 'react'

const WheelCircle: FC<IWheel> = props => {
  const {
    count,
    segColors,
    isOnlyOnce = true,
    size = 500,
    fontFamily = 'proxima-nova',
    width = 100,
    height = 100
  } = props
  const isMobile = useMediaQuery('(max-width: 650px)')
  const isDesktop = useMediaQuery('(max-width: 1280px)')

  let isStarted = false
  const [isFinished, setFinished] = useState(false)
  let angleCurrent = 0
  let canvasContext: any = null
  const centerX = isMobile ? 130 : isDesktop ? 155 : 212
  const centerY = isMobile ? 130 : isDesktop ? 155 : 212
  useEffect(() => {
    if (segColors?.length > 1) {
      initCanvas()
      wheelDraw(segColors)
    }
  }, [segColors, isDesktop, isMobile])

  function setupCanvas(canvas: HTMLCanvasElement) {
    var dpr = window.devicePixelRatio || 1
    var rect = canvas?.getBoundingClientRect()
    canvas!.width = rect?.width * dpr
    canvas!.height = rect?.height * dpr
    var ctx = canvas?.getContext('2d')
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
      ctx!.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg))
      ctx!.lineTo(centerX, centerY)
      let colorStyle2 = colors[i].border
      ctx!.fillStyle = colorStyle2
      ctx!.fill()
      ctx!.beginPath()
      ctx!.arc(
        centerX,
        centerY,
        radius - (isMobile ? 19 : isDesktop ? 19 : 23),
        toRad(startDeg - (isMobile ? 0.4 : 0.25)),
        toRad(endDeg)
      )
      ctx!.fillStyle = colorStyle
      ctx!.lineTo(centerX, centerY)
      ctx!.fill()
    }
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
        height: '100%',
        minWidth: '100%',
        minHeight: '100%',
        borderRadius: '100%',
        overflow: 'hidden'
      }}
    >
      <canvas
        id='canvas'
        width={isMobile ? 260 : isDesktop ? 310 : 424}
        height={isMobile ? 260 : isDesktop ? 310 : 424}
        style={{
          transform: isMobile ? 'scale(1.06)' : 'scale(1.07)',
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto'
        }}
      />
    </div>
  )
}

export default WheelCircle
