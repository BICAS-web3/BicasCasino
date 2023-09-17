import Image from 'next/image';
import { FC } from 'react';
import s from './styles.module.scss';
import Ledger from '@/public/media/select_wallet/Ledger.svg';
import Coinbase from '@/public/media/select_wallet/Coinbase.svg';
import Info from '@/public/media/select_wallet/Info.svg';
import Trust_wallet from '@/public/media/select_wallet/Trust_wallet.svg';
import WalletConnect from '@/public/media/select_wallet/WalletConnect.svg';
import Close from '@/public/media/select_wallet/Close.svg';

export interface AwaibleWalletProps{}
export const AwaibleWallet: FC<AwaibleWalletProps>  = props => {
   

    return(<div className={s.awaibleWallet_container}>

    <div className={s.awaibleWallet}>
        <div className={s.main_text}>
            Available Wallet
        </div>
        <button className={s.btn_close}>
            <Image
                src={Close}
                alt={''}
            />
        </button>
    </div>

    <div className={s.select_wallet}>
        <div className={s.select_wallet_item}>
            <Image
                src={Ledger}
                alt={''}
            />
            <div className={s.text_icon}>Ledger</div>
        </div>
        <div className={s.select_wallet_item}>
            <Image
                src={Trust_wallet}
                alt={''}
            />
            <div className={s.text_icon}>Trust Wallet</div>
        </div>
        <div className={s.select_wallet_item}>
            <Image
                src={Coinbase}
                alt={''}
            />
            <div className={s.text_icon}>Coinbase</div>
        </div>
        <div className={s.select_wallet_item}>
            <Image
                src={WalletConnect}
                alt={''}
            />
            <div className={s.text_icon}>WalletConnect</div>
        </div>
    </div>
    
    <div className={s.info}>
        <div className={s.text_info}>
            I don’t have a wallet
        </div>
        
        <Image
            src={Info}
            alt={''}
            className={s.icon_info}
        />
        
    </div>

    </div>);
}