import { UserAvatar } from "@/shared/ui/UserAvatar/ui/ui";
import { FC } from "react";
import { UserName } from "@/shared/ui/UserName/ui/ui";
import emptyAvatar from '@/public/media/player_icons/emptyAvatar.svg'
import { UserAddress } from "@/shared/ui/UserAddress/ui/ui";
import styles from './ui.module.scss'
import { ImageLeague } from "@/shared/ui/ImageLeague";

export interface ProfileCardProps {
  address: string
};
export const ProfileCard: FC<ProfileCardProps> = props => {
  return (
    <div className={styles.card}>
      <UserAvatar avatarUrl={emptyAvatar} />
      <div className={styles.user}>
        <UserName userName={'Athena'} />
        <UserAddress address={props.address} />
      </div>
      <ImageLeague />
    </div>
  )
}
