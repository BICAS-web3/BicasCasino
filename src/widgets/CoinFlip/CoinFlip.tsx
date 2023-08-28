import Image from 'next/image';
import { FC, ReactNode, SetStateAction, useEffect, useState, use } from 'react';
import { Background, SecondaryBackground } from '../GameInterface';
import s from './styles.module.scss';
import { MultipleBets, InputField, OutputField, Wager, PlaceBetButton } from '../GameInterface';
import * as CoinFlipModel from './model';
import { sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';
import Heads2Image from '@/public/media/games_assets/coinflip/Heads2.svg';
import Tails1Image from '@/public/media/games_assets/coinflip/Tails1.svg';
import Web3 from 'web3';
import { BigNumber, ethers } from 'ethers';
import * as Api from '@/shared/api';
import { ABI as IERC20 } from '@/shared/contracts/ERC20';
import { BetStatus, Model as BetStatusModel } from '@/widgets/BetStatus';
import { web3 } from '@/entities/web3';
import { Firework } from '../Firework';

interface CoinProps {
    side: CoinFlipModel.CoinSide
};
const Coin: FC<CoinProps> = props => {
    return (
        <div id="coin" className={s.coin_container}>
            <div className={`${s.coin} ${props.side == CoinFlipModel.CoinSide.Heads ? s.heads : s.tails}`}>

                <Image
                    src={Heads2Image}
                    alt=''
                    width={250}
                    height={250}
                    className={s.coin_side_a}
                />
                <Image
                    src={Tails1Image}
                    alt=''
                    width={250}
                    height={250}
                    className={s.coin_side_b}
                />

            </div>
        </div>);
}

export interface CoinFlipProps {
};

export const CoinFlip: FC<CoinFlipProps> = props => {

    const [betsAmount,
        setBetsAmount,
        totalWager,
        setTotalWager,
        profitOnWin,
        setProfitOnWin,
        inputWager,
        setWager,
        pickedSide,
        pickSide,
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
        web3Provider,
        newBet
    ] = useUnit([
        CoinFlipModel.$betsAmount,
        CoinFlipModel.setBetsAmount,
        CoinFlipModel.$totalWager,
        CoinFlipModel.setTotalWager,
        CoinFlipModel.$profitOnWin,
        CoinFlipModel.setProfitOnWin,
        CoinFlipModel.$inputWager,
        CoinFlipModel.setWager,
        CoinFlipModel.$pickedSide,
        CoinFlipModel.pickSide,
        sessionModel.$currentToken,
        sessionModel.$currentNetwork,
        sessionModel.$currentWalletAddress,
        BetStatusModel.$Won,
        BetStatusModel.setWon,
        // sessionModel.$availableAmount,
        // sessionModel.setAvailableAmount,
        sessionModel.$currentTokenDecimals,
        sessionModel.setDecimals,
        CoinFlipModel.$inputWagerDollars,
        CoinFlipModel.setWagerDollars,
        web3.web3Provider,
        sessionModel.$newBet
    ]);

    var [Game, setGame] = useState<Api.T_Game>();
    var [GameAbi, setGameAbi] = useState<any>();
    var [GameEvent, setGameEvent] = useState<{ type: string, name: string }[]>();
    var [BetPlaced, placeBet] = useState<boolean>(false);
    var [availableAmount, setAvailableAmount] = useState(0);

    const get_game = async () => {
        if (currentNetwork == null) {
            return;
        }
        let game = await Api.getGame({ network_id: currentNetwork.network_id, game_name: "CoinFlip" });
        console.log("got game");
        setGame(game.body as Api.T_Game);
    };

    useEffect(() => {
        console.log('Quering decimals for token', currentToken);
        if (currentToken != null) {
            checkERC20Decimals(currentToken.contract_address);
        }
    }, [currentToken, web3Provider]);

    useEffect(() => {
        if (currentToken != null && currentTokenDecimals != 0) {
            checkERC20Amount(currentToken.contract_address);
        }
    }, [currentToken, currentTokenDecimals]);

    useEffect(() => {
        if (currentToken != null && currentTokenDecimals != 0 && currentWalletAddress != null) {
            checkERC20Amount(currentToken.contract_address);
        }
    }, [currentWalletAddress])

    useEffect(() => {
        setAudiocontext(new AudioContext());
    }, []);

    useEffect(() => {
        if (Game == undefined) {
            get_game();
        }
    }, [currentNetwork]);

    const get_game_abi = async () => {
        if (Game == undefined) {
            return;
        }
        var abi = await fetch('/static/json/games/CoinFlip/abi.json', {
            method: 'GET'
        }).then(async res => await res.json()).catch(e => (e));

        console.log(abi['abi']);

        setGameAbi(abi['abi']);
    }

    useEffect(() => {
        if (GameAbi == undefined) {
            get_game_abi();
        }
    }, [Game])


    const get_game_event = async () => {
        if (Game == undefined) {
            return;
        }
        let game_abi = await Api.getAbi({
            signature: Game.result_event_signature
        });
        console.log("GameAbi");
        console.log(game_abi);

        let types: string[] = eval((game_abi.body as Api.T_GameAbi).types);
        let names = (game_abi.body as Api.T_GameAbi).names.split(' ');

        var abi_deserialized: { type: string, name: string }[] = [];

        types.forEach((type, index) => {
            abi_deserialized.push({ type: type, name: names[index] });
        });

        setGameEvent(abi_deserialized);
    }

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
        await checkERC20Amount((currentToken?.contract_address) as string);
    }

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
        if (Number.isNaN(wager)
            || !Number.isFinite(wager)
            || totalWager > availableAmount
            || wagerString.charAt(0) == '+'
            || wagerString.charAt(0) == '-') {
            console.log(Number.isNaN(wager));
            return;
        }
        setWagerDollars((wager / 11571).toString());
        setWager(event.target.value.toString());
        setTotalWager(totalWager);
        await checkERC20Amount((currentToken?.contract_address) as string);
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
        if (Number.isNaN(wager)
            || !Number.isFinite(wager)
            || totalWager > availableAmount
            || wagerString.charAt(0) == '+'
            || wagerString.charAt(0) == '-') {
            console.log(Number.isNaN(wager));
            return;
        }
        setWagerDollars(event.target.value.toString());
        setWager(wager.toString());
        setTotalWager(totalWager);
        await checkERC20Amount((currentToken?.contract_address) as string);
    };

    const [RerenderCoin, ForceCoinRerender] = useState(0);
    const [RerenderFirework, ForceFireworkRerender] = useState(0);
    const [audioContext, setAudiocontext] = useState<any>(null);
    const [coinSoundBuffer, setCoinSound] = useState<any>(null);
    const [wonSoundBuffer, setWonSound] = useState<any>(null);
    const [lostSoundBuffer, setLostSound] = useState<any>(null);

    const checkERC20Amount = async (token_address: string) => {
        const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));
        const web3Utils = new Web3();

        const signer = await ethereum.getSigner();

        const tokenContract = new ethers.Contract(token_address, IERC20, signer);

        const currentBalance: BigNumber = await tokenContract.balanceOf(currentWalletAddress);

        const balanceString = currentBalance.toString();
        console.log('Balance', balanceString);

        if (balanceString == '0') {
            setAvailableAmount(0);
            return;
        }

        const decimals = currentTokenDecimals;

        console.log("Decimals:", decimals);
        const end = balanceString.length - decimals;

        const balanceNum = parseFloat(balanceString.slice(0, end) + '.' + balanceString.slice(end, end + 2));

        //console.log("Balance ", balanceNum);

        setAvailableAmount(balanceNum);
    }

    const checkERC20Decimals = async (token_address: string) => {
        const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));

        const signer = await ethereum.getSigner();

        const tokenContract = new ethers.Contract(token_address, IERC20, signer);

        const currentBalance = await tokenContract.decimals();
        setDecimals(currentBalance);
    }

    const [picked_side, set_picked_side] = useState(pickedSide);
    const [resultsPending, set_results_pending] = useState(false);

    const NewBetHandle = (bet: Api.T_BetInfo) => {
        if (!resultsPending
            || bet.player.toLowerCase() != currentWalletAddress?.toLowerCase()
            || bet.network_id != currentNetwork?.network_id
            || bet.token_address != currentToken?.contract_address
        ) {
            return;
        }

        const web3Utils = new Web3();

        console.log('Bet', bet);

        // const decodedParameters: any = web3Utils.eth.abi.decodeLog(GameEvent as { type: string; name: string; }[], event.data, []);
        // console.log(decodedParameters);
        let total_wager = BigInt(bet.wager) * BigInt(bet.bets);
        let payout = BigInt(bet.profit);
        let loss = total_wager - payout;
        console.log(payout);
        console.log(loss);
        if (payout > total_wager) {
            console.log("You won!");
        } else {
            console.log("You lost!");
        }
        if (payout > total_wager) {
            setWon(true);
            ForceFireworkRerender(RerenderFirework + 1);
            //playSound(coinSoundBuffer);
            playSound(wonSoundBuffer);
            if (pickedSide == picked_side) {
                console.log("Same side");
                ForceCoinRerender(RerenderCoin + 1);

            } else {
                pickSide(picked_side);
            }
        } else {
            setWon(false);
            //playSound(coinSoundBuffer);
            playSound(lostSoundBuffer);
            if (pickedSide == (picked_side.valueOf() ^ 1)) {
                console.log("Same side");
                ForceCoinRerender(RerenderCoin + 1);

            } else {
                pickSide(picked_side.valueOf() ^ 1);
            }
        }
        set_results_pending(false);
        placeBet(false);
    };

    useEffect(() => {
        if (newBet != null) {
            NewBetHandle(newBet);
        }
    }, [newBet])

    const makeBet = async (pickedSide: CoinFlipModel.CoinSide) => {
        await checkERC20Amount((currentToken?.contract_address) as string);

        console.log('Making bet', Game, GameEvent, totalWager);
        if (Game == undefined || GameEvent == undefined || totalWager == 0 || web3Provider == null) {
            return;
        }

        const ethereum = web3Provider;
        const web3Utils = new Web3();

        const signer = await ethereum.getSigner();
        const coinflip_contract = new ethers.Contract(Game.address, GameAbi as any, signer);
        //const vrfcoordinator_contract = new ethers.Contract(VRFCoordinatorAddress, VRFCoordinatorAbi, ethereum);

        const tokenAddress = currentToken?.contract_address;
        console.log(`Token:${tokenAddress}`);
        const tokenContract = new ethers.Contract(tokenAddress as string, IERC20, signer);

        let fees = await coinflip_contract.getVRFFee(1000000);


        let allowance = await tokenContract.allowance(currentWalletAddress, Game.address);

        console.log("Allowance:", allowance);

        var totalWagerConvertedString = totalWager.toFixed(currentTokenDecimals).replace('.', '');

        const totalWagerConverted = BigInt(totalWagerConvertedString);
        console.log("TotalWagerConverted", totalWagerConverted);

        if (allowance < totalWagerConverted) {
            try {
                await tokenContract.approve(Game.address, BigInt((availableAmount + 1) * (10 ** currentTokenDecimals)));
            } catch (error) {
                console.log("Error increasing allowance", error);
                return;
            }
        }

        console.log("Placing bet");
        try {
            await coinflip_contract.CoinFlip_Play(totalWagerConverted, tokenAddress, pickedSide, betsAmount, totalWagerConverted * BigInt(betsAmount), totalWagerConverted * BigInt(betsAmount), { value: 3000000000000000, gasLimit: 3000000, gasPrice: 2500000256 });
        } catch (error) {
            console.log("Error placing bet", error);
            return;
        }
        console.log("Bet placed");

        set_results_pending(true);

        placeBet(true);

        await checkERC20Amount((currentToken?.contract_address) as string);
    }

    async function loadSound(url: string, handler: any) {
        if (audioContext == null) {
            return;
        }

        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function () {
            audioContext.decodeAudioData(request.response, function (buffer: any) {
                handler(buffer);
            }, (e: any) => e);
        }
        request.send();
    }

    function playSound(buffer: any) {
        var source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
    }

    useEffect(() => {
        loadSound("/static/media/games_assets/coinflip/coinSound.mp3", setCoinSound);
        loadSound("/static/media/games_assets/coinflip/wonSound.wav", setWonSound);
        loadSound("/static/media/games_assets/coinflip/lostSound.wav", setLostSound);
    }, [audioContext]);

    // 0.25 0.5 0.75 1
    function setPercentageWager(percentage: number) {
        var wager = availableAmount * percentage;

        setWager(wager.toString());
        setWagerDollars((wager / 10).toString());
        setTotalWager(wager * betsAmount);
    }


    return (<div className={s.background_container}>
        <Background children={[
            <div className={s.game_menu}>
                <div className={s.settings}>
                    <SecondaryBackground children={[
                        <MultipleBets on_change_bets_handler={onChangeBetsHandler} bets_amount={betsAmount} />,
                        <InputField name="Stop Gain" />,
                        <InputField name="Stop Loss" />,
                        <OutputField name="Total Wager" value={<div>{totalWager}</div>} />,
                        <OutputField name="Total Wager" value={<div className={s.profit_on_win}>+{profitOnWin}</div>} />
                    ]} height={214} min_width={150} secondary_class={""} />
                    <SecondaryBackground children={[
                        <Wager
                            value={inputWager}
                            onChangeHandler={onChangeWagerHandler}
                            onChangeDollarsHandler={onChangeDollarsHandler}
                            valueDollars={inputWagerDollars}
                            onClickHandlers={setPercentageWager} />
                    ]} height={170} min_width={150} secondary_class={""} />
                    <div className={s.coins_pick}>
                        <div onClick={() => {
                            pickSide(CoinFlipModel.CoinSide.Heads);
                            playSound(coinSoundBuffer);
                        }} style={{ width: '100%' }}>
                            <SecondaryBackground children={[
                                <Image
                                    src={Heads2Image}
                                    alt=''
                                    width={75}
                                    height={75}
                                />
                            ]} height={105} min_width={107}
                                secondary_class={`${s.coin_pick_holder} ${pickedSide == CoinFlipModel.CoinSide.Heads ? s.coin_pick_picked : ''}`} />
                        </div>
                        <div onClick={() => {
                            pickSide(CoinFlipModel.CoinSide.Tails);
                            playSound(coinSoundBuffer);
                        }} style={{ width: '100%' }}>
                            <SecondaryBackground children={[
                                <Image
                                    src={Tails1Image}
                                    alt=''
                                    width={75}
                                    height={75}
                                />
                            ]} height={105} min_width={107}
                                secondary_class={`${s.coin_pick_holder} ${pickedSide == CoinFlipModel.CoinSide.Tails ? s.coin_pick_picked : ''}`} />
                        </div>
                    </div>
                    <PlaceBetButton active={currentWalletAddress != null} multiple_bets={betsAmount > 1} onClick={async () => makeBet(pickedSide)} bet_placed={BetPlaced} />
                </div>
                {<Coin side={pickedSide} key={RerenderCoin} />}
            </div>,
            <Firework.Firework render={Won as boolean} force_rerender={RerenderFirework} />
        ]} height={629} min_width={370} min_height={629} />
    </div>);
}
