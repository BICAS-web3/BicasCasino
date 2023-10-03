import s from './styles.module.scss'
import { CustomBetsItem } from "@/widgets/CustomBets/CustomBetsItem";
import { FC, useEffect, useState } from 'react';
import { LiveBetsModel } from '../LiveBets';
import { useUnit } from 'effector-react';
import { settingsModel } from '@/entities/settings';
import { T_BetInfo } from '@/shared/api';
import { sessionModel } from '@/entities/session';
import { useAccount } from 'wagmi';
import * as api from "@/shared/api/";

enum Page {
  AllBets = 0,
  MyBets = 1
}

export interface CustomBetsProps { title: string, isMainPage: boolean, isGamePage: boolean, game: string | undefined };
export const CustomBets: FC<CustomBetsProps> = props => {
  const [
    Bets,
    setBets,
    AvailableBlocksExplorers,
    newBet
  ] = useUnit([
    LiveBetsModel.$Bets,
    LiveBetsModel.setBets,
    settingsModel.$AvailableBlocksExplorers,
    sessionModel.$newBet
  ]);

  const { isConnected, address } = useAccount();

  const [activePage, setActivePage] = useState<Page>(Page.AllBets);
  const [firstRun, setFirstRun] = useState<boolean>(false);

  const [betsToDisplay, setBetsToDisplay] = useState<api.T_BetInfo[]>([]);

  useEffect(() => {
    if (isConnected && activePage == Page.MyBets) {
      if (newBet && newBet.player.toLowerCase() == address?.toLowerCase()) {
        const bets = betsToDisplay;
        bets.unshift(newBet);
        if (bets.length > 10) {
          bets.pop();
        };
        setBetsToDisplay(bets);
      }
    }
  }, [newBet, activePage, isConnected]);

  // const getMyBets = async (addr: string) => {
  //   var new_bets = (await api.getUserBets({
  //     address: addr.toLowerCase(),
  //     starting_id: null
  //   })).body as api.T_Bets;
  //   console.log('bets', new_bets);
  //   setBets(new_bets.bets);
  // }

  // useEffect(() => {
  //   const runMyBets = async () => {
  //     await getMyBets(address as string);
  //   }
  //   const runAllBets = async () => {
  //     await getMyBets(address as string);
  //     let new_bets = (await api.getGamesAllLastBets(props.game as string)).body as api.T_Bets;
  //     setBets(new_bets.bets);
  //   }
  //   if (isConnected && address) {
  //     if (activePage == Page.MyBets) {
  //       runMyBets();
  //     } else {
  //       //runAllBets();
  //     }
  //   }
  // }, [activePage, isConnected]);

  useEffect(() => {
    console.log("New bets");
  }, [newBet, AvailableBlocksExplorers]);

  return (
    <div className={s.customBets_wrap}>
      <div className={s.customBets_header} style={{ justifyContent: `${props.isMainPage && "center"}` }}>
        <h2 className={s.customBets_title}>
          {(props.isMainPage || props.isGamePage) && (<div className={s.customBets_title_circle}></div>)}
          {props.title}
        </h2>
        {
          props.isGamePage && (
            <div className={s.customBets_switch_bets_btns}>
              <button
                className={s.customBets_btn}
                data-active={activePage == Page.AllBets ? 'active' : ''}
                onClick={() => {
                  //setActivePage(Page.AllBets); 
                  //setFirstRun(false); 
                }}>all bets</button>
              <button
                className={s.customBets_btn}
                data-active={activePage == Page.MyBets ? 'active' : ''}
                disabled={!isConnected}
                onClick={() => {
                  //setActivePage(Page.MyBets); 
                  //setFirstRun(true); 
                }}>my bets</button>
            </div>
          )
        }
      </div>
      <div className={s.customBets_body}>
        <div className={s.customBets_titles_list}>
          <span className={s.customBets_titles_list_item}>Time</span>
          <span className={s.customBets_titles_list_item}>Game</span>
          <span className={s.customBets_titles_list_item}>Player</span>
          <span className={s.customBets_titles_list_item} data-id='address'>Address</span>
          <span className={s.customBets_titles_list_item} data-id='wager'>Wager</span>
          <span className={s.customBets_titles_list_item} data-id='multiplier'>Multiplier</span>
          <span className={s.customBets_titles_list_item} data-id='profit'>Profit</span>
          <span className={s.customBets_titles_list_item} data-id='explorer'>Explorer</span>
        </div>
        <div className={s.customBets_list}>
          {
            Bets && AvailableBlocksExplorers &&
            // Bets.map((bet, ind) => {
            //     const time = new Date(bet.timestamp * 1000);
            //     const wager = parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2));
            //     const profit = parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2));
            //     return (<CustomBetsItem trx_url={`${AvailableBlocksExplorers.get(bet.network_id)}/tx/${bet.transaction_hash}`}
            //         key={ind}
            //         time={{
            //             date: `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`,
            //             time: `${time.getHours()}:${("0" + time.getMinutes()).slice(-2)}`
            //         }}
            //         //game_url={`/games/${bet.game_name}`}
            //         game_name={bet.game_name}
            //         player_address={bet.player}
            //         player_name={bet.player_nickname == null ?
            //             `${bet.player.slice(0, 5)}...${bet.player.slice(38, 42)}` : bet.player_nickname}
            //         wager={wager}
            //         multiplier={parseFloat((profit / (wager * bet.bets)).toFixed(2))}
            //         profit={profit} />);
            // })
            // (newBet || Bets) && AvailableBlocksExplorers && (activePage == Page.MyBets ?
            //   Bets.filter((bet) => bet.player.toLowerCase() == address?.toLowerCase()).map((bet, ind) => {
            //     const time = new Date(bet.timestamp * 1000);
            //     const wager = parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2));
            //     const profit = parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2));
            //     return (<CustomBetsItem trx_url={`${AvailableBlocksExplorers.get(bet.network_id)}/tx/${bet.transaction_hash}`}
            //       key={ind}
            //       time={{
            //         date: `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`,
            //         time: `${time.getHours()}:${("0" + time.getMinutes()).slice(-2)}`
            //       }}
            //       //game_url={`/games/${bet.game_name}`}
            //       game_name={bet.game_name}
            //       player_address={bet.player}
            //       player_name={bet.player_nickname == null ?
            //         `${bet.player.slice(0, 5)}...${bet.player.slice(38, 42)}` : bet.player_nickname}
            //       wager={wager}
            //       multiplier={parseFloat((profit / (wager * bet.bets)).toFixed(2))}
            //       profit={profit} />);
            //   }) :
            Bets.map((bet, ind) => {
              const time = new Date(bet.timestamp * 1000);
              const wager = parseFloat((Number(bet.wager) / (10 ** 18)).toFixed(2));
              const profit = parseFloat((Number(bet.profit) / (10 ** 18)).toFixed(2));
              return (<CustomBetsItem trx_url={`${AvailableBlocksExplorers.get(bet.network_id)}/tx/${bet.transaction_hash}`}
                key={ind}
                time={{
                  date: `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`,
                  time: `${time.getHours()}:${("0" + time.getMinutes()).slice(-2)}`
                }}
                //game_url={`/games/${bet.game_name}`}
                game_name={bet.game_name}
                player_address={bet.player}
                player_name={bet.player_nickname == null ?
                  `${bet.player.slice(0, 5)}...${bet.player.slice(38, 42)}` : bet.player_nickname}
                wager={wager}
                multiplier={parseFloat((profit / (wager * bet.bets)).toFixed(2))}
                profit={profit} />);
            })
            //)
          }
        </div>
      </div>
      {/*<button className={s.custombets_loadmore_btn}>Load more</button>*/}
    </div>
  )
}