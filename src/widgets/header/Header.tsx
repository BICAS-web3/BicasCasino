import { FC, useEffect } from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import GKemblem1 from '@/public/media/brand_images/GKemblem1.png';
import GKemblem2 from '@/public/media/brand_images/GKemblem2.png';
import GKemblem3 from '@/public/media/brand_images/GKemblem3.png';
import GKemblem4 from '@/public/media/brand_images/GKemblem4.png';
import AccountIcon from '@/public/media/player_icons/playerIcon1.png';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/session';
import FacebookEmblem from '@/public/media/social_media/facebook.svg';
import TwitterEmblem from '@/public/media/social_media/twitter.svg';
import * as Api from '@/shared/api';
import { web3 } from '@/entities/web3/index';

function RandomLogo() {
    const rnd = Math.floor(Math.random() * 4);

    switch (rnd) {
        case 0: {
            return (<Image
                src={GKemblem1}
                alt=""
                width={50}
                height={50} />)
        }
        case 1: {
            return (<Image
                src={GKemblem2}
                alt=""
                width={50}
                height={50} />)
        }
        case 2: {
            return (<Image
                src={GKemblem3}
                alt=""
                width={50}
                height={50} />)
        }
        case 3: {
            return (<Image
                src={GKemblem4}
                alt=""
                width={50}
                height={50} />)
        }
    }

}

interface EmblemProps { text: string };

const Emblem: FC<EmblemProps> = props => {
    return (<div className={s.emblem}>
        <RandomLogo />
        <div className={s.emblem_text}>
            {props.text}
        </div>
    </div>);
}

interface ButtonProps { text: string, url: string, isActive: boolean }

const Button: FC<ButtonProps> = props => {
    return (
        <a className={props.isActive ? s.button_active : s.button} href={props.url}>
            <div>
                {props.text}
            </div >
        </a>
    )
}

interface ButtonsProps { };

const Buttons: FC<ButtonsProps> = props => {

    const [currentPage, setCurrentPage] = useUnit([
        sessionModel.$currentPage,
        sessionModel.setCurrentPage
    ]);

    useEffect(() => {
        const pathname = window.location.pathname;
        setCurrentPage(pathname);
    })

    return (<div className={s.buttons}>
        <Button text="Home" url="" isActive={currentPage === '/'} />
        <Button text="Games" url="" isActive={currentPage === '/games'} />
        <Button text="LeaderBoard" url="" isActive={currentPage === '/leaderboard'} />
    </div>)
}


interface ConnectWalletProps { wallet_connection_function: any };

const ConnectWallet: FC<ConnectWalletProps> = props => {
    // const [logIn] = useUnit([
    //     sessionModel.logIn
    // ]);
    return (<div className={s.connect_wallet_box}>
        {/* <div className={s.social_networks}>
            <Image
                src={FacebookEmblem}
                alt=""
                width={32}
                height={32} />
            <Image
                src={TwitterEmblem}
                alt=""
                width={32}
                height={32} />
        </div> */}
        <div className={s.connect_wallet_button} onClick={props.wallet_connection_function}>
            Connect Wallet {'>'}
        </div>
    </div>)
}

interface AccountProps { name: string };

const Account: FC<AccountProps> = props => {
    return (<>
        <div className={s.account_box}>
            <Image
                src={AccountIcon}
                alt=""
                width={40}
                height={40} />
            <div className={s.account_name}>
                {props.name}
            </div>
        </div>
    </>)
}



export interface HeaderProps { }

export const Header: FC<HeaderProps> = props => {

    const [currentWalletAddress, currentNickName, logIn, logOut] = useUnit([
        sessionModel.$currentWalletAddress,
        sessionModel.$currentNickname,
        sessionModel.logIn,
        sessionModel.logOut
    ]);

    const ethereum = web3.MMSDK.getProvider();

    useEffect(() => {
        checkMetamaskConnection();
    }, [])

    const checkMetamaskConnection = async () => {
        await ethereum
            .request({ method: 'eth_requestAccounts' }).catch((err) => {
                console.error(err);
            });
        await ethereum.request({ method: 'eth_accounts' }).then(accountChangeHandler).catch((err) => {
            console.error(err);
        });
    }

    const accountChangeHandler = (accounts: any) => {
        if (accounts.length) {
            logIn({ address: accounts[0] });
        } else {
            logOut();
        }
    }

    ethereum.on('accountsChanged', accountChangeHandler);

    const nickname = currentNickName;

    useEffect(() => {
        console.log(nickname);
    }, [])

    return (<>
        <div className={s.header}>
            <Emblem text="GREEK KEEPERS" />
            <Buttons />
            <div className={s.connect_account_box}>
                {currentWalletAddress == null ?
                    <ConnectWallet wallet_connection_function={checkMetamaskConnection} /> : <Account name={currentNickName as string} />
                }
            </div>
        </div>
    </>);
}