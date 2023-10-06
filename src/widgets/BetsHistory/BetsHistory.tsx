// import s from './styles.module.scss';
// import { FC, useEffect, useState } from 'react';
// import Image from 'next/image';
// import BSCNetworkIcon from '@/public/media/networks/bsc.svg';
// import { useUnit } from 'effector-react';
// import * as Model from './model';
// import * as Api from '@/shared/api';
// import { settingsModel } from '@/entities/settings';
// import { sessionModel } from '@/entities/session';
// import GKemblem1 from '@/public/media/brand_images/GKemblem1.png';

// const LinkIcon: FC<{}> = p => {
//     return (<svg height="14px" width="14px" viewBox="0 0 18 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"></path><path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path></svg>)
// }

// interface LiveBetProps {
//     is_odd: boolean,
//     trx_url: string,
//     time: string,
//     network_icon: string,
//     game_url: string,
//     game_name: string,
//     player: string,
//     player_url: string,
//     wager: number,
//     multiplier: number,
//     profit: number,
//     numBets: number
// };
// const LiveBet: FC<LiveBetProps> = props => {
//     return (<div className={
//         `${s.table_row} ${props.is_odd ? s.odd_row : ""}`}>
//         <div>
//             <a
//                 href={props.trx_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={s.link}>
//                 <div style={{ width: "45.62px" }}>{props.time}</div>
//                 <LinkIcon />
//             </Link>
//         </div>
//         <div className={s.game_name_link}>
//             <a
//                 href={props.game_url}
//                 className={s.link}>
//                 <Image
//                     src={props.network_icon}
//                     alt=""
//                     width={30}
//                     height={50}
//                 />
//                 {props.game_name}
//             </Link>
//         </div>
//         <div>
//             <a
//                 href={`${props.player_url}`}
//                 className={s.link}>
//                 {props.player}
//             </Link>
//         </div>
//         <div style={{
//             display: 'flex',
//             flexDirection: 'row',
//             columnGap: '6px',
//             justifyContent: "space-between"
//         }}>
//             {`${(props.wager).toString()} x ${props.numBets}`}
//             <Image
//                 src={GKemblem1}
//                 alt={''}
//                 width={20}
//                 height={20}
//                 style={{ marginLeft: "auto" }}
//             ></Image>
//         </div>
//         <div>{!Number.isNaN(props.multiplier) ? props.multiplier : 0}x</div>
//         {
//             props.profit > props.wager * props.numBets ?
//                 <div style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     columnGap: '6px',
//                     justifyContent: "end"
//                 }}>
//                     {props.profit > 0 ? "+" : ""}{props.profit}
//                     <Image
//                         src={GKemblem1}
//                         alt={''}
//                         width={20}
//                         height={20}
//                     ></Image>
//                 </div> : <div style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     columnGap: '6px',
//                     justifyContent: "end"
//                 }}>0
//                     <Image
//                         src={GKemblem1}
//                         alt={''}
//                         width={20}
//                         height={20}
//                     ></Image></div>
//         }
//     </div>);
// }

// export interface BetsHistoryProps {
//     address: string
// };
// export const BetsHistory: FC<BetsHistoryProps> = props => {
//     const currentWalletAddress = props.address;
//     const [Bets,
//         newBet,
//         setBets,
//         availableBlocksExplorers,
//         setNewBet,
//         //currentWalletAddress
//     ] = useUnit([
//         Model.$Bets,
//         Model.newBet,
//         Model.setBets,
//         settingsModel.$AvailableBlocksExplorers,
//         sessionModel.setNewBet,
//         //sessionModel.$currentWalletAddress
//     ]);

//     const [BetsElements, setBetsElements] = useState<React.JSX.Element[]>([]);
//     const [lastBetId, setLastBetId] = useState<number>(0);
//     const [firstBetId, setFirstBetId] = useState<number>(0);
//     const [pageNumber, setPageNumber] = useState<number>(1);

//     useEffect(() => {
//         console.log("Getting bets", currentWalletAddress);
//         if (currentWalletAddress == null) {
//             return;
//         }
//         const run = async () => {
//             const bets = (await Api.getUserBets({
//                 address: currentWalletAddress,
//                 starting_id: null
//             })).body as Api.T_Bets;
//             if (bets.bets.length == 0) {
//                 setBetsElements([]);
//                 return;
//             }
//             const lastId = bets.bets[bets.bets.length - 1].id;

//             setLastBetId(lastId);
//             setFirstBetId(bets.bets[0].id + 1);

//             var odd = false;
//             setBetsElements(bets.bets.map((bet: Api.T_BetInfo) => {
//                 var date = new Date(bet.timestamp * 1000);
//                 let hours = date.getHours();
//                 let minutes = "0" + date.getMinutes();

//                 const wager = parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2));
//                 const profit = parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2));
//                 var element = <LiveBet
//                     is_odd={odd}
//                     trx_url={availableBlocksExplorers?.get(bet.network_id)?.url + '/tx/' + bet.transaction_hash}
//                     time={hours + ':' + minutes.substr(-2)}
//                     network_icon={`/static/media/networks/${bet.network_id}.svg`}
//                     game_url={`/games/${bet.game_name}`}
//                     game_name={bet.game_name}
//                     player={bet.player_nickname == null ? bet.player : bet.player_nickname}
//                     player_url={bet.player}
//                     wager={wager}
//                     multiplier={parseFloat((profit / (wager * bet.bets)).toFixed(2))}
//                     profit={profit}
//                     key={bet.transaction_hash}
//                     numBets={bet.bets}
//                 />;
//                 odd = !odd;
//                 return (element);
//             }));
//         }

//         run();
//     }, [currentWalletAddress, availableBlocksExplorers]);

//     const page_switch = async (left: boolean) => {
//         var bets: Api.T_BetInfo[];
//         if (left) {
//             if (pageNumber == 1) {
//                 return;
//             }
//             bets = ((await Api.getUserBetsInc({
//                 address: currentWalletAddress,
//                 starting_id: firstBetId
//             })).body as Api.T_Bets).bets.reverse();
//             setPageNumber(pageNumber - 1);
//         } else {
//             if (BetsElements.length == 0) {
//                 return;
//             }
//             bets = ((await Api.getUserBets({
//                 address: currentWalletAddress,
//                 starting_id: lastBetId
//             })).body as Api.T_Bets).bets;
//             if (bets.length == 0) {
//                 return;
//             }
//             setPageNumber(pageNumber + 1);
//         }

//         if (bets.length == 0) {
//             setBetsElements([]);
//             return;
//         }
//         const lastId = bets[bets.length - 1].id;

//         setLastBetId(lastId);
//         setFirstBetId(bets[0].id);

//         var odd = false;
//         setBetsElements(bets.map((bet: Api.T_BetInfo) => {
//             var date = new Date(bet.timestamp * 1000);
//             let hours = date.getHours();
//             let minutes = "0" + date.getMinutes();

//             const wager = parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2));
//             const profit = parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2));
//             var element = <LiveBet
//                 is_odd={odd}
//                 trx_url={availableBlocksExplorers?.get(bet.network_id)?.url + '/tx/' + bet.transaction_hash}
//                 time={hours + ':' + minutes.substr(-2)}
//                 network_icon={`/static/media/networks/${bet.network_id}.svg`}
//                 game_url={`/games/${bet.game_name}`}
//                 game_name={bet.game_name}
//                 player={bet.player_nickname == null ? bet.player : bet.player_nickname}
//                 player_url={bet.player}
//                 wager={wager}
//                 multiplier={parseFloat((profit / wager).toFixed(2))}
//                 profit={profit}
//                 key={bet.transaction_hash}
//                 numBets={bet.bets}
//             />;
//             odd = !odd;
//             return (element);
//         }));

//     }

//     return (<div className={s.bets_container}>
//         <div className={s.live_bets}>
//             <div className={s.live_bets_header}>

//                 Bet History
//             </div>
//             <div style={{
//                 width: '100%',
//                 overflow: 'auto'
//             }}>
//                 <div className={s.table} id="LiveBets">
//                     <div className={s.table_header}>
//                         <div>Time</div>
//                         <div>Game</div>
//                         <div>Player</div>
//                         <div>Wager</div>
//                         <div>Multiplier</div>
//                         <div>Profit</div>
//                     </div>
//                     {
//                         BetsElements
//                     }

//                 </div>
//             </div>
//         </div>
//         <div style={{
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//             display: 'flex'
//         }}>
//             <div className={s.page_picker}>
//                 <div className={s.page_button} onClick={async (_) => { await page_switch(true); }}>
//                     {'<'}
//                 </div>
//                 <div className={s.page_number}>
//                     {pageNumber}
//                 </div>
//                 <div className={s.page_button} onClick={async (_) => { await page_switch(false); }}>
//                     {'>'}
//                 </div>
//             </div>
//         </div>
//     </div>)
// }