import React, {FC} from "react";
import Image from 'next/image'
import bronzeLeague from '@/public/media/player_icons/bronzeLeague.png'
import styles from './ui.module.scss'

export const ImageLeague: FC<{}> = () => {
  return (
    <div className={styles.image}>
      <div className={styles.imageWrapper}>
        <Image src={bronzeLeague} alt={'ImageLeague'} width={147} height={147}
               objectFit="cover"/>
      </div>
      <div className={styles.blurBackground}></div>
      <span className={styles.title}>bronze league</span>
    </div>
  )
}