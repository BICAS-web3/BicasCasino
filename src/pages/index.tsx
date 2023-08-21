import Head from 'next/head';
import { Header } from '@/widgets/header/index';
import s from './styles.module.scss';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import CoinFlipColoredIcon from '@/public/media/games_assets/coinflip/icon_colored.svg';
import CoinFlipBlendIcon from '@/public/media/games_assets/coinflip/icon_blend.svg';

import RPSColoredIcon from '@/public/media/games_assets/rock_paper_scissors/icon_colored.svg';
import RPSBlendIcon from '@/public/media/games_assets/rock_paper_scissors/icon_blend.svg';

import DiceColoredIcon from '@/public/media/games_assets/dice/icon_colored.svg';
import DiceBlendIcon from '@/public/media/games_assets/dice/icon_blend.svg';

import BSCNetworkIcon from '@/public/media/networks/bsc.svg';
//import LinkIcon from '@/public/media/misc/link.svg';

const LinkIcon: FC<{}> = p => {
    return (<svg height="14px" width="14px" viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"></path><path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path></svg>)
}

interface GameProps { name: string, description: string, link: string, image_colored: any, image_blend: any }

const Game: FC<GameProps> = props => {
    const [isHovering, setIsHovered] = useState(false);

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);



    return (<a
        className={s.game_link}
        href={props.link}
    ><div className={s.game}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
            <div className={s.game_info}>
                <div className={s.game_name}>
                    {props.name}
                    <div className={s.game_arrow}>
                        {'>'}
                    </div>
                </div>
                <div className={s.game_description}>
                    {props.description}
                </div>
            </div>
            {
                isHovering ?
                    <div className={s.game_icon}>
                        <Image
                            src={props.image_colored}
                            alt=""
                            width={196}
                            height={196} />
                    </div> : <div className={s.game_icon}>
                        <Image
                            src={props.image_blend}
                            alt=""
                            width={196}
                            height={196} />
                    </div>
            }
        </div ></a>)
}

interface GamesProps { };

const Games: FC<GamesProps> = props => {
    return (<div className={s.games}>
        <GamesTitle></GamesTitle>
        <div className={s.games_row}>
            <Game
                name={'COINFLIP'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/coinflip'}
                image_colored={CoinFlipColoredIcon}
                image_blend={CoinFlipBlendIcon}
            />

            <Game
                name={'ROCK PAPER SCISSORS'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/rock-paper-scissors'}
                image_colored={RPSColoredIcon}
                image_blend={RPSBlendIcon}
            />

        </div>

        <div className={s.games_row}>
            <Game
                name={'DICE'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/dice'}
                image_colored={DiceColoredIcon}
                image_blend={DiceBlendIcon}
            />

            <Game
                name={'COINFLIP'}
                description={'COINFLIP GAME very long description that needs to be wrapped to the new line'}
                link={'/games/coinflip'}
                image_colored={CoinFlipColoredIcon}
                image_blend={CoinFlipBlendIcon}
            />

        </div>
    </div>);
}

interface GamesTitleProps { };
const GamesTitle: FC<GamesTitleProps> = props => {
    return (<div className={s.games_title}>
        <div>Games</div>
        <div className={s.games_more}>
            <div>
                Show More
            </div>
            <div>
                {'>'}
            </div>
        </div>
    </div>)
}

interface TotalProps { name: string, value: string };
const Total: FC<TotalProps> = props => {
    return (<div className={s.total}>
        <div className={s.total_name}>
            {props.name}
        </div>
        <div className={s.total_value}>
            {props.value}
        </div>
    </div>)
}

interface TotalInfoProps { };
const TotalInfo: FC<TotalInfoProps> = props => {
    return (<div className={s.total_info}>
        <Total
            name="Total wagered"
            value="10000000" />

        <Total
            name="Total bets"
            value="10000000" />

        <Total
            name="Total users"
            value="10000000" />
    </div>)
}

interface LiveBetsProps { };
const LiveBets: FC<LiveBetsProps> = props => {
    return (<div className={s.live_bets}>
        <div className={s.live_bets_header}>
            <div className={s.live_bets_circle}>
            </div>

            Live Bets
        </div>
        <div className={s.table}>
            <div className={
                `${s.table_row} ${s.table_header}`}>
                <div>Time</div>
                <div>Game</div>
                <div>Player</div>
                <div>Wager</div>
                <div>Multiplier</div>
                <div>Profit</div>
            </div>

            <div className={
                `${s.table_row}`}>
                <div>
                    <a
                        href="https://polygonscan.com/tx/0x5e812b98e216f65d828c82785c8aa21aa59d7e27bfb945c4dc7d6afc2e2ab2f9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.link}>
                        02:49
                        <LinkIcon />
                    </a>
                </div>
                <div className={s.game_name_link}>
                    <a
                        href="/games/dice"
                        className={s.link}>
                        <Image
                            src={BSCNetworkIcon}
                            alt=""
                            width={30}
                            height={50}
                        />
                        Dice
                    </a>
                </div>
                <div>
                    <a
                        href="player"
                        className={s.link}>
                        0x5C0369359155C836F5D02f1D77fc11F637DBbF2b
                    </a>
                </div>
                <div>11</div>
                <div>3x</div>
                <div>+4.29</div>
            </div>


            <div className={
                `${s.table_row} ${s.odd_row}`}>
                <div>
                    <a
                        href="https://polygonscan.com/tx/0x5e812b98e216f65d828c82785c8aa21aa59d7e27bfb945c4dc7d6afc2e2ab2f9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.link}>
                        02:49
                        <LinkIcon />
                    </a>
                </div>
                <div className={s.game_name_link}>
                    <a
                        href="/games/dice"
                        className={s.link}>
                        <Image
                            src={BSCNetworkIcon}
                            alt=""
                            width={30}
                            height={50}
                        />
                        Dice
                    </a>
                </div>
                <div>
                    <a
                        href="player"
                        className={s.link}>
                        0x5C0369359155C836F5D02f1D77fc11F637DBbF2b
                    </a>
                </div>
                <div>11</div>
                <div>3x</div>
                <div>+4.29</div>
            </div>

        </div>
    </div>)
}

export default function Home() {
    return (
        <>
            <Head>
                <title>NFT Play | Home page</title>
            </Head>
            <Header />
            <main>
                <div className={s.main_container}>
                    <div className={s.main_area}>
                        <Games />
                        <TotalInfo />
                        <LiveBets />
                    </div>
                </div>

            </main>
            {/* <Footer />
			<InvitesList />
			<GamesList />
			<ConnectWalletModal /> */}
        </>
    );
}