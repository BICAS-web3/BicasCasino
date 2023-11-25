import {FC} from 'react'
import s from './styles.module.scss'
import mailIco from '@/public/media/misc/mailFbIco.svg'
import Image from 'next/image'

interface FeedbackSectionProps {}

export const FeedbackSection:FC<FeedbackSectionProps> = () => {
    return (
        <div className={s.feedback_section_wrap}>
            <Image src={mailIco} alt="mail-ico" />
        </div>
    )
}