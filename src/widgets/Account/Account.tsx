import Image from "next/image";
import { FC, useState } from "react";
import s from "./styles.module.scss";
import Ledger from "@/public/media/select_wallet/Ledger.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import Info from "@/public/media/select_wallet/Info.svg";
import Trust_wallet from "@/public/media/select_wallet/Trust_wallet.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import Close from "@/public/media/select_wallet/Close.svg";
import Avatar from "@/public/media/account_icons/Avatar.png";
import ProfileIcon from "@/public/media/account_icons/ProfileIcon.svg";
// import { ConnectIcon, CopyIcon } from '@/shared/SVGs';
//import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@/shared/SVGs";
import ExitIcon from "@/public/media/account_icons/ExitIcon.svg";
import ExplorerIcon from "@/public/media/account_icons/ExplorerIcon.svg";
import * as HeaderAccModel from "@/widgets/Account/model";
import { useUnit } from "effector-react";
import * as BlurModel from "@/widgets/Blur/model";
import { useDisconnect } from 'wagmi'
import { CopyToClipboardButton } from "@/shared/ui/CopyToClipboardButton";

export enum Ewallet {
  Ledger = "Ledger",
  Coinbase = "Coinbase",
  Trust_wallet = "Trust Wallet",
  WalletConnect = "WalletConnect",
}

export interface AccountElementProps {
  icon: string;
  name: string;
  onClick: (() => void) | undefined;
}
const AccountElement: FC<AccountElementProps> = props => {
  return (
    <button className={s.accountElement} onClick={props.onClick}>
      <Image src={props.icon} alt={""} />
      <div className={s.text_icon}>{props.name}</div>
    </button>
  );
};

// export interface WalletProps{ icon: string; wallet: Ewallet; isConnected?: boolean}
// export interface WalletProps{ icon: string; wallet: Ewallet}
// const Wallet: FC<WalletProps>  = props => {
//     return(<button className={s.wallet}>
//             <Image
//                     src={props.icon}
//                     alt={''}
//             />
//             <div className={s.wallet_text}>{props.wallet}</div>
//             {/* { props.isConnected === true && <ConnectIcon /> } */}
//         </button>
//     );
// }

export interface AccountProps {
  address: string,
  nickname: string | null
}
export const Account: FC<AccountProps> = props => {
  const { disconnect } = useDisconnect();
  const truncatedAddress = `${props.address.slice(0, 7)}...${props.address.slice(36, 42)}`;
  // const [copied, setCopied] = useState(false);

  const [closeHeaderAccount, setBlur] = useUnit([
    HeaderAccModel.Close,
    BlurModel.setBlur,
  ]);

  const handleHeaderAccClose = () => {
    setBlur(false);
    closeHeaderAccount();
  };

  return (
    <div className={s.account_container}>
      <div className={s.account}>
        <div className={s.main_text}>Account</div>
        <button className={s.btn_close} onClick={handleHeaderAccClose}>
          <Image
            src={Close}
            alt={""}
            width={17}
            height={17}
            className={s.close_icon}
          />
        </button>
      </div>
      <div className={s.line}></div>
      <div className={s.profile}>
        <Image src={Avatar} alt={""} className={s.avatar_icon} />
        <div className={s.profile_info}>
          <div className={s.profile_nickname}>{props.nickname ? props.nickname : truncatedAddress}</div>
          <div className={s.profile_address}>
            <div className={s.profile_address}>{truncatedAddress}</div>
            <div className={s.btn_copy}>
              <CopyToClipboardButton textToCopy={props.address} />
            </div>
          </div>
        </div>
      </div>
      <div className={s.account_item}>
        {/* <Wallet wallet={Ewallet.Coinbase} icon={Coinbase} isConnected/> */}
        {/* <Wallet wallet={Ewallet.Coinbase} icon={Coinbase} /> */}
        <AccountElement name="Profile" icon={ProfileIcon} onClick={() => { window.location.assign(`/test/account/${props.address.toLowerCase()}`) }} />
        <AccountElement name="Explorer" icon={ExplorerIcon} onClick={undefined} />
        <AccountElement name="Disconnect" icon={ExitIcon} onClick={() => disconnect()} />
        {/* <AccountElement name="Explorer" icon={Explorer}/>
        <AccountElement name="Disconnect" icon={Exit}/> */}
      </div>
      <div className={s.ellipse}></div>
    </div>
  );
};
