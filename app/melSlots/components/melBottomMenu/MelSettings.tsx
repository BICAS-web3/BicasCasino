import {FC} from 'react'
import SettingsIco from "@/public/images/mell/settingsIco.svg"
import SoundIco from "@/public/images/mell/soundIco.svg"
import { useUnit } from 'effector-react'
import { MellM } from '@/states'

interface MelSettingsProps {}

export const MelSettings:FC<MelSettingsProps> = () => {

    const [setSettings] = useUnit([
        MellM.setBetSettingsVisibility,
    ])

    return (
        <div className='flex-col gap-[10px] items-center'>
            <SettingsIco onClick={() => setSettings(true)} className='cursor-pointer w-[30px] h-[30px] sm:w-[25px] sm:h-[25px]' />
            <SoundIco className='cursor-pointer hidden sm:block' />
        </div>
    )
}