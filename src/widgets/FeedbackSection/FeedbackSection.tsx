import { FC } from 'react'
import s from './styles.module.scss'
import mailIco from '@/public/media/misc/mailBgIco.webp'
import mailIcoMobile from '@/public/media/misc/mailBgMobile.webp'
import Image from 'next/image'

interface FeedbackSectionProps { }

export const FeedbackSection: FC<FeedbackSectionProps> = () => {
    return (
        <div className={s.feedback_section_wrap}>
            <div className={s.feedback_section_body}>
                <Image alt="bg-static" className={s.bg_image} src={mailIco} />
                <Image alt="bg-static-monile" className={s.bg_image_mobile} src={mailIcoMobile} />
                <div className={s.leftSide_block}>
                    <span className={s.feedback_section_title}>Feedback, Support and Bug Reports</span>
                    <p className={s.feedback_section_text} >If you have ant feedback, need support, or want to report bugs, please don’t hesitate to reach out to us on Email. We are always happy hear from our players and strive to improve the expirience for everyone.</p>
                </div>
                <button className={s.contactUs_btn} onClick={() => {
                    location.href = "https://t.me/GKSupportt";
                }} >Contact us</button>
            </div>
        </div>
    )
}