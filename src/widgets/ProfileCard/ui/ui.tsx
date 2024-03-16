import { UserAvatar } from "@/shared/ui/UserAvatar/ui/ui";
import { FC, useEffect, useState } from "react";
import { UserName } from "@/shared/ui/UserName/ui/ui";
import emptyAvatar from "@/public/media/player_icons/emptyAvatar.svg";
import { UserAddress } from "@/shared/ui/UserAddress/ui/ui";
import styles from "./ui.module.scss";
import { ImageLeague } from "@/shared/ui/ImageLeague";
// import { useAccount } from "wagmi";
import * as api from "@/shared/api";
// TODO: address - you can get it from @habdevs
//  the store and see how it is used in the Profile component

export interface ProfileCardProps {
  id?: string | number;
  nickName?: string;
}
export const ProfileCard: FC<ProfileCardProps> = (props) => {
  // const { address, isConnecting, isDisconnected } = useAccount();

  // const [nickname, setNickname] = useState<string | null>(null);

  // useEffect(() => {
  //   async function run() {
  //     const username = await api.getUsernameFx({
  //       address: props.address as string,
  //     });
  //     setNickname((username.body as api.T_Nickname).nickname);
  //   }
  //   run();
  // }, []);

  if (props.nickName) {
    return (
      <div className={styles.user_wrapper}>
        <div className={styles.card}>
          <UserAvatar avatarUrl={emptyAvatar} address={props.nickName} />
          <div className={styles.user}>
            <UserName
              userName={props.nickName}
              // editable={props.nickName.toLowerCase() == address?.toLowerCase()}
              editable
              address={props.nickName}
            />
            <UserAddress address={props.nickName} />
          </div>
        </div>
        <ImageLeague />
      </div>
    );
  }
};
