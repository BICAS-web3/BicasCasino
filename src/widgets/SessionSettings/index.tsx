import { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import * as Api from '@/shared/api';
import { settingsModel } from '@/entities/settings';
import { useNetwork, useAccount } from 'wagmi';

export interface SessionInitProps { };
export const SessionInit: FC<SessionInitProps> = props => {
    const { isConnected } = useAccount();
    const { chain } = useNetwork();

    const [
        setAvailableTokens
    ] = useUnit([
        settingsModel.setAvailableTokens
    ]);

    useEffect(() => {
        if (!isConnected && !chain) {
            setAvailableTokens({ tokens: [] });
            return;
        }
        const run = async () => {
            const tokens = (await Api.getTokens({
                network_id: (chain?.id) as number
            })).body as Api.T_Tokens;
            setAvailableTokens(tokens);
        };

        run();
    }, [chain, isConnected]);

    return (<></>)
}