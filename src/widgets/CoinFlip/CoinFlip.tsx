import Image from 'next/image';
import { FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Background, SecondaryBackground } from '../GameInterface';
import s from './styles.module.scss';
import { MultipleBets, InputField, OutputField, Wager, PlaceBetButton } from '../GameInterface';
import * as CoinFlipModel from './model';
import { sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';
import Heads2Image from '@/public/media/games_assets/coinflip/Heads2.svg';
import Tails1Image from '@/public/media/games_assets/coinflip/Tails1.svg';
import Web3 from 'web3';
import { ethers } from 'ethers';
import * as Api from '@/shared/api';
import { ABI as IERC20 } from '@/shared/contracts/ERC20';

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


export interface CoinFlipProps { };

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
        currentWalletAddress
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
        sessionModel.$currentWalletAddress
    ]);

    var [Game, setGame] = useState<Api.T_Game>();
    var [GameAbi, setGameAbi] = useState<any>();
    var [GameEvent, setGameEvent] = useState<{ type: string, name: string }[]>();
    var [BetPlaced, placeBet] = useState<boolean>(false);


    useEffect(() => {
        if (Game == undefined) {
            get_game();
        }
    });

    useEffect(() => {
        if (GameAbi == undefined) {
            get_game_abi();
        }
    })


    const get_game = async () => {
        if (currentNetwork == null) {
            return;
        }
        let game = await Api.getGame({ network_id: currentNetwork.network_id, game_name: "CoinFlip" });
        console.log("got game");
        setGame(game.body as Api.T_Game);
    };

    useEffect(() => {
        get_game_event();
    }, [Game]);

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

    // const [
    //     currentWalletAddress
    // ] = useUnit([
    //     sessionModel.$currentWalletAddress
    // ]);

    const onChangeBetsHandler = (event: {
        target: {
            value: SetStateAction<string>;
        };
    }) => {
        const bets = Number(event.target.value);
        setBetsAmount(bets);
        setTotalWager(bets * inputWager);
    }

    const onChangeWagerHandler = (event: {
        target: {
            value: SetStateAction<string>;
        };
    }) => {
        try {
            var wager = Number(event.target.value);
        } catch (error) {
            return;
        }
        if (Number.isNaN(wager) || !Number.isFinite(wager)) {
            return;
        }
        setWager(wager);
        setTotalWager(wager * betsAmount);
    };

    const onMaxClickHandler = () => {
        console.log("pressed max");
    }

    const makeBet = async (pickedSide: CoinFlipModel.CoinSide) => {
        if (Game == undefined || GameEvent == undefined) {
            return;
        }
        // if(totalWager == 0){

        // }
        const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));
        const web3Utils = new Web3();

        const signer = await ethereum.getSigner();
        const coinflip_contract = new ethers.Contract(Game.address, GameAbi as any, signer);
        //const vrfcoordinator_contract = new ethers.Contract(VRFCoordinatorAddress, VRFCoordinatorAbi, ethereum);

        const tokenAddress = currentToken?.contract_address;
        console.log(`Token:${tokenAddress}`);
        const tokenContract = new ethers.Contract(tokenAddress as string, IERC20, signer);

        let fees = await coinflip_contract.getVRFFee(1000000);

        let resultsPending = false;

        const picked_side = pickedSide;

        const filter = coinflip_contract.filters.CoinFlip_Outcome_Event(await signer.getAddress());
        ethereum.on(filter, (event) => {
            if (!resultsPending) {
                return;
            }

            //const types = eval(GameEvent?.types as string);
            const decodedParameters: any = web3Utils.eth.abi.decodeLog(GameEvent as { type: string; name: string; }[], event.data, []);
            console.log(decodedParameters);
            let total_wager: bigint = decodedParameters.numGames as bigint * decodedParameters.wager as bigint;
            let payout: bigint = decodedParameters.payout;
            let loss: bigint = total_wager - payout;
            console.log(payout);
            console.log(loss);
            // setTotalGain(payout);
            // setTotalLoss(loss);
            if (decodedParameters.payout > decodedParameters.wager) {
                console.log("You won!");
            } else {
                console.log("You lost!");
            }
            if (decodedParameters.payout > decodedParameters.wager) {
                if (pickedSide == picked_side) {
                    console.log("Same side");
                    //pickSide(pickedSide.valueOf() ^ 1);
                    var el = document.getElementById("coin");
                    if (el != null) {
                        var content = el.outerHTML;
                        el.outerHTML = content;
                    }

                } else {
                    pickSide(picked_side);
                }
            } else {
                if (pickedSide == (picked_side.valueOf() ^ 1)) {
                    pickSide(picked_side);
                }
                pickSide(pickedSide.valueOf() ^ 1);
            }
            // setWon(pickedSide.valueOf() == decodedParameters.coinOutcomes[0] as number);
            console.log(decodedParameters);
            resultsPending = false;
            placeBet(false);

            console.log(decodedParameters.coinOutcomes[0] as CoinFlipModel.CoinSide);

            // let coinWrapper: HTMLElement = (document.getElementById('coin') as HTMLElement);
            // ReactDOM.unmountComponentAtNode(coinWrapper);
            // ReactDOM.render(<CoinFlipAnimation action={decodedParameters.coinOutcomes[0] as CoinSide} play={true} />, coinWrapper)

            //setPickedSide(decodedParameters.coinOutcomes[0] as CoinSide);
            //setPlayAnimation(true);
        })

        let allowance = await tokenContract.allowance(currentWalletAddress, Game.address);

        if (allowance < totalWager) {
            await tokenContract.approve(Game.address, totalWager * 10);
        }

        console.log("Placing bet");
        await coinflip_contract.CoinFlip_Play(totalWager, tokenAddress, pickedSide, betsAmount, 100000000000000, 100000000000000, { value: 3000000000000000, gasLimit: 3000000, gasPrice: 2500000256 });
        console.log("Bet placed");

        placeBet(true);
        resultsPending = true;
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
                    ]} width={392} height={214} min_width={392} secondary_class={""} />
                    <SecondaryBackground children={[
                        <Wager value={inputWager} onChangeHandler={onChangeWagerHandler} onMaxHandler={onMaxClickHandler} />
                    ]} width={392} height={90} min_width={392} secondary_class={""} />
                    <div className={s.coins_pick}>
                        <div onClick={() => pickSide(CoinFlipModel.CoinSide.Heads)}>
                            <SecondaryBackground children={[
                                <Image
                                    src={Heads2Image}
                                    alt=''
                                    width={75}
                                    height={75}
                                />
                            ]} width={204} height={105} min_width={204}
                                secondary_class={`${s.coin_pick_holder} ${pickedSide == CoinFlipModel.CoinSide.Heads ? s.coin_pick_picked : ''}`} />
                        </div>
                        <div onClick={() => pickSide(CoinFlipModel.CoinSide.Tails)}>
                            <SecondaryBackground children={[
                                <Image
                                    src={Tails1Image}
                                    alt=''
                                    width={75}
                                    height={75}
                                />
                            ]} width={204} height={105} min_width={204}
                                secondary_class={`${s.coin_pick_holder} ${pickedSide == CoinFlipModel.CoinSide.Tails ? s.coin_pick_picked : ''}`} />
                        </div>
                    </div>
                    <PlaceBetButton active={currentWalletAddress != null} multiple_bets={betsAmount > 1} onClick={async () => makeBet(pickedSide)} bet_placed={BetPlaced} />
                </div>
                <Coin side={pickedSide} />
            </div>
        ]} width={840} height={559} min_width={500} />
    </div>);
}
