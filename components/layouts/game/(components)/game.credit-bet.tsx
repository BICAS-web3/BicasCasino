import { stringRemoveSpacing } from '@/lib/string'

const data = {
  titles: ['credit', 'bet'],
  values: [
    {
      value: 8181,
      currency: 'dc'
    },
    {
      value: 10,
      currency: 'dc'
    }
  ]
}

const GameCreditBet = () => {
  return (
    <div className='grid grid-cols-2 gap-2 min-w-[100px] w-fit'>
      <div className='flex flex-col gap-1'>
        {data.titles.map((item, index) => (
          <span
            key={`game-creditbet-title--${stringRemoveSpacing(item)}-${index}`}
            className='text-right block font-extrabold leading-4 uppercase text-[#7E7E7E] tracking-[4%] text-sm'
          >
            {item}
          </span>
        ))}
      </div>
      <div className='flex flex-col gap-1'>
        {data.values.map((item, index) => (
          <div
            key={`game-creditbet-values-${item.currency.toLocaleUpperCase()}-${index}`}
            className='flex flex-nowrap gap-1 items-center justify-start'
          >
            <span className='leading-4 text-[#7e7e7e] tracking-[4%] text-sm font-medium nowrap'>
              {item.value}
            </span>
            <span className='text-xs leading-3 uppercase'>{item.currency}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameCreditBet
