import { FC, ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import GKemblem1 from '@/public/media/brand_images/GKemblem1.png';
import GKemblem2 from '@/public/media/brand_images/GKemblem2.png';
import GKemblem3 from '@/public/media/brand_images/GKemblem3.png';
import GKemblem4 from '@/public/media/brand_images/GKemblem4.png';
import AccountIcon from '@/public/media/player_icons/playerIcon1.png';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/session';
import { settingsModel } from '@/entities/settings';
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
        <Button text="Home" url="/" isActive={currentPage === '/'} />
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

export interface NetworkPickerProps { };
export const NetworkPicker: FC<NetworkPickerProps> = props => {
    const [currentWalletAddress,
        currentNetwork,
        pickNetwork,
        availableNetworks,
        availbaleRpcs] = useUnit([
            sessionModel.$currentWalletAddress,
            sessionModel.$currentNetwork,
            sessionModel.pickNetwork,
            settingsModel.$AvailableNetworks,
            settingsModel.$AvailableRpcs
        ]);

    const ethereum = web3.MMSDK.getProvider();

    let chains: ReactElement[] = [];
    for (let availableNetwork of availableNetworks.networks) {
        if (currentNetwork != null && availableNetwork.network_id == currentNetwork.network_id) {
            continue;
        }
        chains.push(<div className={s.network} onClick={async () => {
            const rpcs = await (await Api.getRpcsFx({ network_id: availableNetwork.network_id })).body as Api.T_Rpcs;
            const networkParams = {
                chainId: `0x${availableNetwork.network_id.toString(16)}`,
                chainName: availableNetwork.network_name,
                nativeCurrency: {
                    name: availableNetwork.currency_name,
                    symbol: availableNetwork.currency_symbol,
                    decimals: availableNetwork.decimals
                },
                rpcUrls: rpcs.rpcs.map((rpc) => rpc.url),
                blockExplorerUrls: null
            };
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkParams]
            }).then(() => {
                pickNetwork(availableNetwork);
            });
        }}>
            <Image
                src={`/static/media/networks/${availableNetwork.network_id}.svg`}
                alt=""
                width={28}
                height={28}
            />
            {availableNetwork.network_name}
        </div>);
    }

    return (<div className={s.network_picker_container}>
        <div className={`${s.network_picker} ${currentNetwork == null ? s.network_picker_unknown : ''}`}>
            {currentWalletAddress == null ? <></> : currentNetwork == null ?
                'Unknown Network' :
                <>
                    <Image
                        src={`/static/media/networks/${currentNetwork.network_id}.svg`}
                        alt=""
                        width={28}
                        height={28}
                    />
                    {currentNetwork.network_name}
                    <div className={s.network_picker_arrow}>
                        {'>'}
                    </div>

                </>}

        </div>
        <div className={s.networks_list}>
            {chains}
        </div>
    </div>);
}

export interface HeaderProps { }
export const Header: FC<HeaderProps> = props => {

    // session model
    const [currentWalletAddress, currentNickName, logIn, logOut, currentToken, pickToken] = useUnit([
        sessionModel.$currentWalletAddress,
        sessionModel.$currentNickname,
        sessionModel.logIn,
        sessionModel.logOut,
        sessionModel.$currentToken,
        sessionModel.pickToken
    ]);

    // global settings model
    const [queryAvailableNetworks] = useUnit([
        settingsModel.queryAvailableNetworks
    ]);

    const [
        currentNetwork,
        pickNetwork,
        availableNetworks,
        availbaleRpcs,
        setAvailableNetworks,
        setAvailableTokens,
        AvailableBlocksExplorers,
        setAvailableExplorers
    ] = useUnit([
        sessionModel.$currentNetwork,
        sessionModel.pickNetwork,
        settingsModel.$AvailableNetworks,
        settingsModel.$AvailableRpcs,
        settingsModel.setAvailableNetworks,
        settingsModel.setAvailableTokens,
        settingsModel.$AvailableBlocksExplorers,
        settingsModel.setAvailableExplorers
    ]);

    const ethereum = web3.MMSDK.getProvider();

    // setup
    useEffect(() => {

        const run = async () => {
            console.log('Getting account');
            await checkMetamaskConnection();

            await queryAllExplorers();

            queryAvailableNetworks();

            checkCurrentNetwork();
            console.log(currentWalletAddress);
        }
        run();
    }, []);

    const queryAllExplorers = async () => {
        const explorers = (await Api.getAllExplorers()).body as Api.T_BlockExplorers;

        console.log("Explorers");
        console.log(explorers);

        setAvailableExplorers(explorers);
    };

    const checkMetamaskConnection = async () => {
        await ethereum
            .request({ method: 'eth_requestAccounts' }).catch((err) => {
                console.error(err);
            });
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts != null) {
            accountChangeHandler(accounts);
        }
        return accounts;
    };

    const accountChangeHandler = (accounts: any) => {
        console.log(accounts);
        if (accounts.length) {
            console.log("logging in");
            logIn({ address: accounts[0] });
            console.log(`Logged in ${currentWalletAddress}`);
        } else {
            logOut();
        }
    }

    ethereum.on('accountsChanged', accountChangeHandler);

    const networkChangeHandler = async (network_id: any, available_networks: Api.T_Networks | undefined) => {
        const network_id_number = parseInt(network_id, 16);

        const network = available_networks != undefined ?
            (available_networks as unknown as Api.T_Networks).networks.find((network) => network.network_id == network_id_number)
            : availableNetworks.networks.find((network) => network.network_id == network_id_number);

        if (network != undefined) {
            pickNetwork(network);
            var available_tokens = (await Api.getTokens({ network_id: network.network_id })).body as Api.T_Tokens;
            console.log(`Tokens: ${JSON.stringify(available_tokens)}`);
            setAvailableTokens(available_tokens);
            pickToken(available_tokens.tokens[0]);
        } else {
            pickNetwork(null);
            setAvailableTokens({ tokens: [] });
            pickToken(null);
        }
    }

    const checkCurrentNetwork = async () => {
        console.log(`Wallet: ${currentWalletAddress}`);
        var available_networks = (await Api.getNetworksFx()).body as Api.T_Networks;
        setAvailableNetworks(available_networks);
        console.log('Networks');
        console.log(available_networks);
        await ethereum.request({ method: 'eth_chainId' }).then((network_id) => networkChangeHandler(network_id, available_networks)).catch((err) => {
            console.error(err);
        });

    }
    ethereum.on('chainChanged', (network_id) => networkChangeHandler(network_id, undefined));

    return (<>
        <div className={s.header}>
            <a href="/" style={{ textDecoration: "none" }}>
                <Emblem text="GREEK KEEPERS" />
            </a>
            <Buttons />
            <div className={s.settings_box}>
                <NetworkPicker />
                <div className={s.connect_account_box}>
                    {currentWalletAddress == null ?
                        <ConnectWallet wallet_connection_function={checkMetamaskConnection} /> : <Account name={currentNickName as string} />
                    }
                </div>
            </div>
        </div>
    </>);
}