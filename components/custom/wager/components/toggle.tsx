'use client'
import { FC } from 'react'
import BottomSelector from '../../bottomSelector'

interface IToggle {
  bjVariants: any
  setCryptoInputValue: (el: string) => void
  setCryptoValue: (el: string | number) => void
  setCurrencyInputValue: any
  cryptoInputValue: any
  exchangeRate: number
  bjVariantsList: any[]
}

const Toggle: FC<IToggle> = ({
  bjVariants,
  setCryptoInputValue,
  setCryptoValue,
  setCurrencyInputValue,
  cryptoInputValue,
  exchangeRate,
  bjVariantsList
}) => {
  if (!bjVariants) {
    return (
      <BottomSelector
        data={[5, 7.5, 10, 12.5, 15]}
        onClick={cNumber => {
          if (typeof cNumber === 'number') {
            const currency = Number((cNumber * exchangeRate).toFixed(7))
            setCurrencyInputValue(currency.toString())
            setCryptoValue(cNumber)
            setCryptoInputValue(Number(cNumber.toFixed(7)).toString())
            const newCurrencyValue = cNumber * exchangeRate
            setCurrencyInputValue(
              Number(newCurrencyValue.toFixed(7)).toString()
            )
          }
        }}
      />
    )
  } else {
    return (
      <BottomSelector
        data={bjVariantsList}
        onClick={item => {
          if (typeof item === 'object' && item !== null && 'title' in item) {
            // Handle object type with 'title' property
            const { title } = item
            const minVal = 1
            const maxVal = 100
            if (title === 'Min') {
              setCryptoInputValue(minVal.toString())
            } else if (title === 'Max') {
              setCryptoInputValue(maxVal.toString())
            } else if (cryptoInputValue.length && title === '/2') {
              setCryptoInputValue((Number(cryptoInputValue) / 2).toString())
            } else if (cryptoInputValue.length && title === 'x2') {
              setCryptoInputValue((Number(cryptoInputValue) * 2).toString())
            }
          }
        }}
      />
    )
  }
}

export default Toggle
