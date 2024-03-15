import { FC, useEffect, useState } from "react";
import styles from "./ui.module.scss";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import Link from "next/link";
import * as api from "@/shared/api";
import { useMediaQuery } from "@/shared/tools";
import clsx from "clsx";
import appleIcon from "@/public/media/apples_icon/apple_icon.jpg";
import diceIcon from "@/public/media/live_bets/dice.svg";
import coinFlipIcon from "@/public/media/live_bets/coinFlip.svg";
import pokerIcon from "@/public/media/live_bets/poker.svg";
import rpsIcon from "@/public/media/live_bets/rps.svg";
import bombIcon from "@/public/media/live_bets/bomb.svg";
import plincoIcon from "@/public/media/live_bets/plinco.svg";
import wheelIcon from "@/public/media/wheel_icons/wheel_icon.jpg";
import rocketIcon from "@/public/media/games_assets/rocket/rocket_icon.png";
import slotsIcon from "@/public/media/games_assets/slots/slots_icon.png";
import carIcon from "@/public/media/cars/icon.jpg";
import thimbleIcon from "@/public/media/thimbles/icon.jpg";
import rouletteIcon from "@/public/media/roulette_icons/roulette.jpg";
import { CustomBetsItemProps } from "./ui";

export const TableItem: FC<CustomBetsItemProps> = (props) => {
  const isMedium = useMediaQuery("(max-width: 1280px)");
  const [gameImg, setGameImg] = useState(pokerIcon);
  const [avaSize, setAvaSize] = useState("30");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (screenWidth < 650) {
      setAvaSize("20");
    } else {
      setAvaSize("30");
    }
  }, [screenWidth]);

  const [gamesList] = useU.it([GameModel.$gamesList]);
  useEffect(() => {
    if (
      gamesList.find((item) => item.id === props.game_id)?.name === "CoinFlip"
    ) {
      setGameImg(coinFlipIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Dice"
    ) {
      setGameImg(diceIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Mines"
    ) {
      setGameImg(bombIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "RPS"
    ) {
      setGameImg(rpsIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Poker"
    ) {
      setGameImg(pokerIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Plinko"
    ) {
      setGameImg(plincoIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Slots"
    ) {
      setGameImg(slotsIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Rocket"
    ) {
      setGameImg(rocketIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Wheel"
    ) {
      setGameImg(wheelIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Apples"
    ) {
      setGameImg(appleIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Cars"
    ) {
      setGameImg(carIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Thimbles"
    ) {
      setGameImg(thimbleIcon);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Race"
    ) {
      setGameImg(raceIson);
    } else if (
      gamesList.find((item) => item.id === props.game_id)?.name === "Roulette"
    ) {
      setGameImg(rouletteIcon);
    }
  });
  return (
    <>
      <td className={styles.td}>
        <span>
          <Link
            href={props.trx_url}
            target="_blank"
            className={styles.link_block}
          >
            {/* <span className={styles.date}>{props.time.date}</span> */}
            {/* <span className={styles.time}>{props.time.time}</span> */}
          </Link>
        </span>
      </td>
      <td className={styles.td}>
        <Link
          href={`/games/${props.game_name}`}
          target="_blank"
          className={styles.link_block}
        >
          <img
            src={gameImg.src}
            className={styles.game_ico}
            alt="game-ico-preview"
          />
          <span className={styles.game}>{props.game_name}</span>
        </Link>
      </td>
      <td className={styles.td}>
        <Link
          href={`/account/${props.player_address}`}
          target="_blank"
          className={styles.link_block}
        >
          <div className={styles.blockies_ava_wrap}>
            {/* <BlockiesAva size={avaSize} address={props.ava_address} /> */}
          </div>
          <span className={styles.player_name}>{props.nickName}</span>
        </Link>
      </td>
      <td className={styles.td}>
        {/* <Link
              href={`/account/${props.player_address}`}
              target="_blank"
              className={styles.link_block}
            >
              {isMedium ? (
                <span className={styles.link_block}>
                  <img
                    src={linkIco.src}
                    width={22}
                    height={22}
                    className={styles.linkIco}
                  />
                </span>
              ) : (
                <span className={styles.address}>{`${props.player_address.slice(
                  0,
                  5
                )}...${props.player_address.slice(38, 42)}`}</span>
              )} */}
        {/* // TODO: Clear address explorer? @habdevs <img src={linkIco.src} width={22} height={22} />*/}
        {/* </Link> */}
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <img
            src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
            alt="wager-ico"
            className={styles.wagerIco}
          />
          <span className={styles.item_wager}>{props.bet?.wager}</span>
        </span>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <span className={styles.item_multiplier}>{props.multiplier}x</span>
        </span>
      </td>

      <td className={styles.td}>
        <span className={clsx(styles.link_block, styles.link_block_profit)}>
          <span className={styles.profit}>{props.profit}</span>
          <img
            src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
            alt="wager-ico"
            className={styles.wagerIco}
          />
        </span>
      </td>
      <td className={clsx(styles.td, styles.td_mobile)}>
        <span className={styles.link_block}>
          <img
            src={linkIco.src}
            width={22}
            height={22}
            className={styles.linkIco}
          />
        </span>
      </td>
    </>
  );
};
