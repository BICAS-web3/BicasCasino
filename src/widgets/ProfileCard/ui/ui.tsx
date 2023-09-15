import {UserAvatar} from "@/shared/ui/UserAvatar/ui/ui";
import {FC} from "react";
import {UserName} from "@/shared/ui/UserName/ui/ui";
import emptyAvatar from '@/public/media/player_icons/emptyAvatar.svg'
import {UserAddress} from "@/shared/ui/UserAddress/ui/ui";
import styles from './ui.module.scss'
import {ImageLeague} from "@/shared/ui/ImageLeague";

export const ProfileCard: FC<{}> = () => {
  return (
    <div className={styles.card}>
      <UserAvatar avatarUrl={emptyAvatar}/>
      <div className={styles.user}>
        <UserName userName={'Athena'}/>
        <UserAddress userAddress={'0xa51313ffab4c570b484a26bd5d869c2f48e34475'}/>
      </div>
      <ImageLeague />
    </div>
  )
}