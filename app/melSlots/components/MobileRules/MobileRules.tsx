import {FC} from 'react'
import { RulesBlock } from '../MelRules/components/RulesBlock'
import { Fall } from '../Fall/Fall'
import { FreeSpins } from '../FreeSpins/FreeSpins'
import { Rules } from '../Rules/Rules'
import { Htp } from '../Htp/Htp'
import { SettMenu } from '../SettMenu/SettMenu'
import { Autoplay } from '../Autoplay/Autoplay'
import { useUnit } from 'effector-react'
import { MellM } from '@/states'
import { X } from 'lucide-react'

interface MobileRulesProps {}

export const MobileRules:FC<MobileRulesProps> = () => {

    const [visibility, setVisibility] = useUnit([
        MellM.$mobileRules,
        MellM.setMobileRules
    ])

    return (
        <div className={`fixed z-[200] bg-[#000] p-[10px] h-[80%] top-[50%] translate-y-[-50%] w-full left-0' ${visibility ? 'opacity-1 visible' : 'opacity-0 invisible'}`}>
            <X className='absolute top-[20px] right-[20px]' onClick={() => setVisibility(false)} ></X>
            <div className='h-full overflow-auto flex flex-col gap-[20px] overflow-x-hidden'>
                <RulesBlock />
                <Fall />
                <FreeSpins />
                <Rules />
                <Htp />
                <SettMenu />
                <Autoplay />
            </div>
        </div>
    )
}