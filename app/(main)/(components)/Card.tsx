'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

type Props = {}

const Card = (props: Props) => {
  const [counter, setCounter] = useState<number>(0)
  return (
    <div className='flex flex-col h-max w-max px-12 py-5 bg-slate-600 rounded-md gap-5'>
      <h2 className='text-5xl'>Card</h2>
      <div className='flex gap-4 items-center'>
        <span className='text-3xl'>{counter}</span>
        <Button
          size='lg'
          variant='default'
          onClick={() => setCounter(old => old - 1)}
        >
          -
        </Button>
        <Button
          size='lg'
          variant='default'
          onClick={() => setCounter(old => old + 1)}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default Card
