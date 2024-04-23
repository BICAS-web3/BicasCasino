import {FC} from 'react'
import { games_banner } from './data'
import GameSlideItem from './games.slide-item'

interface MobileListProps {}

export const MobileList:FC<MobileListProps> = () => {
    return (
        <div className='grid grid-cols-2 mt-[20px] p-[16px] gap-[16px] sm:hidden game_mob_list'>
            {games_banner.map((item, index) => (
                <GameSlideItem key={index} title={item.title} image={item.image} link={item.link} />
            ))}
        </div>
    )
}