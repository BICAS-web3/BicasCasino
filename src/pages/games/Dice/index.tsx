// import Image from 'next/image';
// import { GameLayout } from '../../../widgets/GameLayout/layout';
// import { GameInfo } from '@/widgets/GameInfo';

import { web3 } from "@/entities/web3";
import { PopUpBonus } from "@/widgets/PopUpBonus";
import { useUnit } from "effector-react";
import { useState } from "react";
import { WagmiConfig } from "wagmi";

// import MinimalIcon from '@/public/media/games_assets/dice/minimal_icon.svg';
// // import { LiveBets } from '@/widgets/LiveBets';
// import { Dice as DiceWidget } from '@/widgets/Dice';

export default function Dice() {
  const [wagmiConfig] = useUnit([web3.$WagmiConfig]);
  return (
    // <GameLayout gameName={'Dice'} children={[
    //     <GameInfo name={'Dice'} description={'Dice is the most popular crypto casino game, with its roots originating from 2012 as Bitcoin’s use case for gambling came into existence.\nIt is a simple game of chance with easy customisable betting mechanics. Slide the bar left and the multiplier reward for winning your bet increases, while sacrificing the win chance. Slide the bar to the right, and the opposite happens.'} image={MinimalIcon} />,
    //     <DiceWidget />,
    //     // <LiveBets subscription_type={'Subscribe'} subscriptions={["Dice"]} />
    // ]} />

    <>
      {wagmiConfig !== null ? (
        <WagmiConfig config={wagmiConfig}>
          <div className="in-w-[100vh]">
            <span className="text-red-500 max-w-[400px] m">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
              soluta aspernatur iste hic eum veritatis sed perspiciatis. Sequi
              tempora quo illo fugit voluptatum labore dignissimos corrupti
              natus corporis temporibus alias ea at vitae ex ipsum, dolor, rem
              nihil eaque sunt eligendi in facilis. Aliquam earum accusantium
              qui sint porro et quo itaque suscipit. Quod doloribus animi a aut
              hic rerum blanditiis corrupti, eaque excepturi quaerat suscipit
              accusantium quasi repellat molestias quo atque nulla commodi ad
              unde? Ipsa ullam sint eius aperiam maxime voluptatibus porro
              consequuntur vitae fuga similique magni animi rerum mollitia iusto
              explicabo sequi, tempora quae dolores alias odit. Id, praesentium!
              Amet obcaecati, fugit corporis fuga modi ea, vitae sunt quas
              maxime possimus maiores odio distinctio incidunt, atque at
              accusamus in ratione quae magni non. Cupiditate quidem adipisci
              numquam repellat aliquam laborum! Quaerat quam magni laboriosam
              sit, facilis quia? Sed quibusdam, praesentium, harum blanditiis
              eveniet nisi vero fugiat ea pariatur, nobis officia tempore minus
              ab hic unde aliquid. Fugiat, voluptate ipsam maxime, impedit eos
              perspiciatis facere temporibus quisquam, a iure hic. Cum
              perspiciatis fugiat quasi repellat accusantium provident quisquam
              at, vero dolores molestiae voluptatum voluptas placeat in sit aut
              iusto? Hic soluta delectus voluptatum, recusandae, doloribus, odio
              unde sunt aspernatur impedit voluptas perspiciatis. Enim non quod
              animi consectetur dolorum, facere dolore provident quae optio hic
              explicabo nisi temporibus perferendis assumenda, quisquam omnis
              iure maiores, incidunt fugiat ratione repellendus eos voluptatum!
              Temporibus alias qui eligendi reprehenderit assumenda dolor
              deleniti distinctio, cupiditate in nulla molestias facilis sunt ut
              vero unde explicabo soluta iure ipsum quos quae saepe, rerum
              blanditiis reiciendis. Corporis libero laborum itaque praesentium
              aperiam facere, labore officia eius nisi alias odit excepturi
              illum, assumenda recusandae nesciunt explicabo. Adipisci iure
              veritatis distinctio corrupti rerum saepe quo a quas consequuntur,
              eligendi, placeat pariatur commodi exercitationem omnis amet. Cum
              accusamus ipsam obcaecati!
            </span>
            <PopUpBonus />
          </div>
        </WagmiConfig>
      ) : (
        <></>
      )}
    </>
  );
}
