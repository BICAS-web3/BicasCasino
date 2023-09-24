import s from './styles.module.scss'
import arbitrumIco from '../../public/media/networkSelect_icons/arbitrumIco.svg'
import bnbIco from '../../public/media/networkSelect_icons/bnbChainIco.svg'
import downIco from '../../public/media/networkSelect_icons/dropDownIco.svg'

import { useEffect, useState } from "react";
import Image from 'next/image';
import { NetworkSelectItem } from "@/widgets/NetworkSelect/NetworkSelectItem";
import { NetworkErrorText } from "@/widgets/NetworkSelect/NetworkErrorText";
import { NetworkError } from "@/widgets/NetworkSelect/NetworkError";
import errorInfoIco from '../../public/media/networkSelect_icons/errorInfoIco.svg';
import { web3 } from '@/entities/web3';
import { useUnit } from 'effector-react';
import { useAccount, useNetwork } from 'wagmi';

//import { useState, useEffect } from "react";
//import Image from 'next/image';
//import { NetworkSelectItem } from "@/widgets/NetworkSelect/NetworkSelectItem";
//import { useUnit } from 'effector-react';
//import { web3 } from '@/entities/web3';
//import { useNetwork, useSwitchNetwork } from 'wagmi'
//import { NetworkErrorText } from "@/widgets/NetworkSelect/NetworkErrorText";
//import { NetworkError } from "@/widgets/NetworkSelect/NetworkError";


export const networksList = [
    // {
    //     ico: errorInfoIco,
    //     title: 'error',
    //     id: 'network_error'
    // },
    {
        ico: bnbIco,
        title: 'bnb chain',
        id: 5
    },
    {
        ico: arbitrumIco,
        title: 'arbitrum',
        id: 6
    }
]

export const NetworkSelect = () => {
    const { chain } = useNetwork();


    const [networkListVisibility, setNetworkListVisibility] = useState(false);
    const [activeNetwork, setActiveNetwork] = useState<number | undefined>(-1);
    const { address, isConnected } = useAccount();

    const [networkList
    ] = useUnit([web3.$Chains]);

    useEffect(() => {
        console.log("chains", networkList);
    }, [networkList]);

    useEffect(() => {
        if (chain == undefined || chain == null) {
            return;
        }

        const network = networkList.chains.find((network: any) => network.id == chain.id);
        if (network == undefined) {
            setActiveNetwork(undefined);
            return;
        }
        setActiveNetwork(chain.id);
    }, [chain]);

    //const [networkListVisibility, setNetworkListVisibility] = useState<boolean>(false);
    //const [activeNetwork, setActiveNetwork] = useState(networksList[0]);

    //const [
    //    Chains
    //] = useUnit([
    //    web3.$Chains,
    //]);

    //useEffect(() => {
    //    console.log("Chains", Chains);
    //}, [Chains]);


    const handleNetworkListVChange = () => {
        !networkListVisibility ? setNetworkListVisibility(true) : setNetworkListVisibility(false)
    }

    return (
        <>{isConnected ? <div className={s.network_select_wrap}>

            {
                activeNetwork === undefined ? (
                    <NetworkError networkChange={handleNetworkListVChange} />
                ) : (
                    <div className={s.network_select_body} onClick={handleNetworkListVChange} >
                        <div className={s.active_network_ico_wrap}>
                            <Image src={`/static/media/networks/${activeNetwork}.svg`} width={30} height={30} alt='' />
                        </div>
                        <span className={s.active_network_title}>{chain?.name}</span>
                        <Image className={s.active_network_dropDown_ico} src={downIco} width={9} height={6} alt='' />
                    </div>
                )
            }
            <div className={`${s.networks_list_wrap} ${activeNetwork === undefined && s.undefined_network}`} style={{ visibility: networkListVisibility && 'visible', opacity: networkListVisibility && '1' }} >
                <>
                    {
                        activeNetwork === undefined && <NetworkErrorText error_text='wrong network' />
                    }

                    {/* <div className={s.network_select_body} onClick={handleNetworkListVChange} >
                <div className={s.active_network_ico_wrap}>
                    <Image src={activeNetwork.ico} width={30} height={30} alt='' />
                </div>
                <span className={s.active_network_title}>{activeNetwork.title}</span>
                <Image className={s.active_network_dropDown_ico} src={downIco} width={9} height={6} alt='' />
            </div>
            <div className={s.networks_list_wrap} style={{ visibility: networkListVisibility && 'visible', opacity: networkListVisibility && '1' }} > */}

                    <div className={s.networks_list_title_wrap}>
                        <h3 className={s.networks_list_title}>Select a network</h3>
                    </div>
                    <div className={s.networks_list}>
                        {
                            networkList && networkList.chains.map((item: any, ind: number) => {
                                if (item.id == activeNetwork) {
                                    return (<></>);
                                }
                                return (
                                    <NetworkSelectItem
                                        key={ind}
                                        title={item.network}
                                        id={item.id}
                                        networkList={networkList}
                                        setActiveNetwork={setActiveNetwork}
                                        setNetworkVisibility={setNetworkListVisibility}
                                    />);
                            })

                        }
                    </div>
                </>
            </div>
        </div> : <></>}</>
    )
}