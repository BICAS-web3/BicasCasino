'use client'
import { FC } from 'react'

import { LeaderBoard as LeaderBoardTable } from '@/components/custom/leaderboard/LeaderBoard'
// import { TotalBet } from '@/components/custom/leaderBoardTotal'
import Footer from '@/components/custom/footer'
import UserBoard from '@/components/custom/leaderBoardTotal/UserBoard'
interface ProfileProps {}

const LeaderBoard: FC<ProfileProps> = () => {
  return (
    <>
      <div className='flex flex-col px-0 sm:px-10 py-2 sm:py-5 !pb-0 mx-auto max-w-full overflow-hidden w-full h-full'>
        <UserBoard />
        <LeaderBoardTable />
      </div>{' '}
      <div className='w-full px-0 sm:px-[2.5rem] mt-5 sm:mt-4'>
        <Footer />
      </div>
    </>
  )
}

export default LeaderBoard
