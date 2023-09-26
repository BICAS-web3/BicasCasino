import s from './styles.module.scss'
import { CustomBetsItem } from "@/widgets/CustomBets/CustomBetsItem";
import { FC, useEffect } from 'react';
import { LiveBetsModel } from '../LiveBets';
import { useUnit } from 'effector-react';
import { settingsModel } from '@/entities/settings';
import { T_BetInfo } from '@/shared/api';
import { sessionModel } from '@/entities/session';

export interface CustomBetsProps { title: string, isMainPage: boolean, isGamePage: boolean };
export const CustomBets: FC<CustomBetsProps> = props => {
  const [
    Bets,
    AvailableBlocksExplorers,
    newBet
  ] = useUnit([
    LiveBetsModel.$Bets,
    settingsModel.$AvailableBlocksExplorers,
    sessionModel.$newBet
  ]);

  useEffect(() => {
    console.log("New bets");
  }, [newBet, AvailableBlocksExplorers]);

  return (
    <div className={s.customBets_wrap}>
      <div className={s.customBets_header} style={{ justifyContent: props.isMainPage && 'center' }}>
        <h2 className={s.customBets_title}>
          {(props.isMainPage || props.isGamePage) && (<div className={s.customBets_title_circle}></div>)}
          {props.title}
        </h2>
        {
          props.isGamePage && (
            <div className={s.customBets_switch_bets_btns}>
              <button className={s.customBets_allBets_btn} data-active='active'>all bets</button>
              <button className={s.customBets_myBets_btn}>my bets</button>
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
            // Bets && AvailableBlocksExplorers && Bets.map((bet, ind) => {
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
            (newBet || Bets) && AvailableBlocksExplorers && Bets.map((bet, ind) => {
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
          }
        </div>
      </div>
      {/*<button className={s.custombets_loadmore_btn}>Load more</button>*/}
    </div>
  )
}