import Image from "next/image";
import { FC, JSX, useEffect, useState } from "react";
import s from "./styles.module.scss";
import swapS from "@/widgets/Swap/ui/styles.module.scss";
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
import { SwapToken } from "@/widgets/Swap/ui/SwapToken";
import { Blur } from "@/widgets/Swap/ui/Blur";
import * as SidebarM from "@/widgets/SideBar/model";
import { useUnit } from "effector-react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { Swap } from "../Swap";
import * as SwapModel from "@/widgets/Swap/model/index";
import { CloseSwapIcon } from "@/shared/SVGs/CloseSwapIcon";
import { useDropdown, useMediaQuery } from "@/shared/tools";
import { $isOpen, Close } from "@/widgets/SideBar/model";
import clsx from "clsx";
import { ArrowSwapIcon } from "@/shared/SVGs/ArrowSwapIcon";
export interface FooterProps {}
export const Footer: FC<FooterProps> = (props) => {
  const [sidebarState] = useUnit([SidebarM.$isOpen]);
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const profileRedirect = () => {
    if (isConnected) {
      router.push(`/account/${address?.toLocaleLowerCase}`);
    } else if (!isConnected && window.innerWidth < 650) {
      router.push(`/AccountFallback`);
    } else {
      return null;
    }
  };

  const isMobile = useMediaQuery("(max-width: 650px)");
  const { toggle, close, dropdownRef, isOpen, open: setOpen } = useDropdown();
  const [swapToggle, swapClose] = useUnit([
    SwapModel.flipSwapOpen,
    SwapModel.Close,
  ]);
  const [tokenFrom, setTokenFrom] = useState<any>();
  const [tokenTo, setTokenTo] = useState<any>();

  const [isSidebarOpen, setClose] = useUnit([$isOpen, Close]);

  useEffect(() => {
    !isOpen && swapClose();
  }, [isOpen]);

  const toggleSw = () => {
    toggle();
    swapToggle();
  };

  return (
    <>
      <div className={`${s.footer} ${!sidebarState && s.sidebar_closed}`}>
        <div className={s.footer_container}>
          <Blur isOpen={isOpen} />
          <article
            ref={dropdownRef}
            className={clsx(
              swapS.swap_block,
              isOpen && swapS.swap_block_open,
              (isSidebarOpen || isMobile) && swapS.swap_sidebar_open
            )}
          >
            <div className={swapS.swap_head}>
              <span></span> <h3>Swap</h3>
              <CloseSwapIcon
                className={swapS.swap_close_icon}
                onClick={() => {
                  close();
                  swapClose();
                  isMobile && setClose();
                }}
              />
            </div>
            <div className={swapS.swap_body}>
              <p className={swapS.swap_under_title}>
                Trade tokens in an instant
              </p>
              <div className={swapS.swap_main}>
                <SwapToken token={tokenFrom} setToken={setTokenFrom} />
                <span className={swapS.swap_arr}>
                  <ArrowSwapIcon className={s.swap_arr_icon} />
                </span>
                <SwapToken token={tokenTo} setToken={setTokenTo} />
              </div>
              <button className={swapS.swap_button}>Exchange</button>
            </div>
          </article>
          <div className={s.footer_body}>
            <div className={s.footer_leftSide_block}>
              <div className={s.games_list}>
                <Link href="" className={s.footer_text}>
                  BONUS
                </Link>
                <Link href="/games/GamesPage" className={s.footer_text}>
                  GAMES
                </Link>
                <span onClick={() => toggleSw()} className={s.footer_text}>
                  SWAP
                </span>
              </div>

              <div className={s.games_list}>
                <span
                  onClick={() => profileRedirect()}
                  className={s.footer_text}
                >
                  PROFILE
                </span>
                <Link href="/leaderboard" className={s.footer_text}>
                  LEADER BOARD
                </Link>
                <Link href="" className={s.footer_text}>
                  AFFILIATE
                </Link>
              </div>

              <div className={s.games_list}>
                <Link href="/nftmarket" className={s.footer_text}>
                  NFT MARKET
                </Link>
                <Link href="" className={s.footer_text}>
                  HOW TO PLAY
                </Link>
                <span
                  className={s.footer_text}
                  onClick={() => {
                    location.href = "https://t.me/GKSupportt";
                  }}
                >
                  SUPPORT
                </span>
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
      {/* <div className={`${s.footer} ${!sidebarState && s.sidebar_closed}`}>
        <div className={s.footer_container}>
          
      {/* <div className={swapS.footer_body}>
            <div className={s.footer_leftSide_block}>
              <div className={s.games_list}>
                <Link href="" className={s.footer_text}>
                  BONUS
                </Link>
                <Link href="/games/GamesPage" className={s.footer_text}>
                  GAMES
                </Link>
                <Link
                  href=""
                  onClick={() => toggleSw()}
                  className={s.footer_text}
                >
                  SWAP
                </Link>
              </div>

              <div className={s.games_list}>
                <span
                  onClick={() => profileRedirect()}
                  className={s.footer_text}
                >
                  PROFILE
                </span>
                <Link href="" className={s.footer_text}>
                  LEADER BOARD
                </Link>
                <Link href="" className={s.footer_text}>
                  AFFILIATE
                </Link>
              </div>

              <div className={s.games_list}>
                <Link href="/nftmarket" className={s.footer_text}>
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
      </div> */}
    </>
  );
};
