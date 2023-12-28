import { FC, useRef } from "react";
import s from "./styles.module.scss";
import bronze from "@/public/media/vipPage/bronze.png";
import silver from "@/public/media/vipPage/silver.png";
import gold from "@/public/media/vipPage/gold.png";
import clsx from "clsx";
import "swiper/scss";
import { SwiperRef } from "swiper/react";
import checkboxDisabled from "@/public/media/vipPage/checkboxDisabled.png";
import checkboxActive from "@/public/media/vipPage/checkboxActive.png";
import { Swiper, SwiperSlide } from "swiper/react";

const statuses = [
  {
    status: "bronze",
    ico: bronze,
    statusBenefits: [
      {
        title: "Level Up Bonuses",
        active: true,
      },
      {
        title: "3% Cashback Bonus",
        active: true,
      },
      {
        title: "Exclusive rewards for gaming activity",
        active: true,
      },
      {
        title: "Additional privileges",
        active: true,
      },
      {
        title: "Participation in tournaments and lotteries",
        active: false,
      },
      {
        title: "Weekly bonuses",
        active: false,
      },
      {
        title: "Rakeback",
        active: false,
      },
      {
        title:
          "Dedicated 24-hour Premium support line by phone and live chat (provision is considered on an individual basis)",
        active: false,
      },
    ],
    turnover: 10000,
  },
  {
    status: "silver",
    ico: silver,
    statusBenefits: [
      {
        title: "Level Up Bonuses",
        active: true,
      },
      {
        title: "3% Cashback Bonus",
        active: true,
      },
      {
        title: "Exclusive rewards for gaming activity",
        active: true,
      },
      {
        title: "Additional privileges",
        active: true,
      },
      {
        title: "Participation in tournaments and lotteries",
        active: true,
      },
      {
        title: "Weekly bonuses",
        active: true,
      },
      {
        title: "Rakeback",
        active: false,
      },
      {
        title:
          "Dedicated 24-hour Premium support line by phone and live chat (provision is considered on an individual basis)",
        active: false,
      },
    ],
    turnover: 50000,
  },
  {
    status: "gold",
    ico: gold,
    statusBenefits: [
      {
        title: "Level Up Bonuses",
        active: true,
      },
      {
        title: "3% Cashback Bonus",
        active: true,
      },
      {
        title: "Exclusive rewards for gaming activity",
        active: true,
      },
      {
        title: "Additional privileges",
        active: true,
      },
      {
        title: "Participation in tournaments and lotteries",
        active: true,
      },
      {
        title: "Weekly bonuses",
        active: true,
      },
      {
        title: "Rakeback",
        active: true,
      },
      {
        title:
          "Dedicated 24-hour Premium support line by phone and live chat (provision is considered on an individual basis)",
        active: true,
      },
    ],
    turnover: 100000,
  },
];

interface VipStatusesProps {}

export const VipStatuses: FC<VipStatusesProps> = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className={s.vip_statuses_section}>
      <div className={s.vip_statuses_body}>
        <h2 className={s.vip_statuses_title}>available statuses</h2>
        <div className={s.swiper_wrap}>
          <Swiper
            ref={swiperRef}
            className={s.swiper}
            slidesPerView={"auto"}
            spaceBetween={10}
            breakpoints={{
              996: {
                slidesPerView: 3,
              },
            }}
          >
            {statuses.map((item, ind) => (
              <SwiperSlide className={s.slide}>
                <img
                  src={item.ico.src}
                  alt="ico-league"
                  className={s.status_ico}
                />
                <div key={ind} className={s.vip_statuses_list_item}>
                  <div className={s.ellipse} data-id={ind + 1}></div>

                  <span className={s.vip_status_lvl_title}>
                    {ind + 1}{" "}
                    {ind + 1 === 1 ? "st" : ind + 1 === 2 ? "nd" : "rd"} level
                  </span>
                  <span className={s.vip_league} data-id={ind + 1}>
                    {item.status}
                  </span>
                  <div className={s.vip_benefits_list}>
                    {item.statusBenefits.map((item, ind) => (
                      <div key={ind} className={s.vip_benefits_list_item}>
                        <span className={s.vip_benefits_list_item_title}>
                          {item.title}
                        </span>
                        <div
                          className={clsx(
                            s.checkbox,
                            item.active && s.checkbox_active
                          )}
                        >
                          {item.active ? (
                            <img src={checkboxActive.src} alt="arr" />
                          ) : (
                            <img src={checkboxDisabled.src} alt="arr" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className={s.vip_status_turnover_title}>
                    The turnover of funds on the platform exceeds $
                    <span>{item.turnover}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className={s.vip_statuses_list}>
          
        </div> */}
      </div>
    </section>
  );
};
