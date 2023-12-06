import s from './styles.module.scss'
import {FC, useState} from 'react'

interface ManualAutoWagerProps {}

export const ManualAutoWager:FC<ManualAutoWagerProps> = () => {
    const [activePlacingType, setActivePlacingType] = useState('manual')

    return (
        <div className={s.manual_auto_block}>
            <button onClick={() => setActivePlacingType('manual')} className={`${s.manual_auto_block_item} ${activePlacingType === 'manual' && s.active}`}>manual</button>
            <button onClick={() => setActivePlacingType('auto')} className={`${s.manual_auto_block_item} ${activePlacingType === 'auto' && s.active}`}>auto</button>
        </div>
    )
}