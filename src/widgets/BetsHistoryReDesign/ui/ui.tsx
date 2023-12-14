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
}

export const BetsHistoryReDesign: FC<IBetsHistoryReDesign> = (props) => {
  const [bets, setBets] = useState<api.T_BetInfo[]>([]);

  const [AvailableBlocksExplorers] = useUnit([
    settingsModel.$AvailableBlocksExplorers,
  ]);

  const getBets = async (id: number | null) => {
    var new_bets = (
      await api.getUserBets({
        address: props.address?.toLowerCase(),
        starting_id: id,
      })
    ).body as api.T_Bets;
    setBets(
      bets.length == 0 ? new_bets.bets : ([...bets, ...new_bets.bets] as any)
    );
  };

  useEffect(() => {
    const run = async () => {
      await getBets(null);
    };
    run();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.table_container}>
        {bets && bets?.length > 0 ? (
          <table className={styles.table}>
            <TitleTable />
            <tbody className={styles.tbody}>
              {AvailableBlocksExplorers &&
                bets.map((bet) => {
                  const time = new Date(bet.timestamp * 1000);
                  const wager = parseFloat(
                    (Number(bet.wager) / 10 ** 18).toFixed(2)
                  );
                  const profit = parseFloat(
                    (Number(bet.profit) / 10 ** 18).toFixed(2)
                  );
                  return (
                    <tr className={styles.table_row} key={bet.id}>
                      <TableItem
                        trx_url={`${AvailableBlocksExplorers.get(
                          bet.network_id
                        )}/tx/${bet.transaction_hash}`}
                        time={{
                          date: `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`,
                          time: `${time.getHours()}:${(
                            "0" + time.getMinutes()
                          ).slice(-2)}`,
                        }}
                        ava_address={props.address}
                        game_name={bet.game_name}
                        player_address={bet.player}
                        player_name={
                          bet.player_nickname == null
                            ? `${bet.player.slice(0, 5)}...${bet.player.slice(
                                38,
                                42
                              )}`
                            : bet.player_nickname
                        }
                        wager={wager}
                        multiplier={parseFloat(
                          (profit / (wager * bet.bets)).toFixed(2)
                        )}
                        profit={profit}
                        token={bet.token_name.toUpperCase()}
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
      {bets && bets?.length > 0 && (
        <div className={styles.button}>
          <CustomButton
            text="Load more"
            textColor="gray"
            color="dark"
            size="sm"
            onClick={async () => {
              await getBets(bets[bets.length - 1].id);
            }}
          />
        </div>
      )}
    </div>
  );
};
