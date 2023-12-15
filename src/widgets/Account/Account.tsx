import Image from "next/image";
import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Ledger from "@/public/media/select_wallet/Ledger.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import Info from "@/public/media/select_wallet/Info.svg";
import Trust_wallet from "@/public/media/select_wallet/Trust_wallet.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import Close from "@/public/media/select_wallet/Close.svg";
import Avatar from "@/public/media/account_icons/Avatar.webp";
import ProfileIcon from "@/public/media/account_icons/ProfileIcon.svg";
// import { ConnectIcon, CopyIcon } from '@/shared/SVGs';
//import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "@/shared/SVGs";
import ExitIcon from "@/public/media/account_icons/ExitIcon.svg";
import ExplorerIcon from "@/public/media/account_icons/ExplorerIcon.svg";
import * as HeaderAccModel from "@/widgets/Account/model";
import { useUnit } from "effector-react";
import * as BlurModel from "@/widgets/Blur/model";
import { useDisconnect } from "wagmi";
import { CopyToClipboardButton } from "@/shared/ui/CopyToClipboardButton";
import coinbaseIco from "@/public/media/networks/coinbaseIco.svg";
import networkConnectIco from "@/public/media/networks/networkConnectIco.svg";
import closeIco from "@/public/media/misc/closeAccIco.webp";
import { BlockiesAva } from "../BlockiesAva/BlockiesAva";
import { useAccount } from "wagmi";

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
const AccountElement: FC<AccountElementProps> = (props) => {
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
  address: string;
  nickname: string | null;
  toggle?: any;
}
export const Account: FC<AccountProps> = (props) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const truncatedAddress = `${props.address.slice(
    0,
    7
  )}...${props.address.slice(36, 42)}`;
  // const [copied, setCopied] = useState(false);
  const [avaSize, setAvaSize] = useState("50");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (screenWidth < 650) {
      setAvaSize("50");
    } else {
      setAvaSize("50");
    }
  }, [screenWidth]);

  const [closeHeaderAccount, setBlur, accVisibility] = useUnit([
    HeaderAccModel.Close,
    BlurModel.setBlur,
    HeaderAccModel.$isHeaderAccountOpened,
  ]);

  const handleHeaderAccClose = () => {
    document.documentElement.style.overflow = "visible";
    closeHeaderAccount();
  };

  return (
    <div className={s.account_container}>
      <Image
        onClick={() => props.toggle()}
        src={closeIco}
        className={s.hidden_desk_close_ico}
        alt="close-ico"
      />
      <div className={s.profile}>
        <div className={s.profile_ava_wrap}>
          <BlockiesAva size={avaSize} address={address} />
        </div>
        <div className={s.profile_info}>
          <div className={s.profile_nickname}>
            {props.nickname &&
              props.nickname.toLowerCase() != props.address.toLowerCase()
              ? props.nickname
              : truncatedAddress}
          </div>
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
        <AccountElement
          name="Profile"
          icon={ProfileIcon}
          onClick={() => {
            window.location.assign(`/account/${props.address.toLowerCase()}`);
          }}
        />
        <div className={`${s.accountElement} ${s.network_elem}`}>
          <div className={s.network_left_group}>
            <Image src={coinbaseIco} alt="network_ico" />
            <span className={s.text_icon}>Coinbase</span>
          </div>
          <Image src={networkConnectIco} alt="connection_ico" />
        </div>
        <AccountElement
          name="Explorer"
          icon={ExplorerIcon}
          onClick={undefined}
        />
        <AccountElement
          name="Disconnect"
          icon={ExitIcon}
          onClick={() => disconnect()}
        />
        {/* <AccountElement name="Explorer" icon={Explorer}/>
        <AccountElement name="Disconnect" icon={Exit}/> */}
      </div>
      <div className={s.ellipse}></div>
    </div>
  );
};
