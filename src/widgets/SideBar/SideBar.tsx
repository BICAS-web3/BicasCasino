import { FC, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import clsx from "clsx";

import s from "./styles.module.scss";

import {
  CoinButton,
  DiceButton,
  RPCButton,
  PokerButton,
  GamesIcon,
  ArrowIcon,
  SupportIcon,
} from "@/shared/SVGs";
import { MinesButton } from "@/shared/SVGs/MinesButton";
import { LeaderboardIcon } from "@/shared/SVGs/LeaderboardIcon";

import tgClosedSidebarIco from "@/public/media/sidebar_icons/TelegramIco.svg";

import { LanguageSwitcher } from "@/widgets/LanguageSwitcher/LanguageSwitcher";

import * as SideBarModel from "./model";

import { Swap } from "../Swap";
import { SettingIcon } from "@/shared/SVGs/SettingIcon";

const gamesList = [
  {
    title: "Coinflip",
    icon: "coin",
    link: "/games/CoinFlip",
  },
  {
    title: "Dice",
    icon: "dice",
    link: "/games/Dice",
  },
  {
    title: "Rock paper scissors",
    icon: "rps",
    link: "/games/RPS",
  },
  {
    title: "Poker",
    icon: "poker",
    link: "/games/Poker",
  },
  {
    title: "Mines",
    icon: "mines",
    link: "/games/Mines",
  },
];

interface GameIconProps {
  iconId: string;
}

const GameIcon: FC<GameIconProps> = ({ iconId }) => {
  if (iconId === "coin") {
    return <CoinButton />;
  } else if (iconId === "dice") {
    return <DiceButton />;
  } else if (iconId === "rps") {
    return <RPCButton />;
  } else if (iconId === "poker") {
    return <PokerButton />;
  } else if (iconId === "mines") {
    return <MinesButton />;
  } else {
    return <h3>no games yet</h3>;
  }
};

interface ClosedSideBarProps {
  pickedGame: number | null;
}
const ClosedSideBar: FC<ClosedSideBarProps> = (props) => {
  return (
    <div className={s.side_bar_upper}>
      <div>
        <div className={`${s.games_button}`}>
          <GamesIcon />
          <div className={s.games_button_tooltip}>
            <div className={s.tooltip_games_list}>
              {gamesList.map((item, ind) => (
                <div
                  className={s.tooltip_games_list_item}
                  onClick={() => {
                    location.href = item.link;
                  }}
                >
                  <GameIcon iconId={item.icon} />
                  <span className={s.tooltip_games_list_item_title}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.buttons_holder}>
          <div
            className={`${s.button_wrap} ${
              props.pickedGame == 0 ? s.button_picked : ""
            }`}
            onClick={() => {
              location.href = "/games/CoinFlip";
            }}
          >
            <div className={s.button}>
              <CoinButton />
              <div className={s.games_button_tooltip}>Coinflip</div>
            </div>
          </div>
          <div className={s.button_wrap}>
            <div
              className={`${s.button} ${
                props.pickedGame == 1 ? s.button_picked : ""
              }`}
            >
              <DiceButton />
              <div className={s.games_button_tooltip}>Dice</div>
            </div>
          </div>
          <div
            className={`${s.button_wrap} ${
              props.pickedGame == 2 ? s.button_picked : ""
            }`}
          >
            <div className={s.button}>
              <RPCButton />
              <div className={s.games_button_tooltip}>Rock paper scissors</div>
            </div>
          </div>
          <div
            className={`${s.button_wrap} ${
              props.pickedGame == 3 ? s.button_picked : ""
            }`}
            onClick={() => {
              location.href = "/games/Poker";
            }}
          >
            <div className={s.button}>
              <PokerButton />
              <div className={s.games_button_tooltip}>Poker</div>
            </div>
          </div>
          <div
            className={clsx(
              s.button_wrap,
              props.pickedGame == 3 && s.button_picked,
              s.border_wrapper
            )}
            onClick={() => {
              location.href = "/leaderboard";
            }}
          >
            <div className={clsx(s.button, s.button_leaderboard)}>
              <LeaderboardIcon />
              <div className={s.games_button_tooltip}>Leaderboard</div>
            </div>
          </div>
          <Swap
            closeClassName={clsx(
              s.button_wrap,
              props.pickedGame == 3 && s.button_picked,
              s.swap_wrapper
            )}
          />
          <div
            className={clsx(
              s.button_wrap,
              props.pickedGame == 3 && s.button_picked,
              s.border_wrapper
            )}
            onClick={() => {
              location.href = "https://t.me/GKSupportt";
            }}
          >
            <div className={s.button}>
              <SupportIcon />
              <div className={s.games_button_tooltip}>
                Support{" "}
                <Image
                  className={s.tg_sidebar_ico}
                  src={tgClosedSidebarIco}
                  alt={""}
                />{" "}
              </div>
            </div>
          </div>
          <div
            className={clsx(s.button_wrap, s.border_wrapper)}
            onClick={() => {
              location.href = "/leaderboard";
            }}
          >
            <div className={s.settings}>
              <SettingIcon />
              <div className={s.games_button_tooltip}>Setting</div>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

interface OpenedSideBarProps {
  pickedGame: number | null;
}
const OpenedSideBar: FC<OpenedSideBarProps> = (props) => {
  const [gamesAreOpen, setOpen] = useState(true);
  return (
    <>
      <div className={s.side_bar_upper}>
        <div className={s.upper_blocks}>
          <div
            className={clsx(
              s.buttons_menu,
              !gamesAreOpen && s.buttons_menu_closed
            )}
          >
            <div
              className={s.menu_header}
              onClick={() => {
                setOpen(!gamesAreOpen);
              }}
            >
              <div className={s.header_icon_container}>
                <GamesIcon />
                GAMES
              </div>
              <div
                className={
                  (s.arrow, gamesAreOpen ? s.arrow_down : s.arrow_side)
                }
              >
                <ArrowIcon />
              </div>
            </div>
            <div className={s.game_rows}>
              <div
                className={clsx(s.game_row, s.picked_game_row)}
                onClick={() => {
                  location.href = "/games/CoinFlip";
                }}
              >
                <CoinButton />
                Coinflip
              </div>
              <div className={s.game_row}>
                <DiceButton />
                Dice
              </div>
              <div className={s.game_row}>
                <RPCButton />
                Rock Paper Scissors
              </div>
              <div
                className={s.game_row}
                onClick={() => {
                  location.href = "/games/Poker";
                }}
              >
                <PokerButton />
                Poker
              </div>
              <div
                className={s.game_row}
                onClick={() => {
                  location.href = "/games/Poker";
                }}
              >
                <MinesButton />
                Mines
              </div>
            </div>
          </div>{" "}
          <div
            className={clsx(s.leaderboard)}
            onClick={() => {
              location.href = "/games/CoinFlip";
            }}
          >
            <LeaderboardIcon />
            LeaderBoard
          </div>
          <div
            className={s.support}
            onClick={() => {
              location.href = "https://t.me/GKSupportt";
            }}
          >
            <div className={s.icon_wrapper}>
              <SupportIcon />
            </div>
            <div className={s.large_header_text}>SUPPORT</div>
          </div>
          <Swap />
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
};

export interface SideBarProps {}
export const SideBar: FC<SideBarProps> = (props) => {
  const [isOpen, currentPick] = useUnit([
    SideBarModel.$isOpen,
    SideBarModel.$currentPick,
  ]);

  return (
    <div
      className={`${s.side_bar} ${
        isOpen ? s.side_bar_opened : s.side_bar_closed
      }`}
    >
      {isOpen ? (
        <OpenedSideBar pickedGame={currentPick} />
      ) : (
        <ClosedSideBar pickedGame={currentPick} />
      )}
    </div>
  );
};
