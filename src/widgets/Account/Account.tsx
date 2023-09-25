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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@/shared/SVGs";
import ExitIcon from "@/public/media/account_icons/ExitIcon.svg";
import ExplorerIcon from "@/public/media/account_icons/ExplorerIcon.svg";

export enum Ewallet {
  Ledger = "Ledger",
  Coinbase = "Coinbase",
  Trust_wallet = "Trust Wallet",
  WalletConnect = "WalletConnect",
}

export interface AccountElementProps {
  icon: string;
  name: string;
}
const AccountElement: FC<AccountElementProps> = (props) => {
  return (
    <button className={s.accountElement}>
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

export interface AccountProps {}
export const Account: FC<AccountProps> = (props) => {
  const value = "0xa51313...e34475";
  const [copied, setCopied] = useState(false);
  return (
    <div className={s.account_container}>
      <div className={s.account}>
        <div className={s.main_text}>Account</div>
        <button className={s.btn_close}>
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
          <div className={s.profile_nickname}>Athena</div>
          <div className={s.profile_address}>
            <div className={s.profile_address}>{value}</div>

            <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
              <button className={s.btn_close}>
                <CopyIcon />
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className={s.account_item}>
        {/* <Wallet wallet={Ewallet.Coinbase} icon={Coinbase} isConnected/> */}
        {/* <Wallet wallet={Ewallet.Coinbase} icon={Coinbase} /> */}
        <AccountElement name="Profile" icon={ProfileIcon} />
        <AccountElement name="Explorer" icon={ExplorerIcon} />
        <AccountElement name="Disconnect" icon={ExitIcon} />
        {/* <AccountElement name="Explorer" icon={Explorer}/>
        <AccountElement name="Disconnect" icon={Exit}/> */}
      </div>
    </div>
  );
};
