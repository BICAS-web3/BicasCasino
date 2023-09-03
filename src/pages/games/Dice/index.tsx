import Image from 'next/image';
import { GameLayout } from '../../../widgets/GameLayout/layout';
import { GameInfo } from '@/widgets/GameInfo';

import MinimalIcon from '@/public/media/games_assets/coinflip/minimal_icon.svg';
import { LiveBets } from '@/widgets/LiveBets';
import { Dice as DiceWidget } from '@/widgets/Dice';

export default function Dice() {

    return (
        <GameLayout gameName={'Dice'} children={[
            <GameInfo name={'Dice'} description={'A simple heads-or-tails game. 50% chance of winning with a 1.98x multiplier. Simply type in your wager amount and flip the coin!'} image={MinimalIcon} />,
            <DiceWidget />,
            <LiveBets subscription_type={'Subscribe'} subscriptions={["Dice"]} />
        ]} />
    );
}