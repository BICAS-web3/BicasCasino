import s from "./styles.module.scss";
import gameBg from "../../public/media/game_layout_images/game_background.png";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { GamePageModal } from "@/widgets/GamePage/GamePageModal";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import * as MainWallet from "@/widgets/AvaibleWallet/model";
import * as BlurModel from "@/widgets/Blur/model";
import { Wager } from "@/widgets/Wager/Wager";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import * as api from "@/shared/api";
import { settingsModel } from "@/entities/settings";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { PokerFlipCardsInfo } from "../PokerFlipCardsInfo";

import * as GameModel from "./model";
import { Notification } from "../Notification";
import { WinMessage } from "@/widgets/WinMessage";
import { LostMessage } from "@/widgets/LostMessage";
import Image from "next/image";
import { AboutGame } from "../AboutGame";

interface GamePageProps {
  children: ReactNode;
  gameTitle: string;
  gameInfoText: string;
  wagerContent: any;
}

export const GamePage: FC<GamePageProps> = ({
  children,
  gameTitle,
  gameInfoText,
  wagerContent,
}) => {
  console.log("Redrawing game page");
  const { address, isConnected } = useAccount();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [currentToken, setCurrentToken] = useState<{
    token: api.T_Token;
    price: number;
  }>();

  const [erc20balanceOfConf, seterc20balanceOfConf] = useState<any>();
  const [erc20balanceofCall, seterc20balanceofCall] = useState<any>();

  const {
    data: balance,
    error,
    isError,
    refetch: fetchBalance,
  } = useContractRead({
    address: currentToken?.token.contract_address as `0x${string}`,
    abi: IERC20,
    functionName: "balanceOf",
    args: [address],
  });

  const [
    availableTokens,
    gameStatus,
    setGameStatus,
    profit,
    multiplier,
    token,
    lost,
    clearStatus,
  ] = useUnit([
    settingsModel.$AvailableTokens,
    GameModel.$gameStatus,
    GameModel.setGameStatus,

    GameModel.$profit,
    GameModel.$multiplier,
    GameModel.$token,
    GameModel.$lost,
    GameModel.clearStatus,
  ]);

  const [setBlur] = useUnit([BlurModel.setBlur]);

  // const handleModalVisibilityChange = () => {
  //   !modalVisibility && setBlur(true);
  //   setModalVisibility(!modalVisibility);
  // };

  const closeModal = () => {
    setModalVisibility(false);
    setBlur(false);
  };

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await sleep(2000);
      clearStatus();
    };
    if (gameStatus == GameModel.GameStatus.Lost) {
      run();
    }
  }, [gameStatus]);

  // const won = false;
  // const lost = false;

  return (
    <div className={s.game_layout}>
      <div className={s.game_wrap}>
        <GamePageModal
          text={gameInfoText}
          closeModal={closeModal}
          modalVisible={modalVisibility}
        />
        <div className={s.game_body}>
          <div className={s.game}>
            <div className={s.game_block}>
              <h2 className={s.game_title}>{gameTitle}</h2>
              {children}

              {gameStatus == GameModel.GameStatus.Won && (
                <div className={s.win_wrapper}>
                  <WinMessage
                    tokenImage={
                      <Image
                        src={`${api.BaseStaticUrl}/media/tokens/${token}.svg`}
                        alt={""}
                        width={30}
                        height={30}
                      />
                    }
                    profit={profit.toFixed(2)}
                    multiplier={Number(multiplier.toFixed(2)).toString()}
                  />
                </div>
              )}

              {gameStatus == GameModel.GameStatus.Lost && (
                <div className={s.lost_wrapper}>
                  <LostMessage amount={lost.toFixed(2)} />
                </div>
              )}
            </div>
            <Wager wagerContent={wagerContent} />
          </div>
          <AboutGame about_game="Lorem ipsum dolor sit amet consectetur. Congue ante quis elementum cursus et neque sit. Dictumst ut aliquet cras metus fames tristique fringilla at. Sit eget lobortis in nullam curabitur cras. In velit aliquet eget convallis amet quis sollicitudin ac. Sed ultrices libero laoreet ornare nec pellentesque egestas massa. Risus odio etiam eget viverra tempus nulla semper donec sit. Non mollis euismod quis nibh sit. Egestas malesuada mauris adipiscing et sit. Mauris nunc porttitor ipsum ultricies ullamcorper nunc. Gravida et libero ac adipiscing ut habitant pretium bibendum. Quam gravida vel posuere viverra morbi." />
          <div>
            <CustomBets
              title="Live bets"
              isGamePage={true}
              isMainPage={false}
              game={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
