import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import bg from "@/public/media/blackjack/bg.png";
import cardBack from "@/public/media/blackjack/backCardCopy.svg";
import clsx from "clsx";
import useSound from "use-sound";
import * as GameModel from "@/widgets/GamePage/model";
import { useUnit } from "effector-react";
import ReactHowler from "react-howler";
import * as BJModel from "./model";
import * as WagerModel from "@/widgets/WagerInputsBlock/model";
import cn from "clsx";

interface BlackJackGameProps {}

interface ICardType {
  id: string;
  value: number;
  suit: number;
  hostIsFirst?: boolean;
  hostIsFirst_2?: true;
}

type gameStatus = null | "win" | "lose";

export const BlackJackGame: FC<BlackJackGameProps> = () => {
  const [
    activeStep,
    dilerCount,
    userCount,
    setDilerCount,
    setUserCount,
    setActiveStep,
    cryptoValue,
    setCryptoValue,
  ] = useUnit([
    BJModel.$activeStep,
    BJModel.$dilerCount,
    BJModel.$userCount,
    BJModel.setDilerCount,
    BJModel.setUserCount,
    BJModel.setActiveStep,
    WagerModel.$cryptoValue,
    WagerModel.setCryptoValue,
  ]);

  const [resetCard, setResetCard] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
  const [testCards, setTestCards] = useState<ICardType[]>([
    { id: "host", value: 2, suit: 0 }, // value это номинал карты 1 - туз, 2-двойка, 3- тройка и так далее.
    { id: "host", value: 3, suit: 1, hostIsFirst: true, hostIsFirst_2: true },
    { id: "host", value: 10, suit: 2 },
    { id: "player", value: 1, suit: 3 },
    { id: "player", value: 2, suit: 0 },
    { id: "host", value: 13, suit: 1 },
    { id: "host", value: 6, suit: 2 },
    { id: "host", value: 1, suit: 3 },
    { id: "host", value: 5, suit: 1 },
    { id: "host", value: 6, suit: 2 },
    { id: "host", value: 1, suit: 3 },
    { id: "player", value: 3, suit: 0 },
    { id: "player", value: 4, suit: 1 },
    { id: "player", value: 5, suit: 0 },
    { id: "player", value: 12, suit: 1 },
    { id: "player", value: 7, suit: 0 },
    { id: "player", value: 8, suit: 1 },
    { id: "player", value: 9, suit: 0 },
    { id: "player", value: 10, suit: 1 },
  ]);

  useEffect(() => {
    if (resetCard) {
      const index = testCards.findIndex((el) => el.hostIsFirst);

      testCards[index].hostIsFirst = false;

      setTestCards(() => {
        return testCards;
      });
    }
  }, [resetCard]);

  const [gameStatus, setGameStatus] = useState<gameStatus>(null);
  const [isSplit, setIsSplit] = useState(false);

  useEffect(() => {
    if (userCount === 21) {
      setGameStatus("win");
    } else if (userCount > 21) {
      setGameStatus("lose");
    } else if (dilerCount > 21) {
      setGameStatus("win");
    }
  }, [dilerCount, userCount]);

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
  const [leftCards, setLeftCards] = useState<ICardType[]>([]);
  const [rightCards, setRightCards] = useState<ICardType[]>([]);

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

  const [dillerCounts, setDilerCount_] = useState(0);
  const [userCount_, setUserCoutn_] = useState(0);
  const toDealer = () => {
    setDilerCount_((prev) => prev + 1);
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
  };

  useEffect(() => {
    if (dillerCounts > 0) {
      const activeCard = testCards.filter((card) => card.id === "host");
      const getValue = activeCard.find((_, el) => el === dillerCounts - 1);
      const value = getValue?.value;
      if (value) {
        setDilerCount(dilerCount + value);
        if (dilerCount + value < 17 && dillerCounts > 2) {
          setTimeout(() => toDealer(), 800);
          if (!resetCard) {
            setResetCard(true);
          }
        } else if (dilerCount + value >= 17) {
          dilerCount + value > userCount
            ? setGameStatus("lose")
            : setGameStatus("win");
        }
      }
    }
  }, [dillerCounts]);

  const [isSecondCard, setIsSecondCard] = useState(false);
  const [gameRightStatus, setGameRightStatus] = useState<gameStatus>(null);
  const [gameLeftStatus, setGameLeftStatus] = useState<gameStatus>(null);
  const [splitGame, setSplitGame] = useState(0);

  const [userLeftCount, setUserLeftCount] = useState(0);
  const [userRightCount, setUserRightCount] = useState(0);

  const toPlayer = (
    isSplit?: boolean,
    side?: "left" | "right",
    callback?: any
  ) => {
    musicType !== "off" && setPlaySoundHost(true);
    const players = testCards.filter((el) => el.id === "player");
    const playerCards = document.querySelectorAll(`.bj-card-player`);
    // const cardToSend = document.getElementById(`bj-card-player-${playerIndex}`);
    const cardToSend = playerCards[playerIndex];
    playerCards[playerIndex];
    cardToSend?.classList.remove(s.flipped);
    cardToSend?.classList.add("card-on-table");
    cardToSend?.classList.add(s[`card_${playerIndex}`]);
    // cardToSend?.setAttribute("card-value", `${test}`);
    if (isSplit) {
      setSplitGame((prev) => prev + 1);
      if (side === "left") {
        setLeftCards((prev) => [...prev, players[splitGame]]);
        setUserLeftCount((prev) => prev + players[splitGame].value);
        cardToSend?.classList.add("card-on-table_left");
      } else {
        setRightCards((prev) => [...prev, players[splitGame]]);
        setUserRightCount((prev) => prev + players[splitGame].value);
        cardToSend?.classList.add("card-on-table_right");
      }
      cardToSend?.setAttribute(
        "style",
        `left: calc(${
          is996 || is650
            ? "45%"
            : is400
            ? "40%"
            : side === "left"
            ? "33%"
            : "58%" // разные значение left для нормального отображение на разных экранах
        } + ${
          side === "left"
            ? leftOffsetPlayer + 35 // -leftOffsetPlayer + 105  используйте отрицательное значение для левой карты
            : leftOffsetPlayer - 35 * (leftCards.length - 2) // используйте положительное значение для правой карты
        }px); transform: translateX(-50%) translateY(-50%); top: calc(100% - ${
          side === "left"
            ? bottomOffsetPlayer - 15
            : bottomOffsetPlayer + 15 * (leftCards.length - 2) // - 15
        }px)`
      );
      setIsSecondCard(false);
    } else {
      setUserCoutn_((prev) => prev + 1);
      cardToSend?.setAttribute(
        "style",
        `left: calc(${
          is996 || is650 ? "45%" : is400 ? "40%" : "48%" // разные значение left для нормального отображение на разных экранах
        } + ${leftOffsetPlayer}px); transform: translateX(-50%) translateY(-50%); top: calc(100% - ${bottomOffsetPlayer}px)`
      );
    }
    setPlayerIndex((prevIndex) => prevIndex + 1);
    setLeftOffsetPlayer(
      (prevOffset) => prevOffset + (isSplit ? cardsLeftGap / 1 : cardsLeftGap)
    );
    setBottomOffsetPlayer(
      (prevOffset) => prevOffset - (isSplit ? cardsTopGap / 1 : cardsTopGap)
    );
    if (callback) {
      callback();
    }
    // if (recall && isSplit) {
    //   setTimeout(() => {
    //     toPlayer(true, "right", () => {});
    //     setRecall(false);
    //     // alert(1111);
    //   }, 700);
    // }
  };

  useEffect(() => {
    if (userCount_ === 2) {
      const activeCard_1 = testCards.filter((card) => card.id === "player")[0];
      const activeCard_2 = testCards.filter((card) => card.id === "player")[1];
      if (
        (activeCard_1.value === 1 && activeCard_2.value === 11) ||
        (activeCard_1.value === 1 && activeCard_2.value === 12) ||
        (activeCard_1.value === 1 && activeCard_2.value === 13)
      ) {
        setUserCount(21);
        setGameStatus("win");
      }
    }
    if (userCount_ > 0) {
      const activeCard = testCards.filter((card) => card.id === "player");
      const getValue = activeCard.find((_, el) => el === userCount_ - 1);
      const value = getValue?.value;
      if (value) {
        setUserCount(userCount + value);
      }
    }
  }, [userCount_]);

  //// Тут я начал делать сплит карт, но не успел. Сейчас эта ф-ция отслеживает есть ли у игрока одинаковые карты и выводит их в консоль

  const toSplit = () => {
    const firstCard = document.querySelectorAll(`.bj-card-player`)[0];
    const secondCard = document.querySelectorAll(`.bj-card-player`)[1];
    firstCard.setAttribute(
      "style",
      `left: calc(${
        is996 || is650 ? "45%" : is400 ? "40%" : "58%" // разные значение left для нормального отображение на разных экранах
      } + ${leftOffsetPlayer}px); transform: translateX(-50%) translateY(-50%); top: calc(100% - ${bottomOffsetPlayer}px)`
    );
    secondCard.setAttribute(
      "style",
      `left: calc(${
        is996 || is650 ? "45%" : is400 ? "40%" : "33%" // разные значение left для нормального отображение на разных экранах
      } + ${leftOffsetPlayer}px); transform: translateX(-50%) translateY(-50%); top: calc(100% - ${bottomOffsetPlayer}px)`
    );
    setIsSecondCard(true);
    // setLeftOffsetPlayer((prevOffset) => prevOffset + cardsLeftGap);
    // setBottomOffsetPlayer((prevOffset) => prevOffset - cardsTopGap);
    const activeCard_1 = testCards.filter((card) => card.id === "player")[0];
    const activeCard_2 = testCards.filter((card) => card.id === "player")[1];
    if (activeCard_1 && activeCard_2) {
      setSplitGame(2);
    }

    const players = testCards.filter((el) => el.id === "player");

    setLeftCards((prev) => [...prev, players[1]]);
    setRightCards((prev) => [...prev, players[0]]);
    setUserLeftCount((prev) => prev + players[1].value);
    setUserRightCount((prev) => prev + players[0].value);
  };

  const [firstStep, setFirstStep] = useState(true);

  useEffect(() => {
    if (!firstStep) {
      Promise.all([
        new Promise((resolve) => setTimeout(() => resolve(toDealer()), 1200)),
        new Promise((resolve) => setTimeout(() => resolve(toPlayer()), 700)),
      ]);
    }
  }, [firstStep]);

  const [recall, setRecall] = useState(true);

  const [firstPlay, setFirstPlay] = useState(true);
  const [firstFit, setFirstHit] = useState(true);
  useEffect(() => {
    if (gameStarted) {
      if (firstStep) {
        Promise.all([
          new Promise((resolve) =>
            setTimeout(() => resolve(toDealer()), 500)
          ).then(() => setFirstStep(false)),
          new Promise((resolve) => setTimeout(() => resolve(toPlayer()), 0)),
        ]);
      }
      if (activeStep === "Hit") {
        if (userCount < 21) {
          if (isSplit) {
            Promise.all([
              new Promise((resolve) => {
                toPlayer(true, firstPlay ? "left" : "right", resolve);
              }),
              // .then((resolve) => {
              //   if (recall && resolve) {
              //     setRecall(true);
              //   }
              // }),
            ]);
          } else {
            toPlayer();
          }
        }
      }
      if (activeStep === "Stand" && dilerCount < 17) {
        if (isSplit) {
          if (firstPlay) {
            setFirstPlay(false);
            toPlayer(true, "right");
          } else {
            toDealer();
          }
        } else {
          setActiveStep(null);
          toDealer();
        }
      }
      if (activeStep === "Double") {
        setCryptoValue(cryptoValue * 2);
      }

      if (activeStep === "Split") {
        if (playerIndex < 3) {
          toSplit();
          setIsSplit(true);
        }
      }
    }
    setActiveStep(null);
  }, [activeStep, gameStarted]);

  return (
    <div className={s.bj_game_container}>
      <button
        style={{
          position: "fixed",
          background: "wheat",
          width: 150,
          height: 50,
          left: 200,
          top: 180,
          zIndex: 20,
          outline: "none",
          cursor: "pointer",
          border: "none",
          fontSize: 20,
        }}
        onClick={() => setGameStarted(true)}
      >
        start
      </button>
      <ReactHowler
        src={"/static/media/games_assets/poker/sounds/redrawCard.mp3"}
        playing={playSoundHost}
        onEnd={() => setPlaySoundHost(false)}
      />
      <div className={s.bg_img_wrap}>
        <img src={bg.src} className={s.bg_img} alt="static-bg" />
      </div>
      <div className={s.bj_body}>
        <div className={s.active_cards_wrap}>
          <div
            className={clsx(
              s.lose_notification,
              gameStatus === "lose" && s.lose_notification_show
            )}
          >
            lose
          </div>
          {dilerCount && (
            <div
              style={{
                left: `calc(51% + ${dillerCounts * 35}px)`,
                top: `calc(20px + ${dillerCounts * 11}px)`,
                transform: "translateX(-50%)",
              }}
              className={s.card_value}
            >
              {dilerCount}
            </div>
          )}
          {userCount && !isSplit && (
            <div
              style={{
                left: `calc(51% + ${userCount_ * 35}px)`,
                bottom: `calc(34% - ${userCount_ * 10}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className={clsx(
                s.card_value,
                gameStatus === "win" && s.card_count_win,
                gameStatus === "lose" && s.card_count_lose
              )}
            >
              {userCount}
            </div>
          )}
          {userLeftCount && isSplit && (
            <div
              style={{
                left: `calc(41% + ${leftCards.length * 35}px)`,
                bottom: `calc(31% - ${leftCards.length * 15}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className={clsx(
                s.card_value,
                gameStatus === "win" && s.card_count_win,
                gameStatus === "lose" && s.card_count_lose
              )}
            >
              {userLeftCount}
            </div>
          )}
          {userRightCount && isSplit && (
            <div
              style={{
                left: `calc(66% + ${rightCards.length * 35}px)`,
                bottom: `calc(31% - ${rightCards.length * 15}px)`,
                transform: "translate(-50%, -50%)",
              }}
              className={clsx(
                s.card_value,
                gameStatus === "win" && s.card_count_win,
                gameStatus === "lose" && s.card_count_lose
              )}
            >
              {userRightCount}
            </div>
          )}
          {testCards &&
            testCards.map((card, ind) => {
              return (
                <div
                  id={`bj-card-${card.id}-${ind + 1}`}
                  key={ind}
                  className={clsx(
                    s.card,
                    !card.hostIsFirst_2 && s.flipped,
                    `bj-card-${card.id}`
                  )}
                  data-value={card.value}
                >
                  <div className={clsx(s.card_front)}>
                    <img
                      src={`/cards/${card.suit}/${card.value}.svg`}
                      className={clsx(
                        s.card_front_img,
                        card.id === "player" &&
                          gameStatus === "lose" &&
                          s.card_lose,
                        card.id === "player" &&
                          gameStatus === "win" &&
                          s.card_win,
                        card.id === "player" &&
                          isSplit &&
                          !firstPlay &&
                          rightCards.find(
                            (el) =>
                              el.value === card.value && el.suit === card.suit
                          ) &&
                          s.active_step,
                        card.id === "player" &&
                          isSplit &&
                          firstPlay &&
                          leftCards.find(
                            (el) =>
                              el.value === card.value && el.suit === card.suit
                          ) &&
                          s.active_step
                        // card.id === "player" && exist && s.active_step
                      )}
                      alt="front_card_static"
                    />
                  </div>
                  <div
                    className={cn(
                      s.card_back,
                      card.hostIsFirst ? s.card_back_show : s.card_back_hide
                    )}
                  >
                    <img
                      src={cardBack.src}
                      className={s.card_back_img}
                      alt="backcard-static"
                    />
                  </div>
                </div>
              );
            })}
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
      </div>
    </div>
  );
};

// const split = () => {
//   const playerCards = document.querySelectorAll(
//     `.bj-card-player`
//   ) as NodeListOf<HTMLElement>;
//   const onTableCards = Array.from(playerCards).filter((card) =>
//     card.classList.contains("card-on-table")
//   );
//   for (let i = 0; i < onTableCards.length; i++) {
//     for (let j = i + 1; j < onTableCards.length; j++) {
//       if (onTableCards[i].dataset.value === onTableCards[j].dataset.value) {
//         console.log(onTableCards[i]);
//         console.log(onTableCards[j]);
//       }
//     }
//   }
// };
{
  /* <div className={s.bj_host_cards_wrap}>
          <div className={s.bj_host_cards}></div>
        </div>
        <div className={s.bj_player_cards_wrap}>
          <div className={s.bj_player_cards}></div>
        </div> */
}
