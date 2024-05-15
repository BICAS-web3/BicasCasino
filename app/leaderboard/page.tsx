'use client'
import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { LeaderBoard as LeaderBoardTable } from '@/components/custom/leaderboard/LeaderBoard'
// import { TotalBet } from '@/components/custom/leaderBoardTotal'
import UserBoard from '@/components/custom/leaderBoardTotal/UserBoard'
interface ProfileProps {}

const LeaderBoard: FC<ProfileProps> = () => {
  const [tab, setTab] = useState('LeaderBoard')
  const { t } = useTranslation()
  return (
    <div className='flex flex-col px-0 sm:px-10 py-2 sm:py-5 !pb-0 mx-auto max-w-full overflow-hidden w-full h-full'>
      <UserBoard />
      <LeaderBoardTable />
    </div>
  )
}

export default LeaderBoard
