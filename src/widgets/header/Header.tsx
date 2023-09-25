import { FC, ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import s from './styles.module.scss';
import AccountIcon from '@/public/media/player_icons/playerIcon1.png';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/session';
import { settingsModel } from '@/entities/settings';
import FacebookEmblem from '@/public/media/social_media/facebook.svg';
import TwitterEmblem from '@/public/media/social_media/twitter.svg';
import * as Api from '@/shared/api';
import { web3 } from '@/entities/web3/index';
import {BigNumber, ethers} from 'ethers';
import Web3 from 'web3';
import { ABI as IERC20 } from '@/shared/contracts/ERC20';
import HeaderLogo from '@/public/media/brand_images/HeaderLogo.svg';
import HeaderBrandText from '@/public/media/brand_images/HeaderBrandText.svg';
import Burger from '@/public/media/misc/burger.svg';
import ChatIcon from '@/public/media/misc/chatIcon.svg';
import BellIcon from '@/public/media/misc/bellIcon.svg';
import { SideBarModel } from '@/widgets/SideBar';
import * as BlurModel from '@/widgets/Blur/model'
import { CoinButton, DiceButton, RPCButton, PokerButton, GamesIcon, ArrowIcon, SupportIcon } from '@/shared/SVGs';
import {NetworkSelect} from "@/widgets/NetworkSelect/NetworkSelect";
import {AvaibleWallet} from "@/widgets/AvaibleWallet";
import * as SidebarM from '@/widgets/SideBar/model'
import * as MainWallet from '../../pages/model'
import {Open} from "@/widgets/header/model";
import closeIco from '@/public/media/headerIcons/Close.svg'

interface EmblemProps { };
const Emblem: FC<EmblemProps> = props => {
    return (<div className={s.emblem}>
        <Image
            src={HeaderLogo}
            alt={''}
            width={36}
            height={46.07}
        />
        <Image
            src={HeaderBrandText}
            alt={''}
            width={54.71}
            height={23.71}
        />
    </div>)
}

interface LeftMenuProps { };
const LeftMenu: FC<LeftMenuProps> = props => {
    const [
        flipOpen,
        isOpen,
    ] = useUnit([
        SideBarModel.flipOpen,
        SideBarModel.$isOpen,
    ]);
    return (<div className={s.left_menu}>
        <div className={s.burger} onClick={() => {
            flipOpen();
        }}>
            <Image
                src={Burger}
                alt={''}
                width={22.5}
                height={15}
            />

        </div>
        <Emblem />
    </div>);
}

interface LinksProps { };
const Links: FC<LinksProps> = props => {
    return (<div className={s.links}>
        <div className={`${s.link}`}>
            NFT Market
        </div>
        {/* <div className={`${s.link} ${s.link_active}`}>
            LeaderBoard
        </div> */}
    </div>)
}

interface ConnectWalletButtonProps { };
const ConnectWalletButton: FC<ConnectWalletButtonProps> = props => {
    const [
        isOpen,
        isMainWalletOpen,
        setBlur,
    ] = useUnit([
        SideBarModel.$isOpen,
        MainWallet.$isMainWalletOpen,
        BlurModel.setBlur,
    ]);

    const [walletVisibility, setWalletVisibility] = useState(false)

    const handleConnectWalletBtn = () => {
        if(isMainWalletOpen) {
            return null
        }

        if(!walletVisibility) {
            setWalletVisibility(true)
            setBlur(true)
        } else {
            setWalletVisibility(false)
            setBlur(false)
        }
    }

    // useEffect(() => {
    //     walletVisibility ? (document.documentElement.style.overflow = 'hidden') :
    //         (document.documentElement.style.overflow = 'visible')
    // }, [walletVisibility])

    const hideAvaibleWallet = () => {
        setWalletVisibility(false)
        setBlur(false)
    }

    return (
        <div className={s.connect_wallet_button_wrap}>
            <div className={s.connect_wallet_button} onClick={handleConnectWalletBtn} >
                Connect Wallet
            </div>
            <div className={`${s.header_avaibleWallet_wrap} ${walletVisibility && s.avaibleWallet_visible}`}>
                <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
            </div>
        </div>
    )
}

interface RightMenuProps { };
const RightMenu: FC<RightMenuProps> = props => {
    const [screenWidth, setScreenWidth] = useState()

    const condition = true

    const [
        isOpen,
        close
    ] = useUnit([
        SideBarModel.$isOpen,
        SideBarModel.Close
    ])

    const closeSidebar = () => {
        close()
        document.documentElement.style.overflow = 'visible'
    }

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])

    return (<div className={s.right_menu}>
        <div className={s.button}>
            <Image
                src={BellIcon}
                alt={''}
                // width={24}
                // height={25}
                className={s.icon}
            />
            <div className={s.new_notification}>
            </div>
        </div>
        <div className={s.button}>
            <Image
                src={ChatIcon}
                alt={''}
                // width={24}
                // height={25}
                className={s.icon}
            />
        </div>
        {
            isOpen && screenWidth <=650 ? (
                <button className={s.header_mobile_closeSidebar_btn} onClick={closeSidebar} >
                    <Image src={closeIco} />
                </button>
            ) : (
                <div className={s.header_mobile_right_wrap}>
                    {
                        condition ? (
                            <div className={s.header_profile_ico_wrap}>
                                <span className={s.header_profile_ico_title}>А</span>
                            </div>
                        ) : (
                            <ConnectWalletButton />
                        )
                    }
                </div>
            )
        }
    </div>)
}

export interface NetworkPickerProps { };
export const NetworkPicker: FC<NetworkPickerProps> = props => {
    const [currentWalletAddress,
        currentNetwork,
        pickNetwork,
        availableNetworks,
        availbaleRpcs,
        web3Provider
    ] = useUnit([
        sessionModel.$currentWalletAddress,
        sessionModel.$currentNetwork,
        sessionModel.pickNetwork,
        settingsModel.$AvailableNetworks,
        settingsModel.$AvailableRpcs,
        web3.web3Provider
    ]);

    const ethereum = web3Provider?.provider;

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
            // await ethereum?.getNetwork()({
            //     method: 'wallet_addEthereumChain',
            //     params: [networkParams]
            // }).then(() => {
            //     pickNetwork(availableNetwork);
            // });
            if (ethereum != null && ethereum.request != null) {
                ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [networkParams]
                }).then(() => {
                    pickNetwork(availableNetwork);
                });
            }
        }
        }>
            <Image
                src={`/static/media/networks/${availableNetwork.network_id}.svg`}
                alt=""
                width={28}
                height={28}
            />
            {availableNetwork.network_name}
        </div >);
    }

    return (<div className={s.network_picker_container} style={currentWalletAddress ? {} : { display: 'none' }}>
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

interface BottomMenuProps { }
const BottomMenu: FC<BottomMenuProps> = props => {

    const [
        openSidebar,
    ] = useUnit([
        SideBarModel.Open,
    ])

    const openSB = () => {
        openSidebar()
        window.scrollTo(0, 0)
        document.documentElement.style.overflow = 'hidden'
    }

    return (<div className={s.bottom_menu}>
        <div className={s.element} onClick={openSB} >
            <Image
                src={Burger}
                alt=''
            />
        </div>
        <div className={s.element}>
            <GamesIcon />
        </div>
        <div className={s.element}>
            <SupportIcon />
        </div>
        <div className={s.element}>
            <Image
                src={ChatIcon}
                alt=''
            />
        </div>
    </div>)
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
        setAvailableExplorers,
        // availableAmount,
        // setAvailableAmount,
        currentTokenDecimals,
        setDecimals,
        web3Provider,
        web3ProviderInit
    ] = useUnit([
        sessionModel.$currentNetwork,
        sessionModel.pickNetwork,
        settingsModel.$AvailableNetworks,
        settingsModel.$AvailableRpcs,
        settingsModel.setAvailableNetworks,
        settingsModel.setAvailableTokens,
        settingsModel.$AvailableBlocksExplorers,
        settingsModel.setAvailableExplorers,
        // sessionModel.$availableAmount,
        // sessionModel.setAvailableAmount,
        sessionModel.$currentTokenDecimals,
        sessionModel.setDecimals,
        web3.web3Provider,
        web3.web3ProviderInitEv
    ]);


    useEffect(() => {
        const initializeProvider = async () => {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                web3ProviderInit(provider);
                console.log("setted provider");
            }
        };

        initializeProvider();
        // window.ethereum.removeListener('chainChanged', (network_id: any) => networkChangeHandler(network_id, availableNetworks));
        // window.ethereum.on('chainChanged', (network_id: any) => networkChangeHandler(network_id, availableNetworks));
    }, []);

    const [setupRan, setSetupRan] = useState(false);

    var available_networks: any;

    useEffect(() => {
        queryAllExplorers();
    }, [])

    // setup
    useEffect(() => {
        if (setupRan) {
            return;
        }

        console.log("Header Effect");

        const run = async () => {
            console.log('Getting account');
            await checkMetamaskConnection();

            //await checkCurrentNetwork();

            available_networks = (await Api.getNetworksFx()).body as Api.T_Networks;
            setAvailableNetworks(available_networks);

            await checkCurrentNetwork(available_networks);


            //queryAvailableNetworks();
            console.log(currentWalletAddress);
        }

        if (web3Provider != null) {
            run();
            setSetupRan(true);
            //window.ethereum.on('chainChanged', (network_id: any) => networkChangeHandler(network_id, available_networks));
            window.ethereum.on('chainChanged', (network_id: any) => window.location.reload());
            window.ethereum?.on('accountsChanged', accountChangeHandler);
        }
    }, [web3Provider]);


    const queryAllExplorers = async () => {
        const explorers = (await Api.getAllExplorers()).body as Api.T_BlockExplorers;

        console.log("Explorers");
        console.log(explorers);

        setAvailableExplorers(explorers);
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

    const checkMetamaskConnection = async () => {
        // await window.ethereum?.request({ method: 'eth_requestAccounts' }).catch((err: any) => {
        //     console.error(err);
        // });
        if (web3Provider?.provider
            .request == null) {
            return;
        }
        await web3Provider?.provider
            .request({ method: 'eth_requestAccounts' }).catch((err) => {
                console.error(err);
            });
        const accounts = await web3Provider?.provider.request({ method: 'eth_accounts' });
        if (accounts != null) {
            accountChangeHandler(accounts);
        }
        return accounts;
    };

    const networkChangeHandler = async (network_id: any, available_networks: Api.T_Networks | undefined) => {
        const network_id_number = parseInt(network_id, 16);
        // if (availableNetworks.networks.length == 0) {
        //     return;
        // }
        if (currentNetwork != null && network_id_number == currentNetwork.network_id) {
            console.log("same network id");
            return;
        }
        console.log("Network Changed", network_id, network_id_number, currentNetwork?.network_id, available_networks);

        const network = available_networks != undefined ?
            (available_networks as unknown as Api.T_Networks).networks.find((network) => network.network_id == network_id_number)
            : availableNetworks.networks.find((network) => network.network_id == network_id_number);

        console.log(network);

        if (network != undefined) {
            pickNetwork(network);
            var available_tokens = (await Api.getTokens({ network_id: network.network_id })).body as Api.T_Tokens;
            console.log(`Tokens Network: ${JSON.stringify(available_tokens)}`);
            setAvailableTokens(available_tokens);
            pickToken(available_tokens.tokens[0]);
        } else {
            if (currentNetwork == null) {
                return;
            }
            pickNetwork(null);
            setAvailableTokens({ tokens: [] });
            pickToken(null);
        }
    }

    const checkCurrentNetwork = async (available_networks: any) => {
        console.log(`Wallet: ${currentWalletAddress}`);
        // var available_networks = (await Api.getNetworksFx()).body as Api.T_Networks;
        // setAvailableNetworks(available_networks);
        //console.log('Networks');
        //console.log(available_networks);
        if (web3Provider?.provider
            .request == null) {
            return;
        }
        await web3Provider?.provider.request({ method: 'eth_chainId' }).then((network_id) => networkChangeHandler(network_id, available_networks)).catch((err) => {
            console.error(err);
        });

    }
    // web3Provider?.on('chainChanged', (network_id) => networkChangeHandler(network_id, undefined));

    // const checkERC20Amount = async (token_address: string) => {
    //     const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));
    //     const web3Utils = new Web3();

    //     const signer = await ethereum.getSigner();

    //     const tokenContract = new ethers.Contract(token_address, IERC20, signer);

    //     const currentBalance: BigNumber = await tokenContract.balanceOf(currentWalletAddress);

    //     const balanceString = currentBalance.toString();

    //     const decimals = await tokenContract.decimals();
    //     setDecimals(decimals);

    //     const end = balanceString.length - decimals;

    //     const balanceNum = parseFloat(balanceString.slice(0, end) + '.' + balanceString.slice(end, end + 2));

    //     console.log("Balance ", balanceNum);

    //     setAvailableAmount(balanceNum);
    // }

    // useEffect(() => {
    //     if (currentToken == null || currentWalletAddress == null) {
    //         return;
    //     }

    //     checkERC20Amount(currentToken.contract_address);
    // }, [currentToken]);

    return (<>
        {/* <div className={s.header}>
            <a href="/" style={{ textDecoration: "none" }}>
                <Emblem text="GREEK KEEPERS" />
            </a>
            <Buttons />
            <div className={s.settings_box}>
                <NetworkPicker />
                <div className={s.connect_account_box}>
                    {currentWalletAddress == null ?
                        <ConnectWallet wallet_connection_function={checkMetamaskConnection} /> : <Account name={currentNickName as string} address={currentWalletAddress} />
                    }
                </div>
            </div>
        </div>

        <div className={s.functional_footer}>
            <div>menu</div>
            {
                currentWalletAddress == null ?
                    <div className={s.functional_footer_connect} onClick={checkMetamaskConnection}>Connect</div> : <Account name={currentNickName as string} address={currentWalletAddress} />
            }
            <div>Chat</div>
        </div> */}
        <>
            <div className={s.header}>
                <LeftMenu />
                <Links />
                <NetworkSelect />
                <RightMenu />
            </div>
            <BottomMenu />
        </>
    </>);
}