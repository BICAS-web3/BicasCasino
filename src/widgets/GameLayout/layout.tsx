import Head from 'next/head';
import { Header } from '@/widgets/header/index';
import s from './styles.module.scss';
import Nova2Image from '@/public/media/misc/novas/nova2.svg';
import Nova3Image from '@/public/media/misc/novas/nova3.svg';
import Nova4Image from '@/public/media/misc/novas/nova4.svg';
import Nova5Image from '@/public/media/misc/novas/nova5.svg';
import NovaLineImage from '@/public/media/misc/novas/line.svg';
import Image from 'next/image';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { FC, useEffect } from 'react';
import { BetStatus } from '@/widgets/BetStatus';

type GameLayoutProps = {
    children: ReactNode
};

export const GameLayout: FC<GameLayoutProps> = props => {
    return (
        <>
            <Head>
                <title>NFT Play | Home page</title>
            </Head>
            <Header />
            <main>
                <div className={s.main_container}>
                    {/* <div className={s.background}>
                        <BetStatus />
                        <div className={s.nova3}>
                            <Image
                                src={Nova3Image}
                                alt=""
                                width={739.1}
                                height={739.1}
                            />
                        </div>
                        <div className={s.nova4}>
                            <Image
                                src={Nova4Image}
                                alt=""
                                width={53.75}
                                height={53.75}
                            />
                        </div>
                        <div className={s.nova5}>
                            <Image
                                src={Nova5Image}
                                alt=""
                                width={143.34}
                                height={143.34}
                            />
                        </div>
                        <div className={s.nova1}>
                        </div>
                        <div className={s.nova2}>
                            <Image
                                src={Nova2Image}
                                alt=""
                                width={174.95}
                                height={174.95}
                            />
                        </div>
                    </div> */}
                    <div className={s.main_area}>
                        {props.children}
                    </div>
                </div>

            </main >
            {/* <Footer />
			<InvitesList />
			<GamesList />
			<ConnectWalletModal /> */}
        </>
    );
}