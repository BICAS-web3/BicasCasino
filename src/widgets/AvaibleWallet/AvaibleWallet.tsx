import Image from "next/image";
import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import Ledger from "@/public/media/select_wallet/Ledger.svg";
import Metamask from "@/public/media/select_wallet/metamask.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import Info from "@/public/media/select_wallet/Info.svg";
import Trust_wallet from "@/public/media/select_wallet/Trust_wallet.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import Close from "@/public/media/select_wallet/Close.svg";
import { InfoIcon } from "@/shared/SVGs";
import { useAccount, useConnect } from "wagmi";
import { SideBarModel } from "../SideBar";
import * as MainWallet from "./model";
import * as BlurModel from "@/widgets/Blur/model";
import { useUnit } from "effector-react";
import Link from "next/link";

export interface WalletProps {
  icon: string;
  name: string;
  connector: any;
}
const Wallet: FC<WalletProps> = (props) => {
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  const [isOpen, closeWallet, setBlur, isBlurActive] = useUnit([
    SideBarModel.$isOpen,
    //MainWallet.$isMainWalletOpen,
    MainWallet.Close,
    BlurModel.setBlur,
    BlurModel.$BlurActive,
  ]);

  useEffect(() => {
    if (isConnected && isBlurActive) {
      setBlur(false);
    }
  }, [isConnected]);

  return (
    <div
      className={s.select_wallet_item}
      onClick={() => {
        closeWallet();
        //setBlur(false);
        connect({ connector: props.connector });
      }}
    >
      <Image src={props.icon} alt={""} width={20} height={20} />
      <div className={s.text_icon}>{props.name}</div>
    </div>
  );
};

export interface AvaibleWalletProps {
  hideAvaibleWallet: () => void;
}
export const AvaibleWallet: FC<AvaibleWalletProps> = (props) => {
  const { connectors } = useConnect();
  return (
    <div className={s.avaibleWallet_container}>
      <div className={s.avaibleWallet}>
        <div className={s.main_text}>Available Wallet</div>
        <button className={s.btn_close} onClick={props.hideAvaibleWallet}>
          <Image
            src={Close}
            alt={""}
            width={17}
            height={17}
            className={s.close_icon}
          />
        </button>
      </div>
      <div className={s.connect_text}>Connect Wallet</div>
      <div className={s.select_wallet}>
        <Wallet name="Metamask" icon={Metamask} connector={connectors[0]} />
        <Wallet name="Injected" icon={Trust_wallet} connector={connectors[3]} />
        <Wallet name="Coinbase" icon={Coinbase} connector={connectors[1]} />
        <Wallet
          name="WalletConnect"
          icon={WalletConnect}
          connector={connectors[2]}
        />
      </div>
      <div className={s.info}>
        <Link
          href="https://www.freecodecamp.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={s.text_info}
        >
          I don’t have a wallet
        </Link>
        <InfoIcon />
      </div>
    </div>
  );
};
