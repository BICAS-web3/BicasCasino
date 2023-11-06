// import Image from 'next/image';
// import { FC, ReactNode, SetStateAction, useEffect, useState, use, MouseEvent } from 'react';
// import { Background, SecondaryBackground } from '../GameInterface';
// import s from './styles.module.scss';
// import { MultipleBets, InputField, OutputField, Wager, PlaceBetButton } from '../GameInterface';
// import * as RPSModel from './model';
// import { sessionModel } from '@/entities/session';
// import { useUnit } from 'effector-react';
// import Web3, { RpcError } from 'web3';
// import { BigNumber, ethers } from 'ethers';
// import * as Api from '@/shared/api';
// import { ABI as IERC20 } from '@/shared/contracts/ERC20';
// import { BetStatus, Model as BetStatusModel } from '@/widgets/BetStatus';
// import { web3 } from '@/entities/web3';
// import { Firework } from '../Firework';
// //import { Model as RollSettingModel } from '@/widgets/RollSetting';
// import { settingsModel } from '@/entities/settings';
// import RockIcon from '@/public/media/games_assets/rock_paper_scissors/rock.svg';
// import ColoredRockIcon from '@/public/media/games_assets/rock_paper_scissors/rock_colored.svg';
// import PaperIcon from '@/public/media/games_assets/rock_paper_scissors/paper.svg';
// import ColoredPaperIcon from '@/public/media/games_assets/rock_paper_scissors/paper_colored.svg';
// import ScissorsIcon from '@/public/media/games_assets/rock_paper_scissors/scissors.svg';
// import ColoredScissorsIcon from '@/public/media/games_assets/rock_paper_scissors/scissors_colored.svg';

// interface RPSPickerProps {
//     betPlaced: boolean
// };
// const RPSPicker: FC<RPSPickerProps> = props => {

//     const [
//         pickedSymbol,
//         pickSymbol
//     ] = useUnit([
//         RPSModel.$pickedSymbol,
//         RPSModel.pickSymbol,

//     ]);

//     return (<div className={s.picker}>
//         <SecondaryBackground children={[

//             <div className={s.pick} onClick={() => {
//                 if (props.betPlaced) {
//                     return;
//                 }
//                 pickSymbol(RPSModel.Symbol.Rock);
//             }}>
//                 <Image
//                     src={pickedSymbol == RPSModel.Symbol.Rock ? ColoredRockIcon : RockIcon}
//                     alt={''}
//                     width={80}
//                     height={80}
//                     className={`${s.pick_icon} ${pickedSymbol == RPSModel.Symbol.Rock ? s.pick_icon_active : ''}`}
//                 />
//             </div>
//         ]} height={150} min_width={150} secondary_class={`${pickedSymbol == RPSModel.Symbol.Rock ? s.pick_active : ''} ${s.pick_background}`} />
//         <SecondaryBackground children={[
//             <div className={s.pick} onClick={() => {
//                 if (props.betPlaced) {
//                     return;
//                 }
//                 pickSymbol(RPSModel.Symbol.Paper);
//             }}>
//                 <Image
//                     src={pickedSymbol == RPSModel.Symbol.Paper ? ColoredPaperIcon : PaperIcon}
//                     alt={''}
//                     width={80}
//                     height={80}
//                     className={`${s.pick_icon} ${pickedSymbol == RPSModel.Symbol.Paper ? s.pick_icon_active : ''}`}
//                 />
//             </div>
//         ]} height={150} min_width={150} secondary_class={`${pickedSymbol == RPSModel.Symbol.Paper ? s.pick_active : ''} ${s.pick_background}`} />
//         <SecondaryBackground children={[
//             <div className={s.pick} onClick={() => {
//                 if (props.betPlaced) {
//                     return;
//                 }
//                 pickSymbol(RPSModel.Symbol.Scissors);
//             }}>
//                 <Image
//                     src={pickedSymbol == RPSModel.Symbol.Scissors ? ColoredScissorsIcon : ScissorsIcon}
//                     alt={''}
//                     width={80}
//                     height={80}
//                     className={`${s.pick_icon} ${pickedSymbol == RPSModel.Symbol.Scissors ? s.pick_icon_active : ''}`}
//                 />
//             </div>
//         ]} height={150} min_width={150} secondary_class={`${pickedSymbol == RPSModel.Symbol.Scissors ? s.pick_active : ''} ${s.pick_background}`} />
//     </div>)
// }

// interface SymbolDisplayProps {
//     symbolResult: RPSModel.Symbol,
// };
// const SymbolDisplay: FC<SymbolDisplayProps> = props => {
//     const [
//         pickedSymbol,
//     ] = useUnit([
//         RPSModel.$pickedSymbol,
//     ]);

//     return (<div className={s.symbol_display}>
//         <Image
//             src={(() => {
//                 switch (pickedSymbol) {
//                     case RPSModel.Symbol.Rock: return ColoredRockIcon;
//                     case RPSModel.Symbol.Paper: return ColoredPaperIcon;
//                     case RPSModel.Symbol.Scissors: return ColoredScissorsIcon;
//                 }
//             })()}
//             alt={''}
//             width={120}
//             height={120}
//         />
//         <div className={s.VS}>VS</div>
//         <Image
//             src={(() => {
//                 switch (props.symbolResult) {
//                     case RPSModel.Symbol.Rock: return ColoredRockIcon;
//                     case RPSModel.Symbol.Paper: return ColoredPaperIcon;
//                     case RPSModel.Symbol.Scissors: return ColoredScissorsIcon;
//                 }
//             })()}
//             alt={''}
//             width={120}
//             height={120}
//         />
//     </div>)
// }

// export interface RPSProps { };
// export const RPS: FC<RPSProps> = props => {
//     const [betsAmount,
//         setBetsAmount,
//         totalWager,
//         setTotalWager,
//         profitOnWin,
//         setProfitOnWin,
//         inputWager,
//         setWager,
//         // pickedNumber,
//         // pickNumber,
//         currentToken,
//         currentNetwork,
//         currentWalletAddress,
//         Won,
//         setWon,
//         // availableAmount,
//         // setAvailableAmount,
//         currentTokenDecimals,
//         setDecimals,
//         inputWagerDollars,
//         setWagerDollars,
//         web3Provider,
//         newBet,
//         pickedSymbol,
//         pickSymbol
//     ] = useUnit([
//         RPSModel.$betsAmount,
//         RPSModel.setBetsAmount,
//         RPSModel.$totalWager,
//         RPSModel.setTotalWager,
//         RPSModel.$profitOnWin,
//         RPSModel.setProfitOnWin,
//         RPSModel.$inputWager,
//         RPSModel.setWager,
//         // DiceModel.$pickedNumber,
//         // DiceModel.pickNumber,
//         sessionModel.$currentToken,
//         sessionModel.$currentNetwork,
//         sessionModel.$currentWalletAddress,
//         BetStatusModel.$Won,
//         BetStatusModel.setWon,
//         // sessionModel.$availableAmount,
//         // sessionModel.setAvailableAmount,
//         sessionModel.$currentTokenDecimals,
//         sessionModel.setDecimals,
//         RPSModel.$inputWagerDollars,
//         RPSModel.setWagerDollars,
//         web3.web3Provider,
//         sessionModel.$newBet,
//         RPSModel.$pickedSymbol,
//         RPSModel.pickSymbol
//     ]);

//     var [Game, setGame] = useState<Api.T_Game>();
//     var [GameAbi, setGameAbi] = useState<any>();
//     var [GameEvent, setGameEvent] = useState<{ type: string, name: string }[]>();
//     var [BetPlaced, placeBet] = useState<boolean>(false);
//     var [availableAmount, setAvailableAmount] = useState(0);
//     var [symbolWon, setSymbolWon] = useState(RPSModel.Symbol.Rock);

//     useEffect(() => {
//         if (BetPlaced) {
//             var i = 0;
//             const intervalId = setInterval(() => {
//                 if (!BetPlaced) {
//                     return;
//                 }
//                 setSymbolWon(i);
//                 i++;
//                 if (i == 3) {
//                     i = 0;
//                 }
//             }, 100);

//             return () => clearInterval(intervalId);
//         }
//     }, [BetPlaced]);

//     const get_game = async () => {
//         if (currentNetwork == null) {
//             return;
//         }
//         let game = await Api.getGame({ network_id: currentNetwork.network_id, game_name: "RockPaperScissors" });
//         console.log("got game", game);
//         setGame(game.body as Api.T_Game);
//     };

//     useEffect(() => {
//         if (Game == undefined) {
//             get_game();
//         }
//     }, [currentNetwork]);

//     useEffect(() => {
//         console.log('Quering decimals for token', currentToken);
//         if (currentToken != null) {
//             checkERC20Decimals(currentToken.contract_address);
//         }
//     }, [currentToken, web3Provider]);

//     useEffect(() => {
//         if (currentToken != null && currentTokenDecimals != 0) {
//             checkERC20Amount(currentToken.contract_address);
//         }
//     }, [currentToken, currentTokenDecimals]);

//     useEffect(() => {
//         if (currentToken != null && currentTokenDecimals != 0 && currentWalletAddress != null) {
//             checkERC20Amount(currentToken.contract_address);
//         }
//     }, [currentWalletAddress])

//     const get_game_abi = async () => {
//         if (Game == undefined) {
//             return;
//         }
//         var abi = await fetch('/static/json/games/RockPaperScissors/abi.json', {
//             method: 'GET'
//         }).then(async res => await res.json()).catch(e => (e));

//         console.log(abi['abi']);

//         setGameAbi(abi['abi']);
//     }

//     useEffect(() => {
//         if (GameAbi == undefined) {
//             get_game_abi();
//         }
//     }, [Game]);

//     const get_game_event = async () => {
//         if (Game == undefined) {
//             return;
//         }
//         let game_abi = await Api.getAbi({
//             signature: Game.result_event_signature
//         });
//         console.log("GameAbi");
//         console.log(game_abi);

//         let types: string[] = eval((game_abi.body as Api.T_GameAbi).types);
//         let names = (game_abi.body as Api.T_GameAbi).names.split(' ');

//         var abi_deserialized: { type: string, name: string }[] = [];

//         types.forEach((type, index) => {
//             abi_deserialized.push({ type: type, name: names[index] });
//         });

//         setGameEvent(abi_deserialized);
//     }

//     useEffect(() => {
//         get_game_event();
//     }, [Game]);

//     const onChangeBetsHandler = async (event: {
//         target: {
//             value: SetStateAction<string>;
//         };
//     }) => {
//         const bets = Number(event.target.value);

//         const totalWager = bets * Number(inputWager);
//         if (totalWager > availableAmount) {
//             return;
//         }
//         setBetsAmount(bets);
//         setTotalWager(totalWager);
//         await checkERC20Amount((currentToken?.contract_address) as string);
//     }

//     const checkERC20Amount = async (token_address: string) => {
//         const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));
//         const web3Utils = new Web3();

//         const signer = await ethereum.getSigner();

//         const tokenContract = new ethers.Contract(token_address, IERC20, signer);

//         const currentBalance: BigNumber = await tokenContract.balanceOf(currentWalletAddress);

//         const balanceString = currentBalance.toString();
//         console.log('Balance', balanceString);

//         if (balanceString == '0') {
//             setAvailableAmount(0);
//             return;
//         }

//         const decimals = currentTokenDecimals;

//         console.log("Decimals:", decimals);
//         const end = balanceString.length - decimals;

//         const balanceNum = parseFloat(balanceString.slice(0, end) + '.' + balanceString.slice(end, end + 2));

//         //console.log("Balance ", balanceNum);

//         setAvailableAmount(balanceNum);
//     }

//     const checkERC20Decimals = async (token_address: string) => {
//         const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));

//         const signer = await ethereum.getSigner();

//         const tokenContract = new ethers.Contract(token_address, IERC20, signer);

//         const currentBalance = await tokenContract.decimals();
//         setDecimals(currentBalance);
//     }

//     const onChangeWagerHandler = async (event: {
//         target: {
//             value: SetStateAction<string>;
//         };
//     }) => {

//         try {
//             var wager = Number(event.target.value);
//         } catch (error) {
//             console.log(error);
//             return;
//         }
//         const totalWager = wager * betsAmount;
//         const wagerString = event.target.value.toString();
//         if (Number.isNaN(wager)
//             || !Number.isFinite(wager)
//             || totalWager > availableAmount
//             || wagerString.charAt(0) == '+'
//             || wagerString.charAt(0) == '-') {
//             console.log(Number.isNaN(wager));
//             return;
//         }
//         setWagerDollars((wager / 11571).toString());
//         setWager(event.target.value.toString());
//         setTotalWager(totalWager);
//         await checkERC20Amount((currentToken?.contract_address) as string);
//     };

//     const onChangeDollarsHandler = async (event: {
//         target: {
//             value: SetStateAction<string>;
//         };
//     }) => {

//         try {
//             var wager = Number(event.target.value) * 11571;
//         } catch (error) {
//             console.log(error);
//             return;
//         }
//         const totalWager = wager * betsAmount;
//         const wagerString = event.target.value.toString();
//         if (Number.isNaN(wager)
//             || !Number.isFinite(wager)
//             || totalWager > availableAmount
//             || wagerString.charAt(0) == '+'
//             || wagerString.charAt(0) == '-') {
//             console.log(Number.isNaN(wager));
//             return;
//         }
//         setWagerDollars(event.target.value.toString());
//         setWager(wager.toString());
//         setTotalWager(totalWager);
//         await checkERC20Amount((currentToken?.contract_address) as string);
//     };

//     function setPercentageWager(percentage: number) {
//         var wager = availableAmount * percentage;

//         setWager(wager.toString());
//         setWagerDollars((wager / 10).toString());
//         setTotalWager(wager * betsAmount);
//     }

//     const [resultsPending, set_results_pending] = useState(false);

//     const NewBetHandle = (bet: Api.T_BetInfo) => {
//         if (!resultsPending
//             || bet.player.toLowerCase() != currentWalletAddress?.toLowerCase()
//             || bet.network_id != currentNetwork?.network_id
//             || bet.token_address != currentToken?.contract_address
//         ) {
//             return;
//         }

//         const web3Utils = new Web3();

//         console.log('Bet', bet);

//         // const decodedParameters: any = web3Utils.eth.abi.decodeLog(GameEvent as { type: string; name: string; }[], event.data, []);
//         // console.log(decodedParameters);
//         let total_wager = BigInt(bet.wager) * BigInt(bet.bets);
//         let payout = BigInt(bet.profit);
//         let loss = total_wager - payout;
//         console.log(payout);
//         console.log(loss);
//         set_results_pending(false);
//         placeBet(false);
//         if (payout > total_wager) {
//             console.log("You won!");
//             setWon(true);
//             ForceFireworkRerender(RerenderFirework + 1);
//             //playSound(coinSoundBuffer);
//             playSound(wonSoundBuffer);

//             switch (pickedSymbol) {
//                 case RPSModel.Symbol.Paper: { setSymbolWon(RPSModel.Symbol.Rock); break };
//                 case RPSModel.Symbol.Rock: { setSymbolWon(RPSModel.Symbol.Scissors); break };
//                 case RPSModel.Symbol.Scissors: { setSymbolWon(RPSModel.Symbol.Paper); break };
//             }
//         } else {
//             console.log("You lost!");
//             setWon(false);
//             //playSound(coinSoundBuffer);
//             playSound(lostSoundBuffer);

//             switch (pickedSymbol) {
//                 case RPSModel.Symbol.Paper: { setSymbolWon(RPSModel.Symbol.Scissors); break; };
//                 case RPSModel.Symbol.Rock: { setSymbolWon(RPSModel.Symbol.Paper); break; };
//                 case RPSModel.Symbol.Scissors: { setSymbolWon(RPSModel.Symbol.Rock); break; };
//             }
//         }

//     };

//     useEffect(() => {
//         if (newBet != null) {
//             NewBetHandle(newBet);
//         }
//     }, [newBet])

//     const makeBet = async () => {
//         await checkERC20Amount((currentToken?.contract_address) as string);

//         if (availableAmount < totalWager) {
//             return;
//         }

//         console.log('Making bet', Game, GameEvent, GameAbi, totalWager);
//         if (Game == undefined || GameEvent == undefined || totalWager == 0 || web3Provider == null) {
//             return;
//         }

//         const ethereum = web3Provider;
//         const web3Utils = new Web3();

//         const signer = await ethereum.getSigner();
//         const rps_contract = new ethers.Contract(Game.address, GameAbi as any, signer);
//         //const vrfcoordinator_contract = new ethers.Contract(VRFCoordinatorAddress, VRFCoordinatorAbi, ethereum);

//         const tokenAddress = currentToken?.contract_address;
//         console.log(`Token:${tokenAddress}`);
//         const tokenContract = new ethers.Contract(tokenAddress as string, IERC20, signer);

//         let fees = await rps_contract.getVRFFee(1000000);

//         let allowance = await tokenContract.allowance(currentWalletAddress, Game.address);

//         console.log("Allowance:", allowance);

//         var totalWagerConvertedString = totalWager.toFixed(currentTokenDecimals).replace('.', '');

//         const totalWagerConverted = BigInt(totalWagerConvertedString);
//         console.log("TotalWagerConverted", totalWagerConverted);

//         if (allowance < totalWagerConverted) {
//             try {
//                 await tokenContract.approve(Game.address, BigInt((availableAmount + 1) * (10 ** currentTokenDecimals)));
//             } catch (error) {
//                 console.log("Error increasing allowance", error);
//                 return;
//             }
//         }

//         // console.log("Placing bet", win_chance, multiplier);
//         try {
//             await rps_contract.RockPaperScissors_Play(
//                 BigInt(parseFloat(inputWager) * 10 ** currentTokenDecimals),
//                 tokenAddress,
//                 pickedSymbol.valueOf(),
//                 betsAmount,
//                 totalWagerConverted * BigInt(betsAmount),
//                 totalWagerConverted * BigInt(betsAmount),
//                 { value: 3000000000000000, gasLimit: 3000000, gasPrice: await ethereum.getGasPrice() });
//         } catch (error) {
//             console.log("Error placing bet", error);
//             return;
//         }
//         console.log("Bet placed");

//         set_results_pending(true);

//         placeBet(true);

//         await checkERC20Amount((currentToken?.contract_address) as string);
//     }

//     const [RerenderFirework, ForceFireworkRerender] = useState(0);
//     const [audioContext, setAudiocontext] = useState<any>(null);
//     const [coinSoundBuffer, setCoinSound] = useState<any>(null);
//     const [wonSoundBuffer, setWonSound] = useState<any>(null);
//     const [lostSoundBuffer, setLostSound] = useState<any>(null);

//     useEffect(() => {
//         setAudiocontext(new AudioContext());
//     }, []);

//     async function loadSound(url: string, handler: any) {
//         if (audioContext == null) {
//             return;
//         }

//         var request = new XMLHttpRequest();
//         request.open('GET', url, true);
//         request.responseType = 'arraybuffer';

//         // Decode asynchronously
//         request.onload = function () {
//             audioContext.decodeAudioData(request.response, function (buffer: any) {
//                 handler(buffer);
//             }, (e: any) => e);
//         }
//         request.send();
//     }

//     function playSound(buffer: any) {
//         var source = audioContext.createBufferSource();
//         source.buffer = buffer;
//         source.connect(audioContext.destination);
//         source.start();
//     }

//     useEffect(() => {
//         loadSound("/static/media/games_assets/coinflip/coinSound.mp3", setCoinSound);
//         loadSound("/static/media/games_assets/coinflip/wonSound.wav", setWonSound);
//         loadSound("/static/media/games_assets/coinflip/lostSound.wav", setLostSound);
//     }, [audioContext]);

//     return (<div className={s.background_container}>
//         <Background children={[
//             <div className={s.game_menu}>
//                 <div className={s.settings}>
//                     <SecondaryBackground children={[
//                         <MultipleBets on_change_bets_handler={onChangeBetsHandler} bets_amount={betsAmount} />,
//                         <InputField name="Stop Gain" />,
//                         <InputField name="Stop Loss" />,
//                         <OutputField name="Total Wager" value={<div>{totalWager}</div>} />,
//                         //<OutputField name="Total Wager" value={<div className={s.profit_on_win}>+{profitOnWin}</div>} />
//                     ]} height={214} min_width={150} secondary_class={""} />
//                     {/* <GameInfo /> */}
//                     <Wager
//                         value={inputWager}
//                         onChangeHandler={onChangeWagerHandler}
//                         onChangeDollarsHandler={onChangeDollarsHandler}
//                         valueDollars={inputWagerDollars}
//                         onClickHandlers={setPercentageWager} />
//                     <PlaceBetButton active={currentWalletAddress != null} multiple_bets={betsAmount > 1} onClick={makeBet} bet_placed={BetPlaced} />
//                     <RPSPicker betPlaced={BetPlaced}></RPSPicker>
//                 </div>
//                 <SymbolDisplay symbolResult={symbolWon} />
//             </div>,
//             <Firework.Firework render={Won as boolean} force_rerender={RerenderFirework} />
//         ]} height={undefined} min_width={370} min_height={512} />
//     </div>)
// }
