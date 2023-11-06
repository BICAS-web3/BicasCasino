import Image from "next/image";
import { FC, JSX, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Discord from "@/public/media/social_media/Discord.svg";
import Twitter from "@/public/media/social_media/Twitter.svg";
import Telegram from "@/public/media/social_media/Telegram.svg";
import Insta from "@/public/media/social_media/Insta.svg";
import Eagle from "@/public/media/brand_images/GKEagle.png";
import Greek_Keepers from "@/public/media/brand_images/Greek_Keepers.png";
import Link from "next/link";

export interface FooterProps {}
export const Footer: FC<FooterProps> = (props) => {
  return (
    <>
      <div className={s.footer}>
        <div className={s.footer_container}>
          <div className={s.footer_body}>
            <div className={s.logo}>
              <Image src={Eagle} alt={""} width={46.065} height={36} />
              <Image
                src={Greek_Keepers}
                alt={""}
                width={54.706}
                height={23.708}
              />
            </div>

            <div className={s.games_list}>
              <Link href="" className={s.footer_text}>
                GAMES
              </Link>
              <Link href="/games/CoinFlip" className={s.game_row}>
                Coinflip
              </Link>
              <Link href="/games/Dice" className={s.game_row}>
                Dice
              </Link>
              <Link href="/games/rps" className={s.game_row}>
                Rock paper scissors
              </Link>
              <Link href="/games/Poker" className={s.game_row}>
                Poker
              </Link>
            </div>

            <div className={s.footer_mainPages_list}>
              <Link href="" className={s.footer_text}>
                support
              </Link>
              <Link href="" className={s.footer_text}>
                Profile
              </Link>
              <Link href="/nftmarket" className={s.footer_text}>
                NFT Market
              </Link>
              <Link href="" className={s.footer_text}>
                Leader board
              </Link>
            </div>

            <div className={s.icons_list}>
              <Link
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Discord} alt={""} width={30} height={30} />
              </Link>
              <Link
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Twitter} alt={""} width={30} height={30} />
              </Link>
              <Link
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Telegram} alt={""} width={30} height={30} />
              </Link>
              <Link
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Insta} alt={""} width={30} height={30} />
              </Link>
            </div>
          </div>
        </div>
        <div className={s.footer_below}>
          BSC METAVERSE LIMITED Suite 305,
          <br />
          Griffith Corporate Centre
          <br />
          P.O. Box 1510, Beachmont Kingstown St. Vincent and the Grenadines
          <br />
          6818 BC 2023
        </div>
      </div>
    </>
  );
};
