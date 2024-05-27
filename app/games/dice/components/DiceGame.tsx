import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  lazy,
  Suspense
} from 'react'

//   import {
//     useAccount,
//     useContractEvent,
//     useContractRead,
//     useContractWrite,
//     useFeeData,
//     useNetwork,
//     usePrepareContractWrite,
//     useWaitForTransaction,
//   } from "wagmi";

import { useUnit } from 'effector-react'

import Image from 'next/image'
import { GameModel } from '@/states'
//   import { Model as RollSettingModel } from "@/widgets/RollSetting";
//   import * as GameModel from "@/widgets/GamePage/model";

import { SessionModel } from '@/states'

//   import { ABI as IERC20 } from "@/shared/contracts/ERC20";
//   import { ABI as DiceAbi } from "@/shared/contracts/DiceAbi";
import { useDebounceValue } from 'usehooks-ts'
//   import { TOKENS } from "@/shared/tokens";

import dice_cube from '@/public/images/dice_images/dice_cube.webp'
import dice_desktop from '@/public/images/dice_images/dice_desctop.webp'
import dice_medium from '@/public/images/dice_images/dice_medium.webp'
import DicePrecentage from '@/public/images/dice_icons/dice_precentage.svg'
import DiceClose from '@/public/images/dice_icons/dice_close.svg'
import DiceSwap from '@/public/images/dice_icons/dice_swap.svg'

import { WagerModel } from '@/states'
//   import { WagerGainLossModel } from "../WagerGainLoss";
//   import { SidePickerModel } from "../CoinFlipSidePicker";
import { DiceCanvas } from './DiceModel'

//   import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";

import { DiceM } from '@/states'
//   import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
//   import { ProfitModel } from "../ProfitBlock";
//   import { ProfitLine } from "../ProfitLine";
//   import { Preload } from "@/shared/ui/Preload";

import Preload from '@/components/custom/preload'

enum CoinAction {
  Rotation = 'Rotation',
  HeadsHeads = 'HeadsHeads',
  HeadsTails = 'HeadsTails',
  TailsHeads = 'TailsHeads',
  TailsTails = 'TailsTails',
  Stop = ''
}

export interface DiceProps {
  gameText: string
}

export const DiceGame: FC<DiceProps> = ({ gameText }) => {
  const [preloading, setPreloading] = useState(true)
  // const { isConnected, address } = useAccount();
  const [modelLoading, setModelLoading] = useState(true)
  const [imageLoading, setIMageLoading] = useState(true)
  useEffect(() => {
    if (!modelLoading && !imageLoading) {
      setPreloading(modelLoading)
    }
  }, [modelLoading, imageLoading])
  const [
    lost,
    profit,
    setPlayingStatus,
    wagered,
    playSounds,
    switchSounds,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameAddress,
    gameStatus,
    betsAmount,
    //   rollOver,
    //   flipRollOver,
    //   RollValue,
    //   setRollValue,
    currentNetwork,
    pickedToken,
    cryptoValue,
    stopLoss,
    stopGain,
    //   pickedSide,
    //   setActivePicker,
    //   pickSide,
    currentBalance,
    setWagered,
    allowance,
    //   setCoefficient,
    setIsPlaying,
    waitingResponse,
    setWaitingResponse,
    refund,
    setRefund
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    DiceM.setPlayingStatus,
    WagerModel.$Wagered,
    GameModel.$playSounds,
    GameModel.switchSounds,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    SessionModel.$gameAddress,
    GameModel.$gameStatus,
    WagerModel.$pickedValue,
    //   RollSettingModel.$RollOver,
    //   RollSettingModel.flipRollOver,
    //   RollSettingModel.$RollValue,
    //   RollSettingModel.setRollValue,
    SessionModel.$currentNetwork,
    WagerModel.$pickedToken,
    WagerModel.$cryptoValue,
    WagerModel.$stopLoss,
    WagerModel.$stopGain,
    //   SidePickerModel.$pickedSide,
    //   SidePickerModel.setActive,
    //   SidePickerModel.pickSide,
    SessionModel.$currentBalance,
    WagerModel.setWagered,
    SessionModel.$currentAllowance,
    //   ProfitModel.setCoefficient,
    GameModel.setIsPlaying,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.$refund,
    GameModel.setRefund
  ])
  const [isPlaying] = useUnit([GameModel.$isPlaying])

  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString())

    //   setRollValue(number_value);
  }
  // const { data, isError, isLoading } = useFeeData({
  //   watch: isConnected,
  //   cacheTime: 5000,
  // });
  const [prevGasPrice, setPrevGasPrice] = useState<bigint>(BigInt(0))

  // useEffect(() => {
  //   if (data && data.gasPrice) {
  //     setPrevGasPrice(data.gasPrice + data.gasPrice / BigInt(6));
  //   }
  // }, [data]);

  let bgImage = window.innerWidth > 650 ? dice_desktop : dice_medium

  // const win_chance = rollOver ? 100 - RollValue : RollValue;
  // const multiplier = 0.99 * (100 / win_chance);
  // const multiplier =
  //   (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100));
  // const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  // const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;

  // useEffect(() => {
  //   setCoefficient(Number(multiplier) / 10000);
  // }, [multiplier]);

  const changeBetween = () => {
    //   flipRollOver(RollValue);
  }

  // const { chain } = useNetwork();
  // const total = (win_chance / RollValue) * multiplier;
  //const total = Math.floor((win_chance / RollValue) * multiplier);
  //?-----------------------------------------------------------------

  const [inGame, setInGame] = useState<boolean>(false)
  const [fees, setFees] = useState<bigint>(BigInt(0))
  const bigNum = 100000000000
  // const { config: startPlayingConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "Dice_Play",
  //   args: [
  //     useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
  //     multiplier,
  //     pickedToken?.contract_address,
  //     rollOver,
  //     betsAmount,
  //     useDebounce(stopGain)
  //       ? BigInt(Math.floor((stopGain as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //       BigInt(bigNum) *
  //       BigInt(200),
  //     useDebounce(stopLoss)
  //       ? BigInt(Math.floor((stopLoss as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //       BigInt(bigNum) *
  //       BigInt(200),
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //       pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
  //       BigInt(100000000000)
  //       : BigInt(0)),
  //   enabled: true,
  // });

  // const {
  //   write: startPlaying,
  //   isSuccess: startedPlaying,
  //   error,
  // } = useContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "Dice_Play",
  //   gasPrice: prevGasPrice,
  //   gas: BigInt(400000),
  //   args: [
  //     useDebounce(BigInt(Math.floor(cryptoValue * 10000000)) * BigInt(bigNum)),
  //     multiplier,
  //     pickedToken?.contract_address,
  //     rollOver,
  //     betsAmount,
  //     useDebounce(stopGain)
  //       ? BigInt(Math.floor((stopGain as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //         BigInt(bigNum) *
  //         BigInt(200),
  //     useDebounce(stopLoss)
  //       ? BigInt(Math.floor((stopLoss as number) * 10000000)) * BigInt(bigNum)
  //       : BigInt(Math.floor(cryptoValue * 10000000)) *
  //         BigInt(bigNum) *
  //         BigInt(200),
  //   ],
  //   value:
  //     fees +
  //     (pickedToken &&
  //     pickedToken.contract_address ==
  //       "0x0000000000000000000000000000000000000000"
  //       ? BigInt(Math.floor(cryptoValue * 10000000) * betsAmount) *
  //         BigInt(100000000000)
  //       : BigInt(0)),
  // });

  // const { data: GameState, refetch: fetchGameState } = useContractRead({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "Dice_GetState",
  //   args: [address],
  //   enabled: true,
  //   //watch: isConnected,
  //   blockTag: "latest",
  // });

  // useEffect(() => {
  //   if (GameState && !inGame) {
  //     if (
  //       (GameState as any).requestID != BigInt(0) &&
  //       (GameState as any).blockNumber != BigInt(0)
  //     ) {
  //       setWaitingResponse(true);
  //       setInGame(true);
  //       setActivePicker(false);
  //       pickSide((GameState as any).isHeads as number);
  //     } else {
  //       setInGame(false);
  //     }
  //   }
  // }, [GameState]);

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])

  // const { config: allowanceConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: pickedToken?.contract_address as `0x${string}`,
  //   abi: IERC20,
  //   functionName: "approve",
  //   enabled:
  //     pickedToken?.contract_address !=
  //     "0x0000000000000000000000000000000000000000",
  //   args: [
  //     gameAddress,
  //     useDebounce(
  //       currentBalance
  //         ? BigInt(Math.floor(currentBalance * 10000000)) * BigInt(100000000000)
  //         : 0
  //     ),
  //   ],
  //   gasPrice: data?.gasPrice as any,
  //   gas: BigInt(50000),
  // });

  // const {
  //   write: setAllowance,
  //   error: allowanceError,
  //   status: allowanceStatus,
  //   data: allowanceData,
  // } = useContractWrite(allowanceConfig);

  // const { config: refundConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "Dice_Refund",
  //   enabled: isPlaying,
  //   args: [],
  //   gas: BigInt(100000),
  // });
  // const { write: callRefund } = useContractWrite(refundConfig);

  // useEffect(() => {
  //   if (refund) {
  //     callRefund?.();
  //     setRefund(false);
  //   }
  // }, [refund]);

  const [watchAllowance, setWatchAllowance] = useState<boolean>(false)

  // useEffect(() => {
  //   if (allowanceData) {
  //     setWatchAllowance(true);
  //   }
  // }, [allowanceData]);

  // const { isSuccess: allowanceIsSet } = useWaitForTransaction({
  //   hash: allowanceData?.hash,
  //   enabled: watchAllowance,
  // });

  // useEffect(() => {
  //   if (inGame && allowanceIsSet && watchAllowance) {
  //     setWatchAllowance(false);
  //     startPlaying();
  //   } else if (allowanceError) {
  //     setWatchAllowance(false);
  //     setActivePicker(true);
  //     setInGame(false);
  //     setWaitingResponse(false);
  //   }
  // }, [inGame, allowanceIsSet, allowanceError]);

  // const { data: VRFFees, refetch: fetchVRFFees } = useContractRead({
  //   chainId: chain?.id,
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   functionName: "getVRFFee",
  //   args: [0],
  //   watch: isConnected && !inGame,
  // });

  // useEffect(() => {
  //   if (VRFFees && data?.gasPrice) {
  //     setFees(
  //       BigInt(VRFFees ? (VRFFees as bigint) : 0) +
  //         BigInt(1000000) * (data.gasPrice + data.gasPrice / BigInt(4))
  //     );
  //   }
  // }, [VRFFees, data]);

  //!---

  // useEffect(() => {
  //   if (startedPlaying) {
  //     setActivePicker(false);
  //     setInGame(true);
  //     setWaitingResponse(true);
  //   }
  // }, [startedPlaying]);

  const [coefficientData, setCoefficientData] = useState<number[]>([])
  // useContractEvent({
  //   address: gameAddress as `0x${string}`,
  //   abi: DiceAbi,
  //   eventName: "Dice_Outcome_Event",
  //   listener(log) {
  //     //handleLog(log)
  //     if (
  //       ((log[0] as any).args.playerAddress as string).toLowerCase() ==
  //       address?.toLowerCase()
  //     ) {
  //       setWaitingResponse(false);
  //       const wagered =
  //         BigInt((log[0] as any).args.wager) *
  //         BigInt((log[0] as any).args.numGames);
  //       const handlePayouts = () => {
  //         for (let i = 0; i < (log[0] as any)?.args?.payouts?.length; i++) {
  //           setTimeout(() => {
  //             const outCome =
  //               Number((log[0] as any)?.args?.payouts[i]) /
  //               Number(BigInt((log[0] as any).args.wager));
  //             setCoefficientData((prev) => [outCome, ...prev]);
  //           }, 700 * (i + 1));
  //         }
  //       };
  //       handlePayouts();
  //       if ((log[0] as any).args.payout > wagered) {
  //         const profit = (log[0] as any).args.payout;
  //         const multiplier = Number(profit / wagered);
  //         const wagered_token = (
  //           (log[0] as any).args.tokenAddress as string
  //         ).toLowerCase();
  //         const token = TOKENS.find((tk) => tk.address == wagered_token)?.name; //TOKENS[((log[0] as any).args.tokenAddress as string).toLowerCase()];

  //         const profitFloat = Number(profit / BigInt(10000000000000000)) / 100;
  //         setWonStatus({
  //           profit: profitFloat,
  //           multiplier,
  //           token: token as string,
  //         });
  //         setGameStatus(GameModel.GameStatus.Won);
  //         console.log("win");
  //       } else {
  //         const wageredFloat =
  //           Number(wagered / BigInt(10000000000000000)) / 100;

  //         setLostStatus(wageredFloat);
  //         setGameStatus(GameModel.GameStatus.Lost);
  //         console.log("lost");
  //       }
  //     }
  //   },
  // });

  useEffect(() => {
    if (wagered) {
      if (inGame) {
        // setShowFlipCards(false);
        // if (finishPlaying) finishPlaying();
      } else {
        const total_value = cryptoValue * betsAmount
        if (
          cryptoValue != 0 &&
          currentBalance &&
          total_value <= currentBalance
        ) {
          if (
            (!allowance || (allowance && allowance <= cryptoValue)) &&
            pickedToken?.contract_address !=
              '0x0000000000000000000000000000000000000000'
          ) {
            //   if (setAllowance) {
            //     // setAllowance();
            //     // setActivePicker(false);
            //     setInGame(true);
            //     setWaitingResponse(true);
            //   }
            //return;
          } else {
            //setActiveCards(initialArrayOfCards);
            //   if (startPlaying) {
            //     startPlaying();
            //   }
          }
        }
      }
      setWagered(false)
    }
  }, [wagered])

  // useEffect(() => {
  //   setActivePicker(true);
  //   setInGame(false);
  //   if (gameStatus == GameModel.GameStatus.Won) {
  //     pickSide(pickedSide);
  //   } else if (gameStatus == GameModel.GameStatus.Lost) {
  //     pickSide(pickedSide ^ 1);
  //   }
  // }, [gameStatus]);

  const rangeRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   let num = rollOver ? 102 : 95;
  //   const rangeElement = rangeRef.current;
  //   const rangeWidth = (RollValue / num) * rangeElement!.offsetWidth;

  //   rangeElement?.style.setProperty(
  //     "--range-width",
  //     `${
  //       rollOver ? (RollValue < 50 ? rangeWidth - 7 : rangeWidth) : rangeWidth
  //     }px`
  //   );
  // }, [RollValue, rollOver]);

  const diceValue = [
    {
      id: 1,
      title: 'Multiplier',
      // value: (Number(multiplier) / 10000).toFixed(4),
      value: 10,
      img_src: <DiceClose />,
      img_alt: 'close'
    },
    {
      id: 2,
      title: 'Roll',
      // value: rollOver ? rollOverNumber.toFixed(2) : rollUnderNumber.toFixed(2),
      value: 10,
      img_src: <DiceSwap />,
      img_alt: 'swap'
    },
    {
      id: 3,
      title: 'Win Chance',
      // value: win_chance.toFixed(2),
      value: 50,
      img_src: <DicePrecentage />,
      img_alt: '%'
    }
  ]
  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
  const [gameResult, setGameResult] = useState<
    { value: number; status: 'won' | 'lost' }[]
  >([])

  const [taken, setTaken] = useState(false)
  const [localAmount, setLocalAmount] = useState<any>(0)
  const [localCryptoValue, setLocalCryptoValue] = useState(0)
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
      setLocalAmount(betsAmount)
      setLocalCryptoValue(cryptoValue)
    }
  }, [betsAmount, cryptoValue, isPlaying])
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
      setGameResult(prev => [
        ...prev,
        { value: localCryptoValue * localAmount, status: 'won' }
      ])
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
      setGameResult(prev => [...prev, { value: 0.0, status: 'lost' }])
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])
  return (
    <>
      {' '}
      {/* {error && (
          <ErrorCheck
            text="Something went wrong, please contact customer support."
            btnTitle="Contact us"
          />
        )} */}
      <div
        className='
        flex flex-col h-full z-[3] w-[100vw] sm:w-full rounded-[0] sm:rounded-[20px_20px_0_0] emd:rounded-[20px_0_0_0]
        flex-[1_1_auto]
        '
      >
        <div
          className='
          absolute z-[1] top-[50%] left-[50%] w-[350px] h-[350px] translate-x-[-50%] translate-y-[-62%]
          sm:translate-x-[-45%] sm:translate-y-[-50%] emd:translate-x-[-50%] emd:translate-y-[-50%]
        '
        >
          <Suspense fallback={<div>...</div>}>
            <DiceCanvas setIsLoading={setModelLoading} inGame={inGame} />
          </Suspense>
        </div>
        <div
          className='
          flex flex-col justify-end h-full items-center w-full relative min-h-[284px] emd:min-h-[589px]
          flex-[1_1_auto]
          '
        >
          {' '}
          {preloading && <Preload />}
          <div
            className='
            w-full h-full absolute right-0 top-0 left-0 bottom-0 overflow-hidden z-[-1]
          '
          >
            <Image
              onLoad={() => setIMageLoading(false)}
              className='
                w-full h-full object-cover
              '
              src={bgImage}
              alt='test'
            />
          </div>
          <div
            className='
            w-full sm:w-fit m-[0_auto] p-[20px_0_0_0] sm:p-[0_20px] bg-[rgba(15,_15,_15,_0.2)] sm:bg-inherit
            items-center justify-center flex sm:block
          '
          >
            {' '}
            <div
              className='
              relative z-[1] flex items-center gap-[10px] mb-[12px] tb:mb-[15px] mmd:text-[1rem]
            '
            >
              {/* <span className={s.roll_range_value}>{RollValue}</span>
                <span className={s.roll_range_min}>{rollOver ? 5 : 0.1}</span> */}
              <span
                className='
                  text-[#eaeaea] text-center text-[0.875rem] font-bold uppercase
                  absolute left-[50%] top-[-20px] translate-x-[-50%]
                '
              >
                1
              </span>
              <span className='text-[#eaeaea] text-center text-[0.875rem] font-bold uppercase'>
                1
              </span>
              <div className=''></div>
              <input
                //   className={clsx(
                //     s.dice_range,
                //     rollOver ? s.dice_over : s.dice_under
                //   )}
                className={`
                  dice_range
                `}
                type='range'
                min={1}
                max={100}
                value={20}
                onChange={onChange}
                ref={rangeRef}
                step={0.1}
              />
              <span className='text-[#eaeaea] text-center text-[0.875rem] font-bold uppercase'>
                100
              </span>
            </div>
          </div>
        </div>
        <div
          className='
          flex justify-center p-[0_px] sm:p-0 items-center gap-[6px] z-[1] relative bg-[#151515] tmd:w-full tmd:p-[8px_0] tb:p-[8px_20px]
        '
        >
          {diceValue.map(dice => (
            <div
              key={dice.id}
              className='
              w-full flex flex-col flex-[1_1_auto] mt-[6px] min-w-[92px] tb:max-w-[172px] mmd:max-w-[220px]
            '
            >
              <h3
                className='
                text-[#7e7e7e] text-[0.875rem] font-semibold tracking-[0.56px]
              '
              >
                {dice.title}{' '}
                {/* {dice.title === "Roll" ? rollOver ? "Over" : "Under" : <></>} */}
              </h3>
              <div
                className='
                flex justify-between items-center pl-[16px]
                bg-[#0f0f0f] overflow-hidden mt-[6px] rounded-[5px] sm:rounded-[12px] 
              '
              >
                <span
                  className='
                  text-[#eaeaea] text-center text-[0.875rem] font-bold uppercase tracking-[0.56px]
                '
                >
                  {dice.value}
                </span>
                <div
                  className={`
                    cursor-pointer h-[40px] w-[40px] flex justify-center items-center
                    ${dice.title === 'Roll' && 'bg-[#202020]'}
                  `}
                >
                  {/* <img
                      onClick={() => {
                        dice.title === "Roll" && changeBetween();
                      }}
                      src={dice.img_src}
                      alt={'sad'}
                    /> */}
                  <div>{dice.img_src}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
