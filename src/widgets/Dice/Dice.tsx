import { Model as RollSettingModel } from "@/widgets/RollSetting";
import Image from "next/image";
import {
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  use,
  MouseEvent,
} from "react";
import { Background, SecondaryBackground } from "../GameInterface";
import s from "./styles.module.scss";
import {
  MultipleBets,
  InputField,
  OutputField,
  Wager,
  PlaceBetButton,
} from "../GameInterface";
import * as DiceModel from "./model";
import { sessionModel } from "@/entities/session";
import { useUnit } from "effector-react";
import Heads2Image from "@/public/media/games_assets/coinflip/Heads2.svg";
import Tails1Image from "@/public/media/games_assets/coinflip/Tails1.svg";
import Web3 from "web3";

import { BigNumber, ethers } from "ethers";
import * as Api from "@/shared/api";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { BetStatus, Model as BetStatusModel } from "@/widgets/BetStatus";
// import { web3 } from "@/entities/web3";
import { Firework } from "../Firework";
import { RollSetting } from "../RollSetting/RollSetting";
// import { Model as RollSettingModel } from "@/widgets/RollSetting";
import { settingsModel } from "@/entities/settings";
import { web3 } from "@/entities/web3";

import dice_desktop from "@/public/media/dice_images/dice_desctop.png";
import dice_tablet from "@/public/media/dice_images/dice_tablet.png";
import dice_mobile from "@/public/media/dice_images//dice_mobile.png";
import dice_medium from "@/public/media/dice_images/dice_medium.png";

interface LinePickerProps {}
const LinePicker: FC<LinePickerProps> = (props) => {
  const [RollValue, rollOver, setRollValue] = useUnit([
    RollSettingModel.$RollValue,
    RollSettingModel.$RollOver,
    RollSettingModel.setRollValue,
  ]);

  const onChange = async (event: {
    target: {
      value: SetStateAction<string>;
    };
  }) => {
    const number_string = event.target.value.toString();
    var numb = Number(number_string);
    console.log("Rolls settings", numb, number_string);
    if (
      Number.isNaN(numb) ||
      number_string.charAt(0) == "+" ||
      number_string.charAt(0) == "-"
    ) {
      console.log("bas number");
      return;
    }
    // if (!rollOver) {
    // numb = 100 - numb;
    // }
    if (rollOver) {
      if (numb < 5) {
        setRollValue(5);
        //setRollString("5");
        return;
      }
      if (numb > 99.9) {
        return;
      }
    } else {
      if (numb < 0.1) {
        setRollValue(0.1);
        //setRollString("0.1");
        return;
      }
      if (numb > 95) {
        return;
      }
    }

    setRollValue(numb);
    //setRollString(number_string);
  };

  return (
    <div className={s.line_picker_container}>
      <div className={s.picked_number}>{RollValue}</div>
      <input
        type="range"
        min={rollOver ? 0 : 0.1}
        max={rollOver ? 99.9 : 95}
        step={0.01}
        value={RollValue}
        onChange={onChange}
        className={`${s.line_picker_slider} ${rollOver ? "" : s.reverse}`}
      ></input>
    </div>
  );
};

interface GameInfoProps {}
const GameInfo: FC<GameInfoProps> = (props) => {
  const [RollValue, RollOver] = useUnit([
    RollSettingModel.$RollValue,
    RollSettingModel.$RollOver,
  ]);

  const win_chance = RollOver ? 100 - RollValue : RollValue;
  const multiplier = 0.99 * (100 / win_chance);

  return (
    <div className={s.game_info}>
      <SecondaryBackground
        children={[
          <div className={s.win_chance_container}>
            <div className={s.game_info_text}>Win Chance</div>
          </div>,
          <div className={s.game_info_output}>
            {Number(win_chance.toFixed(2))}
          </div>,
        ]}
        height={105}
        min_width={120}
        secondary_class={s.game_info_background}
      />
      <SecondaryBackground
        children={[
          <div className={s.win_chance_container}>
            <div className={s.game_info_text}>Multiplier</div>
          </div>,
          <div className={s.game_info_output}>
            {Number(multiplier.toFixed(4))}x
          </div>,
        ]}
        height={105}
        min_width={120}
        secondary_class={s.game_info_background}
      />
    </div>
  );
};

export interface DiceProps {}
export const Dice: FC<DiceProps> = (props) => {
  let dice_beckground;
  let clientWidth = document.documentElement.clientWidth;
  useEffect(() => {
    if (clientWidth > 1280) {
      dice_beckground = dice_desktop;
    } else if (clientWidth > 700) {
      dice_beckground = dice_medium;
    } else if (clientWidth > 320) {
      dice_beckground = dice_tablet;
    } else if (clientWidth < 320) {
      dice_beckground = dice_mobile;
    }
  });

  const [
    betsAmount,
    setBetsAmount,
    totalWager,
    setTotalWager,
    profitOnWin,
    setProfitOnWin,
    inputWager,
    setWager,
    // pickedNumber,
    // pickNumber,
    currentToken,
    currentNetwork,
    currentWalletAddress,
    Won,
    setWon,
    // availableAmount,
    // setAvailableAmount,
    currentTokenDecimals,
    setDecimals,
    inputWagerDollars,
    setWagerDollars,
    // web3Provider,
    newBet,
    RollValue,
    RollOver,
  ] = useUnit([
    DiceModel.$betsAmount,
    DiceModel.setBetsAmount,
    DiceModel.$totalWager,
    DiceModel.setTotalWager,
    DiceModel.$profitOnWin,
    DiceModel.setProfitOnWin,
    DiceModel.$inputWager,
    DiceModel.setWager,
    // DiceModel.$pickedNumber,
    // DiceModel.pickNumber,
    sessionModel.$currentToken,
    sessionModel.$currentNetwork,
    sessionModel.$currentWalletAddress,
    BetStatusModel.$Won,
    BetStatusModel.setWon,
    // sessionModel.$availableAmount,
    // sessionModel.setAvailableAmount,
    sessionModel.$currentTokenDecimals,
    sessionModel.setDecimals,
    DiceModel.$inputWagerDollars,
    DiceModel.setWagerDollars,
    // web3.web3Provider,
    sessionModel.$newBet,
    RollSettingModel.$RollValue,
    RollSettingModel.$RollOver,
  ]);

  var [Game, setGame] = useState<Api.T_Game>();
  var [GameAbi, setGameAbi] = useState<any>();
  var [GameEvent, setGameEvent] = useState<{ type: string; name: string }[]>();
  var [BetPlaced, placeBet] = useState<boolean>(false);
  var [availableAmount, setAvailableAmount] = useState(0);

  const get_game = async () => {
    if (currentNetwork == null) {
      return;
    }
    let game = await Api.getGame({
      network_id: currentNetwork.network_id,
      game_name: "Dice",
    });
    console.log("got game", game);
    setGame(game.body as Api.T_Game);
  };

  useEffect(() => {
    if (Game == undefined) {
      get_game();
    }
  }, [currentNetwork]);

  useEffect(() => {
    console.log("Quering decimals for token", currentToken);
    if (currentToken != null) {
      checkERC20Decimals(currentToken.contract_address);
    }
  }, [currentToken]); // !!!!!! web3Provider

  useEffect(() => {
    if (currentToken != null && currentTokenDecimals != 0) {
      checkERC20Amount(currentToken.contract_address);
    }
  }, [currentToken, currentTokenDecimals]);

  useEffect(() => {
    if (
      currentToken != null &&
      currentTokenDecimals != 0 &&
      currentWalletAddress != null
    ) {
      checkERC20Amount(currentToken.contract_address);
    }
  }, [currentWalletAddress]);

  const get_game_abi = async () => {
    if (Game == undefined) {
      return;
    }
    var abi = await fetch("/static/json/games/Dice/abi.json", {
      method: "GET",
    })
      .then(async (res) => await res.json())
      .catch((e) => e);

    console.log(abi["abi"]);

    setGameAbi(abi["abi"]);
  };

  useEffect(() => {
    if (GameAbi == undefined) {
      get_game_abi();
    }
  }, [Game]);

  const get_game_event = async () => {
    if (Game == undefined) {
      return;
    }
    let game_abi = await Api.getAbi({
      signature: Game.result_event_signature,
    });
    console.log("GameAbi");
    console.log(game_abi);

    let types: string[] = eval((game_abi.body as Api.T_GameAbi).types);
    let names = (game_abi.body as Api.T_GameAbi).names.split(" ");

    var abi_deserialized: { type: string; name: string }[] = [];

    types.forEach((type, index) => {
      abi_deserialized.push({ type: type, name: names[index] });
    });

    setGameEvent(abi_deserialized);
  };

  useEffect(() => {
    get_game_event();
  }, [Game]);

  const onChangeBetsHandler = async (event: {
    target: {
      value: SetStateAction<string>;
    };
  }) => {
    const bets = Number(event.target.value);

    const totalWager = bets * Number(inputWager);
    if (totalWager > availableAmount) {
      return;
    }
    setBetsAmount(bets);
    setTotalWager(totalWager);
    await checkERC20Amount(currentToken?.contract_address as string);
  };

  const checkERC20Amount = async (token_address: string) => {
    const ethereum = new ethers.providers.Web3Provider(window.ethereum as any);
    const web3Utils = new Web3();

    const signer = await ethereum.getSigner();

    const tokenContract = new ethers.Contract(token_address, IERC20, signer);

    const currentBalance: BigNumber = await tokenContract.balanceOf(
      currentWalletAddress
    );

    const balanceString = currentBalance.toString();
    console.log("Balance", balanceString);

    if (balanceString == "0") {
      setAvailableAmount(0);
      return;
    }

    const decimals = currentTokenDecimals;

    console.log("Decimals:", decimals);
    const end = balanceString.length - decimals;

    const balanceNum = parseFloat(
      balanceString.slice(0, end) + "." + balanceString.slice(end, end + 2)
    );

    //console.log("Balance ", balanceNum);

    setAvailableAmount(balanceNum);
  };

  const checkERC20Decimals = async (token_address: string) => {
    const ethereum = new ethers.providers.Web3Provider(window.ethereum as any);

    const signer = await ethereum.getSigner();

    const tokenContract = new ethers.Contract(token_address, IERC20, signer);

    const currentBalance = await tokenContract.decimals();
    setDecimals(currentBalance);
  };

  const onChangeWagerHandler = async (event: {
    target: {
      value: SetStateAction<string>;
    };
  }) => {
    try {
      var wager = Number(event.target.value);
    } catch (error) {
      console.log(error);
      return;
    }
    const totalWager = wager * betsAmount;
    const wagerString = event.target.value.toString();
    if (
      Number.isNaN(wager) ||
      !Number.isFinite(wager) ||
      totalWager > availableAmount ||
      wagerString.charAt(0) == "+" ||
      wagerString.charAt(0) == "-"
    ) {
      console.log(Number.isNaN(wager));
      return;
    }
    setWagerDollars((wager / 11571).toString());
    setWager(event.target.value.toString());
    setTotalWager(totalWager);
    await checkERC20Amount(currentToken?.contract_address as string);
  };

  const onChangeDollarsHandler = async (event: {
    target: {
      value: SetStateAction<string>;
    };
  }) => {
    try {
      var wager = Number(event.target.value) * 11571;
    } catch (error) {
      console.log(error);
      return;
    }
    const totalWager = wager * betsAmount;
    const wagerString = event.target.value.toString();
    if (
      Number.isNaN(wager) ||
      !Number.isFinite(wager) ||
      totalWager > availableAmount ||
      wagerString.charAt(0) == "+" ||
      wagerString.charAt(0) == "-"
    ) {
      console.log(Number.isNaN(wager));
      return;
    }
    setWagerDollars(event.target.value.toString());
    setWager(wager.toString());
    setTotalWager(totalWager);
    await checkERC20Amount(currentToken?.contract_address as string);
  };

  function setPercentageWager(percentage: number) {
    var wager = availableAmount * percentage;

    setWager(wager.toString());
    setWagerDollars((wager / 10).toString());
    setTotalWager(wager * betsAmount);
  }

  const [RerenderFirework, ForceFireworkRerender] = useState(0);
  const [audioContext, setAudiocontext] = useState<any>(null);
  const [coinSoundBuffer, setCoinSound] = useState<any>(null);
  const [wonSoundBuffer, setWonSound] = useState<any>(null);
  const [lostSoundBuffer, setLostSound] = useState<any>(null);

  useEffect(() => {
    setAudiocontext(new AudioContext());
  }, []);

  const NewBetHandle = (bet: Api.T_BetInfo) => {
    if (
      !resultsPending ||
      bet.player.toLowerCase() != currentWalletAddress?.toLowerCase() ||
      bet.network_id != currentNetwork?.network_id ||
      bet.token_address != currentToken?.contract_address
    ) {
      return;
    }

    const web3Utils = new Web3();

    console.log("Bet", bet);

    // const decodedParameters: any = web3Utils.eth.abi.decodeLog(GameEvent as { type: string; name: string; }[], event.data, []);
    // console.log(decodedParameters);
    let total_wager = BigInt(bet.wager) * BigInt(bet.bets);
    let payout = BigInt(bet.profit);
    let loss = total_wager - payout;
    console.log(payout);
    console.log(loss);
    if (payout > total_wager) {
      console.log("You won!");
      setWon(true);
      ForceFireworkRerender(RerenderFirework + 1);
      //playSound(coinSoundBuffer);
      playSound(wonSoundBuffer);
    } else {
      console.log("You lost!");
      setWon(false);
      //playSound(coinSoundBuffer);
      playSound(lostSoundBuffer);
    }
    set_results_pending(false);
    placeBet(false);
  };

  async function loadSound(url: string, handler: any) {
    if (audioContext == null) {
      return;
    }

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Decode asynchronously
    request.onload = function () {
      audioContext.decodeAudioData(
        request.response,
        function (buffer: any) {
          handler(buffer);
        },
        (e: any) => e
      );
    };
    request.send();
  }

  function playSound(buffer: any) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  }

  useEffect(() => {
    loadSound(
      "/static/media/games_assets/coinflip/coinSound.mp3",
      setCoinSound
    );
    loadSound("/static/media/games_assets/coinflip/wonSound.wav", setWonSound);
    loadSound(
      "/static/media/games_assets/coinflip/lostSound.wav",
      setLostSound
    );
  }, [audioContext]);

  useEffect(() => {
    if (newBet != null) {
      NewBetHandle(newBet);
    }
  }, [newBet]);

  const [resultsPending, set_results_pending] = useState(false);

  const makeBet = async () => {
    await checkERC20Amount(currentToken?.contract_address as string);

    if (availableAmount < totalWager) {
      return;
    }

    console.log("Making bet", Game, GameEvent, GameAbi, totalWager);
    if (
      Game == undefined ||
      GameEvent == undefined ||
      totalWager == 0
      // || web3Provider == null
    ) {
      return;
    }

    const ethereum = window.ethereum(); //! !!!!!!!!!!!!!!!!!web3Provider;
    const web3Utils = new Web3();

    const signer = await ethereum.getSigner();
    const dice_contract = new ethers.Contract(
      Game.address,
      GameAbi as any,
      signer
    );
    //const vrfcoordinator_contract = new ethers.Contract(VRFCoordinatorAddress, VRFCoordinatorAbi, ethereum);

    const tokenAddress = currentToken?.contract_address;
    console.log(`Token:${tokenAddress}`);
    const tokenContract = new ethers.Contract(
      tokenAddress as string,
      IERC20,
      signer
    );

    let fees = await dice_contract.getVRFFee(1000000);

    let allowance = await tokenContract.allowance(
      currentWalletAddress,
      Game.address
    );

    console.log("Allowance:", allowance);

    var totalWagerConvertedString = totalWager
      .toFixed(currentTokenDecimals)
      .replace(".", "");

    const totalWagerConverted = BigInt(totalWagerConvertedString);
    console.log("TotalWagerConverted", totalWagerConverted);

    if (allowance < totalWagerConverted) {
      try {
        await tokenContract.approve(
          Game.address,
          BigInt((availableAmount + 1) * 10 ** currentTokenDecimals)
        );
      } catch (error) {
        console.log("Error increasing allowance", error);
        return;
      }
    }

    const win_chance = RollOver ? 100 - RollValue : RollValue;
    const multiplier = Math.floor(
      Number((0.99 * (100 / win_chance)).toFixed(4)) * 10000
    );

    console.log("Placing bet", win_chance, multiplier);
    try {
      await dice_contract.Dice_Play(
        BigInt(parseFloat(inputWager) * 10 ** currentTokenDecimals),
        multiplier,
        tokenAddress,
        RollOver,
        betsAmount,
        totalWagerConverted * BigInt(betsAmount),
        totalWagerConverted * BigInt(betsAmount),
        {
          value: 3000000000000000,
          gasLimit: 3000000,
          gasPrice: await ethereum.getGasPrice(),
        }
      );
    } catch (error) {
      console.log("Error placing bet", error);
      return;
    }
    console.log("Bet placed");

    set_results_pending(true);

    placeBet(true);

    await checkERC20Amount(currentToken?.contract_address as string);
  };

  return (
    <div className={s.background_container}>
      <Background
        children={[
          <div className={s.game_menu}>
            <div className={s.settings}>
              <RollSetting />
              <SecondaryBackground
                children={[
                  <MultipleBets
                    on_change_bets_handler={onChangeBetsHandler}
                    bets_amount={betsAmount}
                  />,
                  <InputField name="Stop Gain" />,
                  <InputField name="Stop Loss" />,
                  <OutputField
                    name="Total Wager"
                    value={<div>{totalWager}</div>}
                  />,
                  //<OutputField name="Total Wager" value={<div className={s.profit_on_win}>+{profitOnWin}</div>} />
                ]}
                height={214}
                min_width={150}
                secondary_class={""}
              />
              <GameInfo />
              <Wager
                value={inputWager}
                onChangeHandler={onChangeWagerHandler}
                onChangeDollarsHandler={onChangeDollarsHandler}
                valueDollars={inputWagerDollars}
                onClickHandlers={setPercentageWager}
              />
              <PlaceBetButton
                active={currentWalletAddress != null}
                multiple_bets={betsAmount > 1}
                onClick={makeBet}
                bet_placed={BetPlaced}
              />
            </div>
            <LinePicker />
          </div>,
          <Firework.Firework
            render={Won as boolean}
            force_rerender={RerenderFirework}
          />,
        ]}
        height={undefined}
        min_width={370}
        min_height={512}
      />
    </div>
  );
};

//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
//?-----------------------------------------------------------------
// import Image from "next/image";
// import {
//   FC,
//   ReactNode,
//   SetStateAction,
//   useEffect,
//   useState,
//   use,
//   ChangeEvent,
//   useRef,
// } from "react";
// import { Background, SecondaryBackground, Slider } from "../GameInterface";
// import s from "./styles.module.scss";
// import {
//   MultipleBets,
//   InputField,
//   OutputField,
//   Wager,
//   PlaceBetButton,
// } from "../GameInterface";
// import * as DiceModel from "./model";
// import { sessionModel } from "@/entities/session";
// import { useUnit } from "effector-react";
// import Heads2Image from "@/public/media/games_assets/coinflip/Heads2.svg";
// import Tails1Image from "@/public/media/games_assets/coinflip/Tails1.svg";
// import Web3 from "web3";
// import { BigNumber, ethers } from "ethers";
// import * as Api from "@/shared/api";
// import { ABI as IERC20 } from "@/shared/contracts/ERC20";
// import { BetStatus, Model as BetStatusModel } from "@/widgets/BetStatus";
// import { web3 } from "@/entities/web3";
// import { Firework } from "../Firework";
// import * as GameModel from "@/widgets/GamePage/model";

// import dice_cube from "@/public/media/dice_images/dice_cube.png";

// import dice_desktop from "@/public/media/dice_images/dice_desctop.png";

// import dice_medium from "@/public/media/dice_images/dice_medium.png";

// import dice_mobile from "@/public/media/dice_images/dice_mobile.png";

// import dice_tablet from "@/public/media/dice_images/dice_tablet.png";

// import clsx from "clsx";
// import soundIco from "@/public/media/Wager_icons/soundIco.svg";
// import soundOffIco from "@/public/media/Wager_icons/volumeOffIco.svg";

// import dice_precentage from "@/public/media/dice_icons/dice_precentage.svg";
// import dice_close from "@/public/media/dice_icons/dice_close.svg";
// import dice_swap from "@/public/media/dice_icons/dice_swap.svg";
// import dice_arr from "@/public/media/dice_icons/dice_arr.svg";

// //export * from './Dice';

// export interface DiceProps {}

// export const Dice: FC<DiceProps> = (props) => {
//   const [
//     playSounds,
//     switchSounds,
//     setGameStatus,
//     setLostStatus,
//     setWonStatus,
//     won,
//     setWon,
//     gameAddress,
//     gameStuts,
//     betsAmount,
//     setBetsAmount,
//     rollOver,
//     RollValue,
//     setRollValue,
//   ] = useUnit([
//     GameModel.$playSounds,
//     GameModel.switchSounds,
//     GameModel.setGameStatus,
//     GameModel.setLostStatus,
//     GameModel.setWonStatus,
//     BetStatusModel.$Won,
//     BetStatusModel.setWon,
//     sessionModel.$gameAddress,
//     GameModel.$gameStatus,
//     DiceModel.$betsAmount,
//     DiceModel.setBetsAmount,
//     RollSettingModel.$RollOver,
//     RollSettingModel.$RollValue,
//     RollSettingModel.setRollValue,
//   ]);
//   const [inGame, setInGame] = useState<boolean>(false);

//   const onChange = (el: ChangeEvent<HTMLInputElement>) => {
//     const number_value = Number(el.target.value.toString());
//     // if (number_value < 5) {
//     //   setRollValue(1);
//     // }
//     setRollValue(number_value);
//   };

//   let bgImage;
//   const documentWidth = document.documentElement.clientWidth;
//   if (documentWidth > 1910) bgImage = dice_desktop;
//   if (documentWidth > 1280 && documentWidth < 1920) bgImage = dice_medium;
//   if (documentWidth > 700 && documentWidth < 1280) bgImage = dice_tablet;
//   if (documentWidth < 700) bgImage = dice_mobile;
//   const win_chance = rollOver ? 100 - RollValue : RollValue;
//   const multiplier = 0.99 * (100 / win_chance);
//   let roll_under = 0;

//   const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
//   const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;

//   const [rollValueBetween, setRollValueBetween] = useState<"Over" | "Under">(
//     "Over"
//   );
//   const changeBetween = () => {
//     if (rollValueBetween === "Under") {
//       setRollValueBetween("Over");
//     } else {
//       setRollValueBetween("Under");
//     }
//   };
//   const [aboutGame, setAboutGame] = useState(false);

//   const textRef = useRef<HTMLParagraphElement | null>(null);
//   const height = textRef.current?.clientHeight;

//   return (
//     <>
//       <div className={s.dice}>
//         <div className={s.dice_container}>
//           <Image className={s.cube} src={dice_cube} alt="cube" />
//           <Image className={s.background} src={bgImage!} alt="test" />
//           {/* <LineP */}
//           {RollValue}
//           <div className={s.range_container}>
//             <span className={s.roll_range_value}>{RollValue}</span>
//             <span className={s.roll_range_min}>0.1</span>
//             <div className={s.custom_range_input_body}></div>
//             <input
//               type="range"
//               className={clsx(s.line_picker_slider, rollOver ? "" : s.reverse)}
//               value={RollValue}
//               onChange={onChange}
//               max={95}
//               min={0.1}
//               step={0.1}
//             />
//             <span className={s.roll_range_max}>95</span>
//           </div>
//           <button onClick={() => switchSounds()} className={s.dice_sound_btn}>
//             <Image
//               src={playSounds ? soundIco : soundOffIco}
//               alt={playSounds ? "sound-on" : "sound-off"}
//             />
//           </button>
//         </div>
//         <div className={s.demo}>
//           <div className={s.dice_under_conteiner}>
//             <h3 className={s.dice_under_title}>Multiplier</h3>
//             <div className={s.dice_under_data}>
//               <span className={s.dice_under_value}>
//                 {multiplier.toFixed(2)}
//               </span>
//               <Image src={dice_close} alt="close" />
//             </div>
//           </div>
//           <div className={s.dice_under_conteiner}>
//             <h3 className={s.dice_under_title}>Roll {rollValueBetween}</h3>
//             <div className={s.dice_under_data}>
//               <span className={s.dice_under_value}>
//                 {rollValueBetween === "Over"
//                   ? rollOverNumber.toFixed(2)
//                   : rollUnderNumber.toFixed(2)}
//               </span>
//               <Image
//                 onClick={changeBetween}
//                 className={s.dice_close_icon}
//                 src={dice_swap}
//                 alt="swap"
//               />
//             </div>
//           </div>
//           <div className={s.dice_under_conteiner}>
//             <h3 className={s.dice_under_title}>Win Chance</h3>
//             <div className={s.dice_under_data}>
//               <span className={s.dice_under_value}>
//                 {win_chance.toFixed(2)}
//               </span>
//               <Image src={dice_precentage} alt="%" />
//             </div>
//           </div>
//         </div>
//       </div>{" "}
//     </>
//   );
// };
