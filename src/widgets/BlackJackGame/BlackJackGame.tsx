import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import bg from "@/public/media/blackjack/bg.png";
import cardBack from "@/public/media/blackjack/backCardCopy.svg";
import testCard1 from "@/public/media/blackjack/cards/0/1.svg";
import clsx from "clsx";
import useSound from "use-sound";
import * as GameModel from "@/widgets/GamePage/model";
import { useUnit } from "effector-react";
import ReactHowler from "react-howler";

interface BlackJackGameProps {}

export const BlackJackGame: FC<BlackJackGameProps> = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [testCards, setTestCards] = useState([
    { id: "host", value: 1 }, // value это номинал карты 1 - туз, 2-двойка, 3- тройка и так далее.
    { id: "host", value: 1 },
    { id: "host", value: 1 },
    { id: "player", value: 1 },
    { id: "player", value: 1 },
    { id: "host", value: 1 },
    { id: "host", value: 1 },
    { id: "host", value: 1 },
    { id: "player", value: 1 },
    { id: "player", value: 1 },
  ]);

  const [dealerIndex, setDealerIndex] = useState(0);
  const [leftOffsetDealer, setLeftOffsetDealer] = useState(0);
  const [topOffsetDealer, setTopOffsetDealer] = useState(50); // растояние карт дилера от верха игрового поля
  const [leftOffsetPlayer, setLeftOffsetPlayer] = useState(0);
  const [bottomOffsetPlayer, setBottomOffsetPlayer] = useState(160); // растояние карт игрока от низа игрового поля
  const [playerIndex, setPlayerIndex] = useState(0);
  const [playSoundHost, setPlaySoundHost] = useState(false);
  const [musicType] = useUnit([GameModel.$playSounds]);
  const [is1280, setIs1280] = useState(false);
  const [is996, setIs996] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is400, setIs400] = useState(false);
  const [cardsTopGap, setCardsTopGap] = useState(15); // отступ от карты до карты сверху-снизу
  const [cardsLeftGap, setCardsLeftGap] = useState(35); // отступ от карты до карты слева

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width > 996) {
        setIs1280(true);
        setIs996(false);
        setIs650(false);
        setIs400(false);
      } else if (width < 996 && width > 650) {
        setIs1280(false);
        setIs996(true);
        setIs650(false);
        setIs400(false);
      } else if (width < 650 && width > 400) {
        setIs1280(false);
        setIs996(false);
        setIs650(true);
        setIs400(false);
      } else if (width < 400) {
        setIs1280(false);
        setIs996(false);
        setIs650(false);
        setIs400(true);
      } else {
        setIs1280(false);
        setIs996(false);
        setIs650(false);
        setIs400(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [playRedrawSound] = useSound(
    `/static/media/games_assets/poker/sounds/redrawCard.mp3`,
    { volume: 1 }
  ); // эта функция-звук почему то не срабатывает при вызове ее внутри toDealer() | toPlayer() поэтому я взял другую либу - ReactHowler

  /// для разных экранов ставим другие значения для нормального отображение карт

  useEffect(() => {
    // setBottomOffsetPlayer(100);
    if (is996) {
      setBottomOffsetPlayer(110);
      setTopOffsetDealer(25);
      setCardsLeftGap(13);
      setCardsTopGap(10);
    } else if (is650) {
      setBottomOffsetPlayer(95);
      setTopOffsetDealer(20);
      setCardsLeftGap(13);
      setCardsTopGap(10);
    } else if (is400) {
      setBottomOffsetPlayer(95);
      setTopOffsetDealer(20);
      setCardsLeftGap(13);
      setCardsTopGap(10);
    }
  }, [is1280, is996, is650, is400]);

  const toDealer = () => {
    musicType !== "off" && setPlaySoundHost(true);
    const dealerCards = document.querySelectorAll(`.bj-card-host`);
    // const cardToSend = document.getElementById(`bj-card-host-${dealerIndex}`);
    const cardToSend = dealerCards[dealerIndex];
    cardToSend?.classList.remove(s.flipped);
    cardToSend?.setAttribute(
      "style",
      `left: calc(${
        is996 || is650 ? "45%" : is400 ? "40%" : "48%"
      } + ${leftOffsetDealer}px); transform: translateX(-50%);  top: ${topOffsetDealer}px`
    );
    setDealerIndex((prevIndex) => prevIndex + 1);
    setLeftOffsetDealer((prevOffset) => prevOffset + cardsLeftGap);
    setTopOffsetDealer((prevOffset) => prevOffset + cardsTopGap);

    console.log("ELEM", dealerIndex);
  };

  const toPlayer = () => {
    musicType !== "off" && setPlaySoundHost(true);
    const playerCards = document.querySelectorAll(`.bj-card-player`);
    // const cardToSend = document.getElementById(`bj-card-player-${playerIndex}`);
    const cardToSend = playerCards[playerIndex];
    cardToSend?.classList.remove(s.flipped);
    cardToSend?.classList.add("card-on-table");
    // cardToSend?.setAttribute("card-value", `${test}`);
    cardToSend?.setAttribute(
      "style",
      `left: calc(${
        is996 || is650 ? "45%" : is400 ? "40%" : "48%" // разные значение left для нормального отображение на разных экранах
      } + ${leftOffsetPlayer}px); transform: translateX(-50%) translateY(-50%); top: calc(100% - ${bottomOffsetPlayer}px)`
    );
    setPlayerIndex((prevIndex) => prevIndex + 1);
    setLeftOffsetPlayer((prevOffset) => prevOffset + cardsLeftGap);
    setBottomOffsetPlayer((prevOffset) => prevOffset - cardsTopGap);
  };

  //// Тут я начал делать сплит карт, но не успел. Сейчас эта ф-ция отслеживает есть ли у игрока одинаковые карты и выводит их в консоль

  const split = () => {
    const playerCards = document.querySelectorAll(
      `.bj-card-player`
    ) as NodeListOf<HTMLElement>;
    const onTableCards = Array.from(playerCards).filter((card) =>
      card.classList.contains("card-on-table")
    );
    for (let i = 0; i < onTableCards.length; i++) {
      for (let j = i + 1; j < onTableCards.length; j++) {
        if (onTableCards[i].dataset.value === onTableCards[j].dataset.value) {
          console.log(onTableCards[i]);
          console.log(onTableCards[j]);
        }
      }
    }
  };

  return (
    <div
      className={s.bj_game_container}
      onClick={() => {
        toPlayer();
        toDealer();
        split();
      }}
    >
      <ReactHowler
        src={"/static/media/games_assets/poker/sounds/redrawCard.mp3"}
        playing={playSoundHost}
        onEnd={() => setPlaySoundHost(false)}
      />
      <div className={s.bg_img_wrap}>
        <img src={bg.src} className={s.bg_img} alt="static-bg" />
      </div>
      <div className={s.bj_body}>
        <div
          className={s.active_cards_wrap}
          // style={{ "--sx": `${leftOffset}px` } as any}
        >
          {testCards &&
            testCards.map((card, ind) => (
              <div
                id={`bj-card-${card.id}-${ind + 1}`}
                key={ind}
                className={clsx(s.card, s.flipped, `bj-card-${card.id}`)}
                data-value={card.value}
              >
                <div className={s.card_front}>
                  <img
                    src={testCard1.src}
                    className={s.card_front_img}
                    alt="front_card_static"
                  />
                </div>
                <div className={s.card_back}>
                  <img
                    src={cardBack.src}
                    className={s.card_back_img}
                    alt="backcard-static"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className={s.deck}>
          <div className={s.simulated_cards}>
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
            <img
              src={cardBack.src}
              className={s.simulated_cards_item}
              alt="static-card"
            />
          </div>
        </div>
        {/* <div className={s.bj_host_cards_wrap}>
          <div className={s.bj_host_cards}></div>
        </div>
        <div className={s.bj_player_cards_wrap}>
          <div className={s.bj_player_cards}></div>
        </div> */}
      </div>
    </div>
  );
};
