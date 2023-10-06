import { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import * as Api from '@/shared/api';
import { settingsModel } from '@/entities/settings';
import { sessionModel } from '@/entities/session';
import { WagerModel } from '../WagerInputsBlock';
import {
    useNetwork,
    useAccount,
    useContractRead
} from 'wagmi';
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { queryAvailableTokens } from '@/entities/settings/model';

export interface SessionInitProps {
    game: string | undefined
};
export const SessionInit: FC<SessionInitProps> = props => {
    const { isConnected } = useAccount();
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

    if (props.game) {
        useEffect(() => {
            if (!chain) {
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
    }

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