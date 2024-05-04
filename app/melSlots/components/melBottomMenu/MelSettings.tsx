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
        <div className='flex flex-col gap-[10px] items-center'>
            <SettingsIco onClick={() => setSettings(true)} className='cursor-pointer' />
            <SoundIco className='cursor-pointer' />
        </div>
    )
}