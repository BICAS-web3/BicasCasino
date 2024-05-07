import {FC} from 'react'
import { RulesBlock } from '../MelRules/components/RulesBlock'
import { Fall } from '../Fall/Fall'
import { FreeSpins } from '../FreeSpins/FreeSpins'
import { Rules } from '../Rules/Rules'
import { Htp } from '../Htp/Htp'

interface MobileRulesProps {}

export const MobileRules:FC<MobileRulesProps> = () => {
    return (
        <div className='fixed z-[200] bg-[#000] p-[10px] h-[80%] top-[50%] translate-y-[-50%] w-full left-0'>
            <div className='h-full overflow-auto flex flex-col gap-[20px] overflow-x-hidden'>
                <RulesBlock />
                <Fall />
                <FreeSpins />
                <Rules />
                <Htp />
            </div>
        </div>
    )
}