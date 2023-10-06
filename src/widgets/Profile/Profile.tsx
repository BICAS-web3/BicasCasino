import Image from 'next/image';
import { FC } from 'react';
//import { ProfileHeader } from '../ProfileHeader';
//import { BetsHistory } from '../BetsHistory';

export interface ProfileProps {
    address: string
};

export const Profile: FC<ProfileProps> = props => {
    return (<>
        {/* <ProfileHeader queried_address={props.address} ></ProfileHeader> */}
        {/* <BetsHistory address={props.address}></BetsHistory> */}
    </>)
}