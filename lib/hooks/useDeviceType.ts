import { useEffect, useState } from 'react'

type DeviceType = 'main' | 'bigTablet' | 'laptop' | 'tablet' | 'phone'

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType | undefined>(
    undefined
  )

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width > 1280) {
        setDeviceType('main')
      } else if (width <= 996 && width > 768) {
        setDeviceType('bigTablet')
      } else if (width <= 1280 && width > 996) {
        setDeviceType('laptop')
      } else if (width <= 768 && width > 320) {
        setDeviceType('tablet')
      } else if (width <= 320) {
        setDeviceType('phone')
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return deviceType
}
