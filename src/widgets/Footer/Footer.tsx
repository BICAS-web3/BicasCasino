import Image from "next/image";
import { FC, JSX, useEffect, useState } from "react";
import s from "./styles.module.scss";

import tgIcon from "@/public/media/social_media/telegram.svg";
import instIcon from "@/public/media/social_media/instagram.svg";
import facebookIcon from "@/public/media/social_media/facebook.svg";
import redditIcon from "@/public/media/social_media/reddit.svg";
import discordIcon from "@/public/media/social_media/discord.svg";
import mediumIcon from "@/public/media/social_media/medium.svg";
import mainIcon from "@/public/media/social_media/main.svg";
import twitterIcon from "@/public/media/social_media/twitter.svg";
import Link from "next/link";
import Logo from "@/public/media/brand_images/footerLogo.svg";

import * as SidebarM from "@/widgets/SideBar/model";
import { useUnit } from "effector-react";

export interface FooterProps {}
export const Footer: FC<FooterProps> = (props) => {
  const [sidebarState] = useUnit([SidebarM.$isOpen]);

  return (
    <>
      <div className={`${s.footer} ${!sidebarState && s.sidebar_closed}`}>
        <div className={s.footer_container}>
          <div className={s.footer_body}>
            <div className={s.footer_leftSide_block}>
              <div className={s.games_list}>
                <Link href="" className={s.footer_text}>
                  BONUS
                </Link>
                <Link href="" className={s.footer_text}>
                  GAMES
                </Link>
                <Link href="" className={s.footer_text}>
                  SPAW
                </Link>
              </div>

              <div className={s.games_list}>
                <Link href="" className={s.footer_text}>
                  PROFILE
                </Link>
                <Link href="" className={s.footer_text}>
                  LEADER BOARD
                </Link>
                <Link href="" className={s.footer_text}>
                  AFFILIATE
                </Link>
              </div>

              <div className={s.games_list}>
                <Link href="" className={s.footer_text}>
                  NFT MARKET
                </Link>
                <Link href="" className={s.footer_text}>
                  HOW TO PLAY
                </Link>
                <Link href="" className={s.footer_text}>
                  SUPPORT
                </Link>
              </div>
            </div>

            <div className={s.footer_rightSide_block}>
              <span className={s.footer_social_title}>Join our Community</span>
              <div className={s.icons_list}>
                <Link
                  href="https://t.me/greekkeepers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.tg_ico_wrap} ${s.ico_wrap}`}
                >
                  <Image src={tgIcon} alt={"telegram"} />
                </Link>
                <Link
                  href="https://instagram.com/greekkeepers?igshid=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.inst_wrap}`}
                >
                  <Image src={instIcon} alt={"inst"} />
                </Link>
                <Link
                  href="https://twitter.com/GreekKeepers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.twitter_wrap}`}
                >
                  <Image src={twitterIcon} alt={"twitter"} />
                </Link>
                <Link
                  href="https://discord.gg/ReJVd2xJSk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.discord_wrap}`}
                >
                  <Image src={discordIcon} alt={"discord"} />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=100092326343777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.facebook_wrap}`}
                >
                  <Image src={facebookIcon} alt={"facebook"} />
                </Link>
                <Link
                  href="https://www.reddit.com/user/GreekKeepers/?rdt=59831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.reddit_wrap}`}
                >
                  <Image src={redditIcon} alt={"reddit"} />
                </Link>
                <Link
                  href="https://medium.com/@greekkeepers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.medium_wrap}`}
                >
                  <Image src={mediumIcon} alt={"medium"} />
                </Link>
                <Link
                  href="https://www.greekkeepers.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.ico_wrap} ${s.main_wrap}`}
                >
                  <Image src={mainIcon} alt={"greekkeepres-main"} />
                </Link>
              </div>
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
