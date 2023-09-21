import { ReactNode, useEffect } from 'react';
import s from './styles.module.scss';

import { SideBar } from '@/widgets/SideBar';
import { Header } from '../header';
//import { LayoutModel } from '.';
import { Blur } from "@/widgets/Blur/Blur";
import { useUnit } from 'effector-react';
import { SettingsInit } from '../SettingsInit';
import { WagmiConfig } from 'wagmi';
import { web3 } from '@/entities/web3';
import { Footer } from "@/widgets/Footer";


interface LayoutProps {
    children?: ReactNode[]
}
export const Layout = ({ children, ...props }: LayoutProps) => {
    const [
        wagmiConfig
    ] = useUnit([
        web3.$WagmiConfig
    ]);


    return (
        <>
            <SettingsInit />
            {wagmiConfig != null ?
                <WagmiConfig config={wagmiConfig}>
                    <div className={s.page_container}>
                        <Header />
                        <div className={s.side_bar_wrapper}>
                            <SideBar />
                        </div>
                        <Blur />
                        <main>
                            {children}
                        </main>
                        <Footer />
                    </div>
                </WagmiConfig> : <></>}
        </>
    )
}