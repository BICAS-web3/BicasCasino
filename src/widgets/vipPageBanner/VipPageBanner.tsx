import { FC } from "react";
import s from "./styles.module.scss";
import bannerBg from "@/public/media/vipPage/bannerBg.jpeg";

interface VipPageBannerProps {}

export const VipPageBanner: FC<VipPageBannerProps> = () => {
  return (
    <div className={s.vip_page_banner}>
      <img src={bannerBg.src} alt="banner-bg" className={s.banner_bg_img} />
      <div className={s.vip_page_banner_body}>
        <div className={s.mob_black_ellipse}></div>
        <h3 className={s.vip_page_banner_title}>
          join our <span>vip club</span>!
        </h3>
        <span className={s.vip_page_banner_text}>
          Become a VIP player and receive incredible privileges, bonuses and
          gifts from Greek Keepers. By joining our exclusive club, you'll
          discover a world of high-end gaming full of exciting tournaments and
          unique opportunities. Discover a world of privileges and rewards by
          becoming part of our VIP community.
        </span>
        <button className={s.join_btn}>Join now</button>
      </div>
    </div>
  );
};
