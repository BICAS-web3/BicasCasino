import s from './styles.module.scss';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import BSCNetworkIcon from '@/public/media/networks/bsc.svg';
import { useUnit } from 'effector-react';
import * as Model from './model';
import * as Api from '@/shared/api';
import { settingsModel } from '@/entities/settings';
import { sessionModel } from '@/entities/session';
import GKemblem1 from '@/public/media/brand_images/GKemblem1.png';

const LinkIcon: FC<{}> = p => {
    return (<svg height="14px" width="14px" viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"></path><path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path></svg>)
}

interface LiveBetProps {
    is_odd: boolean,
    trx_url: string,
    time: string,
    network_icon: string,
    game_url: string,
    game_name: string,
    player: string,
    player_url: string,
    wager: number,
    multiplier: number,
    profit: number,
    numBets: number
};
const LiveBet: FC<LiveBetProps> = props => {
    return (<div className={
        `${s.table_row} ${props.is_odd ? s.odd_row : ""}`}>
        <div>
            <a
                href={props.trx_url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.link}>
                <div style={{ width: "45.62px" }}>{props.time}</div>
                <LinkIcon />
            </a>
        </div>
        <div className={s.game_name_link}>
            <a
                href={props.game_url}
                className={s.link}>
                <Image
                    src={props.network_icon}
                    alt=""
                    width={30}
                    height={50}
                />
                {props.game_name}
            </a>
        </div>
        <div>
            <a
                href={props.player_url}
                className={s.link}>
                {props.player}
            </a>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: '6px',
            justifyContent: "space-between"
        }}>
            {`${props.wager.toString()} x ${props.numBets}`}
            <Image
                src={GKemblem1}
                alt={''}
                width={20}
                height={20}
                style={{ marginLeft: "auto" }}
            ></Image>
        </div>
        <div>{props.multiplier}x</div>
        {
            props.profit > props.wager * props.numBets ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: '6px',
                    justifyContent: "end"
                }}>
                    {props.profit > 0 ? "+" : ""}{props.profit}
                    <Image
                        src={GKemblem1}
                        alt={''}
                        width={20}
                        height={20}
                    ></Image>
                </div> : <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: '6px',
                    justifyContent: "end"
                }}>0
                    <Image
                        src={GKemblem1}
                        alt={''}
                        width={20}
                        height={20}
                    ></Image></div>
        }
    </div>);
}

export interface LiveBetsProps {
    subscription_type: string,
    subscriptions: string[]
};
export const LiveBets: FC<LiveBetsProps> = props => {
    const [Bets,
        newBet,
        setBets,
        availableBlocksExplorers,
        setNewBet
    ] = useUnit([
        Model.$Bets,
        Model.newBet,
        Model.setBets,
        settingsModel.$AvailableBlocksExplorers,
        sessionModel.setNewBet
    ]);

    const [socket, setSocket] = useState<any | null>(null);

    const [gotBets, setGotBets] = useState(false);

    const [BetsElements, setBetsElements] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const run = async () => {
            console.log("Getting bets");
            await getBets();
        }
        run();
    }, [availableBlocksExplorers]);

    const getBets = async () => {
        var bets = props.subscriptions.length == 0 ? (await Api.getAllLastBets()).body as Api.T_Bets : (await Api.getGamesAllLastBets(props.subscriptions[0])).body as Api.T_Bets;
        setBets(bets.bets);
        console.log(bets);
        console.log(Bets);
        setGotBets(true);
    }
    var odd = false;

    const onMessage = (ev: MessageEvent<any>) => {
        const data = JSON.parse(ev.data);
        console.log("Received message:", data);
        if (data.type == "Ping") {
            return;
        }
        setNewBet(data);
        newBet(data);
        setGotBets(true);
    };

    useEffect(() => {

        console.log("mapping bets");

        setBetsElements(Bets.map((bet: Api.T_BetInfo) => {
            var date = new Date(bet.timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();

            var element = <LiveBet
                is_odd={odd}
                trx_url={availableBlocksExplorers?.get(bet.network_id)?.url + '/tx/' + bet.transaction_hash}
                time={hours + ':' + minutes.substr(-2)}
                network_icon={`/static/media/networks/${bet.network_id}.svg`}
                game_url={`/games/${bet.game_name}`}
                game_name={bet.game_name}
                player={bet.player}
                player_url={bet.player}
                wager={parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2))}
                multiplier={1.98}
                profit={parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2))}
                key={bet.transaction_hash}
                numBets={bet.bets}
            />;
            odd = !odd;
            return (element);
        }));
        setGotBets(false);

        if (socket != null) {
            return;
        }
        console.log("Connecting to WebSocket server...");
        var newSocket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/updates`);

        newSocket.onopen = (_) => { newSocket.send(JSON.stringify({ type: props.subscription_type, payload: props.subscriptions })); };

        newSocket.onmessage = onMessage;
        setSocket(newSocket);
    }, [Bets, gotBets]);


    return (<div style={{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
    }}><div className={s.live_bets}>
            <div className={s.live_bets_header}>
                <div className={s.live_bets_circle}>
                </div>

                Live Bets
            </div>
            <div style={{
                width: '100%',
                overflow: 'auto'
            }}>
                <div className={s.table} id="LiveBets">
                    <div className={s.table_header}>
                        <div>Time</div>
                        <div>Game</div>
                        <div>Player</div>
                        <div>Wager</div>
                        <div>Multiplier</div>
                        <div>Profit</div>
                    </div>
                    {
                        BetsElements
                    }

                </div>
            </div>
        </div></div>)
}