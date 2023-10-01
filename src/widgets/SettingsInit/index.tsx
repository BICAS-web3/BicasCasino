import { FC, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { web3 } from '@/entities/web3';

export interface SettingsInitProps { };
export const SettingsInit: FC<SettingsInitProps> = props => {

    const [
        queryChains,
    ] = useUnit([
        web3.queryChains,
    ]);

    useEffect(() => {
        queryChains()
    }, []);
    return (<></>)
}