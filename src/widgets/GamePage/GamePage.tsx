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
  useAccount
} from 'wagmi';
import * as api from '@/shared/api';
import { settingsModel } from "@/entities/settings";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { PokerFlipCardsInfo } from "../PokerFlipCardsInfo";

import * as GameModel from './model';
import { Notification } from "../Notification";

interface GamePageProps {
  children: ReactNode;
  gameTitle: string;
  gameInfoText: string;
  game: string;
  onWager: (tokenAmount: number) => Promise<void>;
  onTokenChange: (token: api.T_Token) => Promise<void>;
  onTokenAmountChange: (tokenAmount: number) => void;
  inGame: boolean
}

export const GamePage: FC<GamePageProps> = ({
  children,
  gameTitle,
  gameInfoText,
  game,
  onWager,
  onTokenChange,
  onTokenAmountChange,
  inGame
}) => {

  const { address, isConnected } = useAccount();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [currentToken, setCurrentToken] = useState<{ token: api.T_Token, price: number }>();

  const [erc20balanceOfConf, seterc20balanceOfConf] = useState<any>();
  const [erc20balanceofCall, seterc20balanceofCall] = useState<any>();

  //if (currentToken) {
  // const { config } = usePrepareContractWrite({
  //   address: (currentToken?.token.contract_address) as `0x${string}`,
  //   abi: IERC20,
  //   functionName: 'balanceOf',
  //   args: [address],
  //   enabled: true,
  // });
  const { data: balance, error, isError, refetch: fetchBalance } = useContractRead({
    address: (currentToken?.token.contract_address) as `0x${string}`,
    abi: IERC20,
    functionName: 'balanceOf',
    args: [address],
  });
  // useEffect(() => {
  //   console.log('Data', data);
  // }, [data]);
  //}

  const [
    availableTokens
  ] = useUnit([
    settingsModel.$AvailableTokens
  ]);

  useEffect(() => {
    const run = async () => {
      const price = ((await api.GetTokenPriceFx(availableTokens.tokens[0].name)).body as api.T_TokenPrice).token_price;
      setCurrentToken({ token: availableTokens.tokens[0], price: price, });
      await onTokenChange(availableTokens.tokens[0]);
    };
    if (availableTokens.tokens.length != 0) {
      run();

    }
  }, [availableTokens]);


  // useEffect(() => {
  //   if(!chain){
  //     setAvailableTokens([]);
  //     return;
  //   }

  // }, [chain]);

  const [setBlur] = useUnit([BlurModel.setBlur]);

  const handleModalVisibilityChange = () => {
    !modalVisibility && setBlur(true);
    setModalVisibility(!modalVisibility);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setBlur(false);
  };

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
            </div>
            <Wager
              game={game}
              tokenAvailableAmount={(balance as number | undefined) ? Number((balance as bigint) / BigInt(1000000000000000000)) / 100 : 0}
              tokenPrice={currentToken ? currentToken.price : 0}
              onWager={onWager}
              tokens={availableTokens.tokens}
              activeToken={currentToken ? currentToken.token : undefined}
              setActiveToken={undefined}
              onTokenAmountChange={onTokenAmountChange}
              wagerButtonActive={!inGame} />
          </div>
          <div>
            <CustomBets
              title="Live bets"
              isGamePage={true}
              isMainPage={false}
            // bets={[
            //   {
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
            // ]}
            />
          </div>
        </div>
      </div >
    </div >
  );
};
