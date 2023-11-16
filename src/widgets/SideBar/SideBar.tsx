import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import clsx from "clsx";
import rightArr from "@/public/media/sidebar_icons/rightArrIco.png";
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

import * as SideBarModel from "./model";

import { Swap } from "../Swap";
import { SettingIcon } from "@/shared/SVGs/SettingIcon";
import { StarIcon } from "@/shared/SVGs/StarIcon";
import { PlinkoButton } from "@/shared/SVGs/PlinkoButton";
import { BonusIco } from "@/shared/SVGs/BonusIco";
import { NftIco } from "@/shared/SVGs/NftIco";
import { AffilateIco } from "@/shared/SVGs/AffilateIco";
import { HTPico } from "@/shared/SVGs/HTPico";
import { CloseSbIco } from "@/shared/SVGs/CloseSbIco";
import { MoonIco } from "@/shared/SVGs/MoonIco";
import { SunIco } from "@/shared/SVGs/SunIco";

import usaIco from "@/public/media/countries_images/usaIco.png";
import uaIco from "@/public/media/countries_images/uaIco.png";
import indIco from "@/public/media/countries_images/indiaIco.png";
import chinaIco from "@/public/media/countries_images/chinaIco.png";
import portugalIco from "@/public/media/countries_images/portugalIco.png";
import spainIco from "@/public/media/countries_images/spainIco.png";

import logo from "@/public/media/brand_images/footerLogo.svg";
import closeIco from "@/public/media/misc/close.svg";

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
    link: "/games/RockPaperScissors",
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
  {
    title: "Plinko",
    icon: "plinko",
    link: "/games/Plinko",
  },
];

const languagesList = [
  {
    ico: usaIco,
    id: "usa",
    title: "usa",
    mobTitle: "english",
  },
  {
    ico: uaIco,
    id: "ua",
    title: "ua",
    mobTitle: "ukranian",
  },
  {
    ico: indIco,
    id: "india",
    title: "in",
    mobTitle: "indian",
  },
  {
    ico: chinaIco,
    id: "china",
    title: "cn",
    mobTitle: "chinise",
  },
  {
    ico: portugalIco,
    id: "portugal",
    title: "pt",
    mobTitle: "portuguese",
  },
  {
    ico: spainIco,
    id: "spain",
    title: "es",
    mobTitle: "spanish",
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
  } else if (iconId === "plinko") {
    return <PlinkoButton />;
  } else {
    return <h3>no games yet</h3>;
  }
};

interface ClosedSideBarProps {
  pickedGame: number | null;
  activePage: string | undefined;
}
const ClosedSideBar: FC<ClosedSideBarProps> = (props) => {
  const [flipOpen, isOpen] = useUnit([
    SideBarModel.flipOpen,
    SideBarModel.$isOpen,
  ]);

  return (
    <>
      <div className={s.closed_sb_group}>
        <div className={s.closed_sb_bonus_ico}>
          <BonusIco />
          <div className={s.closed_sb_tooltip} data-id="bonus-tooltip">
            Bonus
          </div>
        </div>
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
      </div>
      <div className={s.closed_sb_other_info_list}>
        <div className={s.closed_sb_other_info_list_item}>
          <HTPico />
          <div className={s.closed_sb_tooltip} data-id="htp-tooltip">
            How to play
          </div>
        </div>
        <div
          onClick={() =>
            window.open(
              "https://element.market/collections/greekkeepers",
              "_blank"
            )
          }
          className={s.closed_sb_other_info_list_item}
        >
          <NftIco />
          <div className={s.closed_sb_tooltip} data-id="nft-tooltip">
            NFT Market
          </div>
        </div>
        <div className={s.closed_sb_other_info_list_item}>
          <AffilateIco />
          <div className={s.closed_sb_tooltip} data-id="affilate-tooltip">
            Affilate
          </div>
        </div>

        {/* <div className={s.closed_sb_other_info_list_item}>
            <SwaptIcon />
          </div> */}
        <div className={s.closed_swap_wrap}>
          <Swap closeClassName={s.closed_sb_other_info_list_item} />
          <div className={s.closed_sb_tooltip} data-id="swap-tooltip">
            Swap
          </div>
        </div>
        <div className={s.closed_sb_other_info_list_item}>
          <SupportIcon />
          <div className={s.closed_sb_tooltip} data-id="support-tooltip">
            Support
          </div>
        </div>
      </div>
    </>
  );
};

interface OpenedSideBarProps {
  pickedGame: number | null;
  activePage: string | undefined;
}
const OpenedSideBar: FC<OpenedSideBarProps> = (props) => {
  const [gamesAreOpen, setOpen] = useState(true);
  const [activeTheme, setActiveTheme] = useState("dark");
  const handleChangeTheme = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark");
  };
  const [activeLanguage, setActiveLanguage] = useState(languagesList[0]);
  const [activeLanguagesList, setActiveLanguagesList] = useState(languagesList);

  const [flipOpen, isOpen, activeLanguagesBlock, setActiveLanguagesBlock] =
    useUnit([
      SideBarModel.flipOpen,
      SideBarModel.$isOpen,
      SideBarModel.$mobileLanguageBlock,
      SideBarModel.setMobileLanguageBlock,
    ]);

  useEffect(() => {
    if (activeLanguagesBlock) {
      const el = document.getElementById("sidebar");
      el?.classList.add(s.scrollDisable);
      el?.scrollTo(0, 0);
    }
  }, [activeLanguagesBlock]);

  const handleLanguageChange = (id: any) => {
    const lang = languagesList.filter((item) => item.id === id)[0];
    setActiveLanguage(lang);
  };

  return (
    <>
      <div className={s.upper_blocks}>
        <div
          className={`${s.mobile_languages_block} ${
            activeLanguagesBlock === true && s.visible
          }`}
        >
          <div className={s.mobile_languages_block_body}>
            <div className={s.mobile_languages_block_nav}>
              <div
                className={s.mobile_languages_block_nav_left}
                onClick={() => setActiveLanguagesBlock(false)}
              >
                <Image src={rightArr} alt="back" />
                Back
              </div>
              <span className={s.mobile_languages_block_title}>Language</span>
            </div>
            <div className={s.mobile_languages_block_list}>
              {activeLanguagesList.map((item, ind) => (
                <div
                  className={s.mobile_languages_block_list_item}
                  onClick={() => handleLanguageChange(item.id)}
                >
                  <div className={s.mobile_languages_block_list_item_left}>
                    <Image src={item.ico} alt={item.id} />
                    {item.mobTitle}
                  </div>
                  <div
                    className={`${
                      s.mobile_languages_block_list_item_checkbox
                    } ${activeLanguage.id === item.id && s.active_checkbox}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.bonus_button_block}>
          <BonusIco />
          bonus<span className={s.soon_page}>Soon…</span>
        </div>
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
            <div
              className={`${s.header_icon_container} ${
                !gamesAreOpen && s.games_closed
              }`}
            >
              <GamesIcon />
              <span className={s.header_icon_title}>games</span>
            </div>
            <div
              className={(s.arrow, gamesAreOpen ? s.arrow_down : s.arrow_side)}
            >
              <ArrowIcon />
            </div>
          </div>
          <div className={s.game_rows}>
            <div
              className={`${s.game_row} ${
                props.activePage === "/games/CoinFlip" && s.game_active
              }`}
              onClick={() => {
                location.href = "/games/CoinFlip";
              }}
            >
              <CoinButton />
              Coinflip
            </div>
            <div
              className={`${s.game_row} ${
                props.activePage === "/games/Dice" && s.game_active
              }`}
              onClick={() => {
                location.href = "/games/Dice";
              }}
            >
              <DiceButton />
              Dice
            </div>
            <div
              className={`${s.game_row} ${
                props.activePage === "/games/RockPaperScissors" && s.game_active
              }`}
              onClick={() => {
                location.href = "/games/RockPaperScissors";
              }}
            >
              <RPCButton />
              Rock Paper Scissors
            </div>
            <div
              className={`${s.game_row} ${
                props.activePage === "/games/Poker" && s.game_active
              }`}
              onClick={() => {
                location.href = "/games/Poker";
              }}
            >
              <PokerButton />
              Poker
            </div>
            <div
              className={`${s.game_row} ${
                props.activePage === "/games/Plinko" && s.game_active
              }`}
              onClick={() => {
                location.href = "/games/Plinko";
              }}
            >
              <PlinkoButton />
              Plinko
            </div>
            <div
              className={clsx(s.leaderboard)}
              onClick={() => {
                location.href = "/leaderboard";
              }}
            >
              <LeaderboardIcon />
              LeaderBoard
            </div>
          </div>
        </div>
        <div className={s.sb_other_info_list}>
          <div className={s.oth_info_list_item}>
            <div className={s.icon_wrapper}>
              <HTPico />
            </div>
            <div className={s.large_header_text}>
              how to play <span className={s.soon_page}>Soon…</span>
            </div>
          </div>
          <div
            onClick={() =>
              window.open(
                "https://element.market/collections/greekkeepers",
                "_blank"
              )
            }
            className={s.oth_info_list_item}
          >
            <div className={s.icon_wrapper}>
              <NftIco />
            </div>
            <div className={s.large_header_text}>nft market</div>
          </div>
          <div className={s.oth_info_list_item}>
            <div className={s.icon_wrapper}>
              <AffilateIco />
            </div>
            <div className={s.large_header_text}>
              affiliate <span className={s.soon_page}>Soon…</span>
            </div>
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
            <div className={s.large_header_text}>support</div>
          </div>
          <Swap />
        </div>
        <div
          className={s.desk_hidden_language_block}
          onClick={() => setActiveLanguagesBlock(true)}
        >
          <div className={s.desk_hidden_active_language_block}>
            <Image src={activeLanguage.ico} alt="active_language_ico" />
            <span className={s.desk_hidden_language_title}>language</span>
          </div>
          <Image src={rightArr} alt="right-arr" />
        </div>
        <div className={s.desk_hidden_theme_block}>
          <div className={s.desk_hidden_active_language_block}>
            <MoonIco />
            <span className={s.desk_hidden_language_title}>dark theme</span>
          </div>
          <div className={s.change_theme_block}></div>
        </div>
      </div>
    </>
  );
};

export interface SideBarProps {
  activePage: string | undefined;
}
export const SideBar: FC<SideBarProps> = ({ activePage }) => {
  const [activeTheme, setActiveTheme] = useState("dark");
  const handleChangeTheme = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark");
  };
  const [activeLanguage, setActiveLanguage] = useState(languagesList[0]);
  const [activeLanguagesList, setActiveLanguagesList] = useState(languagesList);
  const [isOpen, currentPick, closeSb, openSb, languageMobileBlock] = useUnit([
    SideBarModel.$isOpen,
    SideBarModel.$currentPick,
    SideBarModel.Close,
    SideBarModel.Open,
    SideBarModel.$mobileLanguageBlock,
  ]);

  useEffect(() => {
    if (!languageMobileBlock) {
      const el = document.getElementById("sidebar");
      el?.classList.remove(s.scrollDisable);
    }
  }, [languageMobileBlock]);

  const [sidebarScroll, setSidebarScroll] = useState(0);

  useEffect(() => {
    const el = document.getElementById("sidebar_id");

    const handleScroll = (e: any) => {
      setSidebarScroll(e.target.scrollTop);
    };

    el?.addEventListener("scroll", handleScroll);

    return () => {
      el?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("SCROLLED -------", sidebarScroll);
  }, [sidebarScroll]);

  const handleSidebar = () => {
    if (isOpen) {
      closeSb();
    } else {
      openSb();
    }
  };

  useEffect(() => {
    setActiveLanguagesList(
      languagesList.filter((item) => item.id !== activeLanguage.id)
    );
  }, [activeLanguage]);

  const handleLanguageChange = (id: any) => {
    const lang = languagesList.filter((item) => item.id === id)[0];
    setActiveLanguage(lang);
  };

  return (
    <div
      className={`${s.side_bar} ${
        isOpen ? s.side_bar_opened : s.side_bar_closed
      } ${languageMobileBlock && s.mobile_blocks_hidden}`}
      id="sidebar"
    >
      <div
        className={s.side_bar_upper}
        id="sidebar_id"
        style={{ "--st": `${sidebarScroll}px` } as any}
      >
        {isOpen ? (
          <OpenedSideBar pickedGame={currentPick} activePage={activePage} />
        ) : (
          <ClosedSideBar pickedGame={currentPick} activePage={activePage} />
        )}
      </div>

      <div
        className={`${s.bottom_fixed_block} ${!isOpen && s.bottom_nav_closed}`}
      >
        <div className={s.themes_block}>
          <div
            className={`${s.theme_block} ${activeTheme === "dark" && s.active}`}
            onClick={handleChangeTheme}
          >
            <MoonIco />
          </div>
          <div
            className={`${s.theme_block} ${
              activeTheme === "light" && s.active
            }`}
            onClick={handleChangeTheme}
          >
            <SunIco />
          </div>
          <div
            className={s.desk_hidden_theme_changer}
            onClick={handleChangeTheme}
          >
            <MoonIco />
          </div>
        </div>
        <div className={s.language_changer_block}>
          <Image src={activeLanguage.ico} alt={activeLanguage.id} />
          <div className={s.languages_list}>
            {activeLanguagesList.map((item, ind) => (
              <div
                key={ind}
                className={s.languages_list_item}
                onClick={() => handleLanguageChange(item.id)}
              >
                <Image src={item.ico} alt={item.id} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.close_sb_ico} onClick={handleSidebar}>
          <CloseSbIco />
        </div>
      </div>
    </div>
  );
};
