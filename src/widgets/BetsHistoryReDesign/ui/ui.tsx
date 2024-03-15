"use client";
import { FC, useEffect, useState } from "react";
import { TitleTable } from "@/shared/ui/TitleTable/ui/ui";
import styles from "./ui.module.scss";
import { TableItem } from "@/shared/ui/TableItem";
import { CustomButton } from "@/shared/ui/CustomButton";
import * as api from "@/shared/api/";
import { useUnit } from "effector-react";
import { settingsModel } from "@/entities/settings";

// const bets = [
//   {
//     id: 1,
//     time: { date: "25.08.23", time: "17:05" },
//     game_name: "Dice",
//     player: "UserName",
//     wager: 11,
//     multiplier: 3,
//     profit: 5.34,
//     userBg: "#3DBCE5",
//     player_url: "test",
//     trx_url: "test",
//     game_url: "test",
//     network_icon: "test",
//     numBets: 1,
//     gameAddress: "0x563...4ba9",
//   },
//   {
//     id: 2,
//     time: { date: "25.08.23", time: "17:05" },
//     game_name: "Dice",
//     player: "UserName",
//     wager: 11,
//     multiplier: 3,
//     profit: 5.34,
//     userBg: "#3DBCE5",
//     player_url: "test",
//     trx_url: "test",
//     game_url: "test",
//     network_icon: "test",
//     numBets: 1,
//     gameAddress: "0x563...4ba9",
//   },
//   {
//     id: 3,
//     time: { date: "25.08.23", time: "17:05" },
//     game_name: "Dice",
//     player: "UserName",
//     wager: 11,
//     multiplier: 3,
//     profit: 5.34,
//     userBg: "#3DBCE5",
//     player_url: "test",
//     trx_url: "test",
//     game_url: "test",
//     network_icon: "test",
//     numBets: 1,
//     gameAddress: "0x563...4ba9",
//   },
//   {
//     id: 4,
//     time: { date: "25.08.23", time: "17:05" },
//     game_name: "Dice",
//     player: "UserName",
//     wager: 11,
//     multiplier: 3,
//     profit: 5.34,
//     userBg: "#3DBCE5",
//     player_url: "test",
//     trx_url: "test",
//     game_url: "test",
//     network_icon: "test",
//     numBets: 1,
//     gameAddress: "0x563...4ba9",
//   },
//   {
//     id: 5,
//     time: { date: "25.08.23", time: "17:05" },
//     game_name: "Dice",
//     player: "UserName",
//     wager: 11,
//     multiplier: 3,
//     profit: 5.34,
//     userBg: "#3DBCE5",
//     player_url: "test",
//     trx_url: "test",
//     game_url: "test",
//     network_icon: "test",
//     numBets: 1,
//     gameAddress: "0x563...4ba9",
//   },
//   {
//     id: 6,
//     time: { date: "25.08.23", time: "17:05" },
//     game_name: "Dice",
//     player: "UserName",
//     wager: 11,
//     multiplier: 3,
//     profit: 5.34,
//     userBg: "#3DBCE5",
//     player_url: "test",
//     trx_url: "test",
//     game_url: "test",
//     network_icon: "test",
//     numBets: 1,
//     gameAddress: "0x563...4ba9",
//   },
// ];
interface IBetsHistoryReDesign {
  title: string;
  address: string;
  nickName?: string;
  userId?: any;
}
import { LiveBetsModel } from "@/widgets/LiveBets";
import { sessionModel } from "@/entities/session";

export const BetsHistoryReDesign: FC<IBetsHistoryReDesign> = (props) => {
  const [Bets, setBets, AvailableBlocksExplorers, newBet] = useUnit([
    LiveBetsModel.$Bets,
    LiveBetsModel.setBets,
    settingsModel.$AvailableBlocksExplorers,
    sessionModel.$newBet,
  ]);

  // const [bets, setBets] = useState<api.T_BetInfo[]>([]);

  // const [AvailableBlocksExplorers] = useUnit([
  //   settingsModel.$AvailableBlocksExplorers,
  // ]);

  // const getBets = async (id: number | null) => {
  //   var new_bets = (
  //     await api.getUserBets({
  //       address: props.address?.toLowerCase(),
  //       starting_id: id,
  //     })
  //   ).body as api.T_Bets;
  //   setBets(
  //     bets.length == 0 ? new_bets.bets : ([...bets, ...new_bets.bets] as any)
  //   );
  // };

  // useEffect(() => {
  //   const run = async () => {
  //     await getBets(null);
  //   };
  //   run();
  // }, []);

  const [allBets, setAllBets] = useState([]);

  useEffect(() => {
    if (props.userId) {
      (async () => {
        // alert(1);
        const data = await api.getUserBets({
          address: props.userId,
          // starting_id: 0,
        });
        console.log(data);
        setAllBets((data.body as any)?.bets);
      })();
    }
  }, [props.userId]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.table_container}>
        {allBets && allBets?.length > 0 ? (
          <table className={styles.table}>
            <TitleTable />
            <tbody className={styles.tbody}>
              {allBets.map((bet: any) => {
                console.log("bet:::::", bet);
                const time = new Date(bet?.timestamp * 1000);
                console.log("time:", time);
                const wager = parseFloat(
                  (Number((bet as any)?.amount) / 10 ** 18).toFixed(2)
                );
                const profit = parseFloat(
                  (Number(bet?.profit) / 10 ** 18).toFixed(2)
                );
                const multiplier = parseFloat(
                  (profit / (wager * bet?.bets)).toFixed(2)
                );

                return (
                  <tr className={styles.table_row} key={bet.id}>
                    <TableItem
                      game_id={(bet as any).game_id}
                      user_id={(bet as any)?.user_id}
                      bet={bet}
                      trx_url=""
                      // key={ind}
                      time={{
                        date: `${time.getDate()}.${
                          time.getMonth() + 1
                        }.${time.getFullYear()}`,
                        time: `${time.getHours()}:${(
                          "0" + time.getMinutes()
                        ).slice(-2)}`,
                      }}
                      //game_url={`/games/${bet?.game_name}`}
                      game_name={bet?.game_name}
                      // wager={Number((bet as any)?.amount).toFixed(2)}
                      bets={bet?.bets}
                      multiplier={
                        (bet as any).bet_info &&
                        JSON.parse((bet as any).bet_info)?.multiplier
                          ? JSON.parse((bet as any).bet_info)?.multiplier
                          : isNaN(multiplier)
                          ? 0
                          : multiplier
                      }
                      profit={profit || 0}
                      key={bet.id}
                      id={bet.id}
                      token={bet?.token_name?.toUpperCase()}
                      num_games={(bet as any)?.num_games}
                      nickName={props.nickName}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className={styles.no_data}>No data yet</span>
        )}
      </div>
      {Bets && Bets?.length > 0 && (
        <div className={styles.button}>
          <CustomButton
            text="Load more"
            textColor="gray"
            color="dark"
            size="sm"
            // onClick={async () => {
            //   await getBets(bets[bets.length - 1].id);
            // }}
          />
        </div>
      )}
    </div>
  );
};
