import Image from 'next/image';
import { GameLayout } from '../../../widgets/GameLayout/layout';
import { GameInfo } from '@/widgets/GameInfo';

import MinimalIcon from '@/public/media/games_assets/rock_paper_scissors/minimal_icon.svg';
import { LiveBets } from '@/widgets/LiveBets';
import { RPS } from '@/widgets/RockPaperScissors';

export default function RockPaperScissors() {

    return (
        <GameLayout gameName={'RockPaperScissors'} children={[
            <GameInfo name={'Rock-Paper-Scissors'} description={'A classic game of Chinese origins.\nChoose rock, paper or scissors and place your bet. There is a 33% chance to draw, win or lose determined by which action you choose.'} image={MinimalIcon} />,
            <RPS />,
            <LiveBets subscription_type={'Subscribe'} subscriptions={["RockPaperScissors"]} />
        ]} />
    );
}