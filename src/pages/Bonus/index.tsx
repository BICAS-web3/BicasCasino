import Head from "next/head";
import { Header } from "@/widgets/header/index";
import s from "./style.module.scss";
import { Layout } from "@/widgets/Layout";

import bonus_1 from "@/public/media/bonus_icons/bonus_1.svg";
import bonus_2 from "@/public/media/bonus_icons/bonus_2.svg";
import bonus_3 from "@/public/media/bonus_icons/bonus_3.svg";

import eclipse from "@/public/media/bonus_icons/sircle_eclipse.svg";
import section_3 from "@/public/media/bonus_images/section_3.png";
import section_2_2 from "@/public/media/bonus_images/section_2_2.png";
import section_2_3 from "@/public/media/bonus_images/section_2_3.png";
import section_2 from "@/public/media/bonus_images/section_2.png";
import section_1 from "@/public/media/bonus_images/section_1.png";
import section_1_3 from "@/public/media/bonus_images/section_1_3.png";
import bonus_bg from "@/public/media/bonus_images/bonus_bg.png";
import bonus_bg_2 from "@/public/media/bonus_images/bonus_bg_2.png";
import bonus_bg_3 from "@/public/media/bonus_images/bonus_bg_3.png";
import Image from "next/image";
import { CustomButton } from "@/shared/ui/CustomButton";
import clsx from "clsx";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import * as ConnectModel from "@/widgets/Layout/model";
import { ConnectButton } from "@/widgets/connectButton/ConnectButton";
import { PopUpBonus } from "@/widgets/PopUpBonus";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    if (showBonus) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";
    } else {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    }
  }, [showBonus]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    };
  }, []);
  return (
    <>
      <Head>
        <title>Bonus</title>
      </Head>
      <Layout gameName={undefined}>
        <div className={s.main_container}>
          <section className={s.bonus_section}>
            <span className={s.bonus_eclipse}></span>
            <Image className={s.bonus_bg} src={bonus_bg} alt="bonus_bg" />
            <Image className={s.bonus_bg_2} src={bonus_bg_2} alt="bonus_bg" />
            <Image className={s.bonus_bg_3} src={bonus_bg_3} alt="bonus_bg" />
            <h2>
              UNLOCK <br className={s.br} /> <span>ENDLESS BENEFITS</span>
            </h2>
            <p className={s.bonus_subtitle}>
              Join now and embark on an exciting journey full of luck and
              rewards!
            </p>
            <div className={s.bonus_list}>
              <div className={s.bonus_list_item}>
                <Image src={bonus_1} alt="icon" />
                <div className={clsx(s.bonus_item_text, s.bonus_item_text_1)}>
                  <span>LEVEL UP BONUS</span>
                  <p>Reach new heights with our Level Up Bonus</p>
                </div>
              </div>
              <div className={s.bonus_list_item}>
                <Image src={bonus_2} alt="icon" />
                <div className={clsx(s.bonus_item_text, s.bonus_item_text_2)}>
                  <span>REPLACEMENT</span>
                  <p>
                    Plan your Reload bonuses with the recharge bonus of your
                    choice
                  </p>
                </div>
              </div>
              <div className={s.bonus_list_item}>
                <Image src={bonus_3} alt="icon" />
                <div className={clsx(s.bonus_item_text, s.bonus_item_text_3)}>
                  <span>WEEKLY AND MONTHLY CASHBACK</span>
                  <p>Get favourable weekly and monthly bonuses</p>
                </div>
              </div>
            </div>
            <Link href={"/games/CoinFlip"} className={clsx(s.btn, s.bonus_btn)}>
              Play now
            </Link>
          </section>
          <div className={s.instruction_container}>
            <div className={clsx(s.instruction_block, s.instruction_block_1)}>
              <div className={s.instruction_number}>
                <Image src={eclipse} alt="eclipse" />
                <span>1</span>
              </div>
              <p>Connect your wallet</p>
            </div>
            <div className={clsx(s.instruction_block, s.instruction_block_2)}>
              <div className={s.instruction_number}>
                <Image src={eclipse} alt="eclipse" />
                <span>2</span>
              </div>
              <p>Make sure you have enough native token for GAS network</p>
            </div>
            <div className={clsx(s.instruction_block, s.instruction_block_3)}>
              <div className={s.instruction_number}>
                <Image src={eclipse} alt="eclipse" />
                <span>3</span>
              </div>
              <p>Get your bonus and start play</p>
            </div>
          </div>
          <section className={s.about_section}>
            <span className={s.about_eclipse}></span>
            <span className={s.about_eclipse_2}></span>
            <div className={clsx(s.about_section_item, s.about_section_item_1)}>
              <Image
                className={clsx(s.section_about_img, s.section_img_1)}
                src={section_1}
                alt="'section_img"
              />
              <Image
                className={clsx(s.section_about_img, s.section_img_1_3)}
                src={section_1_3}
                alt="'section_img"
              />
              <div className={s.about_text_container}>
                {" "}
                <h3>Join the Exciting Adventure with Greek Keepers!</h3>
                <p>
                  Take advantage of our exclusive offer and get $100 in DRAXB
                  tokens! Discover unique gaming opportunities and enhance your
                  fun with our special bonus tokens. Don&apos;t miss this
                  chance!
                </p>
                <ConnectButton className={clsx(s.btn, s.connect_btn)} />
              </div>
            </div>
            <div className={clsx(s.about_section_item, s.about_section_item_2)}>
              <div className={s.about_text_container}>
                {" "}
                <h3>Your DRAXB tokens — Always on hand!</h3>
                <p>
                  Instant access to DRAXB tokens, which will be safely stored in
                  your Web3.0 wallet. Play whenever you want, enjoying freedom
                  and flexibility on our gaming platform!
                </p>
              </div>
              <Image
                className={clsx(s.section_about_img, s.section_img_2)}
                src={section_2}
                alt=""
              />{" "}
              <Image
                className={clsx(s.section_about_img, s.section_img_2_2)}
                src={section_2_2}
                alt=""
              />
              <Image
                className={clsx(s.section_about_img, s.section_img_2_3)}
                src={section_2_3}
                alt=""
              />
            </div>
            <div className={clsx(s.about_section_item, s.about_section_item_3)}>
              <Image
                className={clsx(s.section_about_img, s.section_img_3)}
                src={section_3}
                alt="'section_img"
              />
              <div className={s.about_text_container}>
                {" "}
                <h3>Start your journey with a simple step!</h3>
                <p>
                  All you need to activate your bonus token is some ETH or
                  Matic. Refill your wallet, choose your preferred network and
                  click the button below to claim your bonus. It&apos;s already
                  waiting for you!
                </p>
              </div>
            </div>
          </section>
          <section className={s.claim_section}>
            <span className={s.claim_eclipse}></span>
            <p className={s.claim_text}>
              To unlock your $100 bonus, you need to achieve a turnover of 150
              times this amount in bets. Turnover is defined as the total amount
              of your bets placed in DraxB tokens on our platform. Start playing
              today and unlock your bonus!
            </p>
            <button
              onClick={() => setShowBonus(true)}
              className={clsx(s.btn, s.claim_btn)}
            >
              Claim Bonus
            </button>
            {/* {showBonus && (
              <PopUpBonus showBonus={showBonus} setShowBonus={setShowBonus} />
            )} */}
            <PopUpBonus
              hide={true}
              showBonus={showBonus}
              setShowBonus={setShowBonus}
            />
          </section>
        </div>
      </Layout>
    </>
  );
}
