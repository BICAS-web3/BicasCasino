import Head from 'next/head';
import { Header } from '@/widgets/header/index';
import Image from 'next/image';
import { GameLayout } from '@/widgets/GameLayout/layout';
import { GameInfo } from '@/widgets/GameInfo';
import { CoinFlip as CoinFlipGame } from '@/widgets/CoinFlip';
import MinimalIcon from '@/public/media/games_assets/coinflip/minimal_icon.svg';
import { LiveBets } from '@/widgets/LiveBets';
import { sessionModel } from '@/entities/session/';
import { useUnit } from 'effector-react';
import { Profile as ProfileWidget } from '@/widgets/Profile';
import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter();
    console.log("provided address", router.query.address);
    return (
        <>
            {router.query.address == undefined ? <></> :
                <GameLayout gameName={'Coin Flip'} children={[
                    <ProfileWidget address={(router.query.address as string).toLowerCase()}></ProfileWidget>
                ]} />}
        </>
    );
}