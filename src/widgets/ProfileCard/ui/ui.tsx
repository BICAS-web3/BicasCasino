import {UserAvatar} from "@/shared/ui/UserAvatar/ui/ui";
import {FC} from "react";
import {UserName} from "@/shared/ui/UserName/ui/ui";
import emptyAvatar from '@/public/media/player_icons/emptyAvatar.svg'
import {UserAddress} from "@/shared/ui/UserAddress/ui/ui";
import styles from './ui.module.scss'
import {ImageLeague} from "@/shared/ui/ImageLeague";
// TODO: address - you can get it from @habdevs
//  the store and see how it is used in the Profile component

export const ProfileCard: FC<{}> = () => {
  return (
    <div className={styles.card}>
      <UserAvatar avatarUrl={emptyAvatar}/>
      <div className={styles.user}>
        <UserName userName={'Athena'}/>
        <UserAddress address={'0xa51313ffab4c570b484a26bd5d869c2f48e34475'}/>
      </div>
      <ImageLeague />
    </div>
  )
}
