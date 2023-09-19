import { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { web3 } from '@/entities/web3';
import * as Api from '@/shared/api';

export interface SettingsInitProps { };
export const SettingsInit: FC<SettingsInitProps> = props => {
    const [
        queryChains,
        Chains
    ] = useUnit([
        web3.queryChains,
        web3.$Chains
    ]);

    useEffect(() => {
        queryChains()
    }, []);
    return (<></>)
}