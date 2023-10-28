import { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import * as Api from '@/shared/api';
import { settingsModel } from '@/entities/settings';
import { sessionModel } from '@/entities/session';
import { WagerModel } from '../WagerInputsBlock';
import {
    useNetwork,
    useAccount,
    useContractRead,
    useSignMessage
} from 'wagmi';
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { queryAvailableTokens } from '@/entities/settings/model';
import { useSearchParams } from 'next/navigation'

export interface SessionInitProps {
    game: string | undefined
};
export const SessionInit: FC<SessionInitProps> = props => {
    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();

    const [
        setAvailableTokens,
        setBalance,
        setAllowance,
        setGameAddress,
        GameAddress,
        pickedToken,
    ] = useUnit([
        settingsModel.setAvailableTokens,
        sessionModel.setBalance,
        sessionModel.setAllowance,
        sessionModel.setGameAddress,
        sessionModel.$gameAddress,
        WagerModel.$pickedToken
    ]);

    //if (props.game) {
    useEffect(() => {
        if (!chain || !props.game) {
            return;
        }

        const run = async () => {
            const game = (await Api.getGame({
                network_id: chain.id,
                game_name: props.game as string
            })).body as Api.T_Game;

            console.log("game", game);

            setGameAddress(game.address);
        };

        run();
    }, [chain]);

    const { signMessage, variables, data: signMessageData } = useSignMessage();
    const searchParams = useSearchParams();

    useEffect(() => {
        const firstTime = localStorage.getItem("firstTime");
        console.log('first time', firstTime);

        // const run = async () => {

        // };

        if (!firstTime && isConnected) {
            //localStorage.setItem('firstTime', 'false');
            //run();
            const partner_wallet = searchParams.get('partner_address');
            const site_id = searchParams.get('site_id');
            const sub_id = searchParams.get('sub_id');
            const msg = `CONNECT WALLET ${partner_wallet} ${(address as string).toLowerCase()} ${site_id} ${sub_id}`
            signMessage({ message: msg });
        }
    }, [isConnected, address])

    useEffect(() => {
        ; (async () => {
            if (variables?.message && signMessageData) {
                await Api.connectWalletPartner({
                    user_wallet: (address as string).toLowerCase(),
                    partner_wallet: searchParams.get('partner_address') as string,
                    site_id: Number(searchParams.get('site_id')),
                    sub_id: Number(searchParams.get('sub_id')),
                    signature: signMessageData.slice(2)
                });
                localStorage.setItem('firstTime', 'false');
            }
        })()
    }, [signMessageData, variables?.message])

    // const { data: allowance, isError: allowanceError, isLoading, refetch: fetchAllowance } = useContractRead({
    //     chainId: chain?.id,
    //     address: (pickedToken?.contract_address as `0x${string}`),
    //     abi: IERC20,
    //     functionName: 'allowance',
    //     args: [address, GameAddress],
    //     watch: true,
    // });
    // useEffect(() => {
    //     if (allowance) {
    //         const new_allowance = Number((allowance as bigint) / BigInt(100000000000000)) / 10000;
    //         console.log('allowance', new_allowance);
    //         setAllowance(new_allowance);
    //     }
    // }, [allowance]);

    // const { data: balance, error, isError: balanceError, refetch: fetchBalance } = useContractRead({
    //     address: (pickedToken?.contract_address as `0x${string}`),
    //     abi: IERC20,
    //     functionName: 'balanceOf',
    //     args: [address],
    //     watch: true,
    // });
    // useEffect(() => {
    //     if (allowance) {
    //         const new_balance = Number((balance as bigint) / BigInt(100000000000000)) / 10000;
    //         console.log('balance', new_balance);
    //         setBalance(new_balance);
    //     }
    // }, [balance]);
    //}

    useEffect(() => {
        if (!isConnected && !chain) {
            setAvailableTokens({ tokens: [] });
            console.log("nullyfying tokens");
            return;
        }
        const run = async () => {
            const tokens = (await Api.getTokens({
                network_id: (chain?.id) as number
            })).body as Api.T_Tokens;
            console.log("tokens", tokens);
            setAvailableTokens(tokens);
        };

        run();
        //queryAvailableTokens({ network_id: (chain?.id) as number });
    }, [chain, isConnected]);

    return (<></>)
}