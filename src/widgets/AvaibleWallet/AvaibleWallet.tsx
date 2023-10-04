import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import Ledger from "@/public/media/select_wallet/Ledger.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import Info from "@/public/media/select_wallet/Info.svg";
import Trust_wallet from "@/public/media/select_wallet/Trust_wallet.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import Close from "@/public/media/select_wallet/Close.svg";
import { InfoIcon } from "@/shared/SVGs";

export interface WalletProps {
	icon: string;
	name: string;
}
const Wallet: FC<WalletProps> = (props) => {
	return (
		<div className={s.select_wallet_item}>
			<Image src={props.icon} alt={""} />
			<div className={s.text_icon}>{props.name}</div>
		</div>
	);
};

export interface AvaibleWalletProps {
	hideAvaibleWallet: () => void;
	walletVisibility: boolean;
	setWalletVisibility: (value: boolean) => void;
	popupRef: React.RefObject<HTMLDivElement>;
	buttonRef: React.RefObject<HTMLDivElement>
}

export const AvaibleWallet: FC<AvaibleWalletProps> = (props) => {
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (props.walletVisibility && e.target instanceof Node) {
				if ((!props.popupRef.current || !props.popupRef.current.contains(e.target)) && (!props.buttonRef.current || !props.buttonRef.current.contains(e.target))) {
					props.setWalletVisibility(true); // Изменяем состояние в родительском компоненте
					props.hideAvaibleWallet();
				}
			}
		};
		if (props.walletVisibility) {
			document.addEventListener('click', handleOutsideClick);
		} else {
			document.removeEventListener('click', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [props.walletVisibility, props.setWalletVisibility]);

	return (
		<div className={s.avaibleWallet_container} ref={props.popupRef}>
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
				<Wallet name="Ledger" icon={Ledger} />
				<Wallet name="Trust Wallet" icon={Trust_wallet} />
				<Wallet name="Coinbase" icon={Coinbase} />
				<Wallet name="WalletConnect" icon={WalletConnect} />
			</div>
			<div className={s.info}>
				<a
					href="https://www.freecodecamp.org/"
					target="_blank"
					rel="noopener noreferrer"
					className={s.text_info}
				>
					I don’t have a wallet
				</a>
				<InfoIcon />
			</div>
		</div>
	);
};
