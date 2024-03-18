import { FC } from "react";
import s from "./styles.module.scss";

import level from "@/public/media/vipPage/uroven.webp";
import vip from "@/public/media/vipPage/cartochka.webp";
import present from "@/public/media/vipPage/podarok.webp";
import diagram from "@/public/media/vipPage/diagrama.webp";
import coin from "@/public/media/vipPage/moneta.webp";
import medal from "@/public/media/vipPage/medal.webp";
import kubok from "@/public/media/vipPage/kubok.webp";
import korona from "@/public/media/vipPage/corona.webp";

const list = [
  {
    title: "Level up Bonuses",
    text: "Get unique bonuses when you advance to new levels in the form of DRAXB tokens from Greek Keepers. Each new level in our game system rewards you with bonus DRAXB tokens.",
    ico: level,
  },
  {
    title: "additional privileges ",
    text: "Get an exclusive highlighting of your chat and betting history to match your VIP level. This feature not only sets you apart from other players, but also emphasizes your high status and achievements in the community. ",
    ico: vip,
  },
  {
    title: "Weekly bonus",
    text: "At Greek Keepers, every week brings new opportunities for our players. Especially for the most active among you, we offer weekly bonuses in DRAXB tokens! These bonuses are our way of expressing our appreciation for your continued gaming activity and participation.",
    ico: present,
  },
  {
    title: "Rakeback",
    text: "Upgrade to the gold level and get up to 50% back on the gas you spend on our platform.",
    ico: diagram,
  },
  {
    title: "Cashback bonus",
    text: "Get up to 9% cashback on your spending. This unique cashback system allows you to return a portion of your spending directly to your wallet. This system is designed to reward our most active and loyal players, making their gaming experience even more lucrative and exciting.",
    ico: coin,
  },
  {
    title: "Exclusive rewards for gaming activity",
    text: "In Greek Keepers, your playing activity directly affects the amount of bonuses you receive. The more you play, the more bonuses you get.",
    ico: medal,
  },
  {
    title: "Participation in tournaments and lotteries",
    text: "For every $1000 you put on our platform you will be assigned a ticket, win DRAX, NFT and more.",
    ico: kubok,
  },
  {
    title: "Premium support",
    text: "You will receive exclusive 24/7 support to advise you on any questions you may have.",
    ico: korona,
  },
];

interface VipPrivelegesProps { }

export const VipPriveleges: FC<VipPrivelegesProps> = () => {
  return (
    <section className={s.priveleges_section}>
      <div className={s.priveleges_body}>
        <h3 className={s.priveleges_title}>VIP club players privileges</h3>
        <div className={s.benefits_list}>
          {list.map((item, ind) => (
            <div key={ind} className={s.benefits_list_item}>
              <div className={s.item_ellipse}></div>
              <div className={s.benefits_info}>
                <h3 className={s.benefits_title}>{item.title}</h3>
                <p className={s.benefits_text}>{item.text}</p>
              </div>
              <img src={item.ico.src} className={s.benefits_ico} alt="icon" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
