import { FC, useEffect, useState } from "react";

import { useUnit } from "effector-react";

import { settingsModel } from "@/entities/settings";

import clsx from "clsx";

import gold from "@/public/media/user_board/gold.webp";
import silver from "@/public/media/user_board/silver.webp";
import bronze from "@/public/media/user_board/bronze.webp";

import * as Api from "@/shared/api";

import s from "./style.module.scss";
import { TotalItem } from "./TotalItem";

export const Total: FC<{}> = () => {
  const [setLeaders, leaders] = useUnit([
    settingsModel.setAvailableLeader,
    settingsModel.$AvailableLeaderbord,
  ]);

  const [activeButton, setActiveButton] = useState<string | null>(
    "All Time_volume"
  );

  const setDefaultValue = async () => {
    const data = (await Api.getLeaderboard({ time: "all", return: "volume" }))
      .body as any;
    setLeaders(data.leaderboard as Api.T_Lider);
  };

  useEffect(() => {
    setDefaultValue();
  }, []);

  const handleButtonClick = async (period: string) => {
    setActiveButton(period);

    const toRequest =
      period === "All Time_profit" || "All Time_volume"
        ? period.toLowerCase().split(" ")[0] + "_" + period.split("_")[1]
        : period;

    const data = (
      await Api.getLeaderboard({
        time: toRequest.split("_")[0]?.toLowerCase(),
        return: toRequest.split("_")[1]?.toLowerCase(),
      })
    ).body as any;
    setLeaders(data.leaderboard as Api.T_Lider);
  };

  // const truncatedAddress = props.address.slice(0,7)...props.address.slice(36, 42);

  return (
    <>
      <div className={s.period}>
        <div className={s.period_column}>
          <div className={s.period_title}>Volume</div>
          <ul className={s.period_list}>
            {Api.TypeLeadboardApi.slice(0, 4).map((btn, i) => (
              <li key={i} className={s.period_item}>
                <button
                  type="button"
                  className={clsx(
                    s.period_button,
                    activeButton === btn && s.period_button_active
                  )}
                  onClick={() => handleButtonClick(btn)}
                >
                  {btn.split("_")[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.period_column}>
          <div className={s.period_title}>Cross Profit</div>
          <ul className={s.period_list}>
            {Api.TypeLeadboardApi.slice(4).map((btn, i) => (
              <li key={i} className={s.period_item}>
                <button
                  type="button"
                  className={clsx(
                    s.period_button,
                    activeButton === btn && s.period_button_active
                  )}
                  onClick={() => handleButtonClick(btn)}
                >
                  {btn.split("_")[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.total_container}>
        {Array.isArray(leaders) &&
          leaders &&
          leaders
            ?.slice(0, 3)
            ?.map((item: Api.T_LeaderBoardResponse, i: number) => {
              let image;
              switch (i) {
                case 0:
                  image = gold;
                  break;
                case 1:
                  image = silver;
                  break;
                case 2:
                  image = bronze;
                  break;
                default:
                  break;
              }

              const truncatedAddress = `${item.username.slice(
                0,
                7
              )}...${item.username.slice(36, 42)}`;

              return (
                <TotalItem
                  description={item.username || truncatedAddress}
                  dunkin="Dunkin Caps"
                  image={image}
                  dollar
                  statistics={Number(item.total).toFixed(4)}
                  id={i}
                  address={item.user_id}
                />
              );
            })}
      </div>
    </>
  );
};
