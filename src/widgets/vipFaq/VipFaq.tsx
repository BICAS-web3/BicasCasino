import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import clsx from "clsx";
import "swiper/scss";
import downArr from "@/public/media/vipPage/downArrr.webp";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const questions = {
  general: [
    {
      title: "What the VIP program is for ?",
      text: "The VIP Program is an exclusive offer designed for the most loyal and active members of the community. It is a system of privileges and rewards designed to show appreciation and gratitude for the constant support and activity of the players.",
      id: 0,
    },
    {
      title: "How do we calculate levels ?",
      text: "On our gaming platform, we reward our users with VIP levels based on the total amount of funds put into the games. This reward system ensures that every bet you make brings you closer to new levels of privileges and exclusive features, deepening your immersion in the world of gaming.",
      id: 1,
    },
    {
      title: "How do I calculate the amount left to level up?",
      text: "To find out how much is left before you level up on the platform, you can easily go to your personal account and see your total betting turnover. This feature allows you to track your progress at any time and plan further actions to reach the next Vip level.",
      id: 2,
    },
    {
      title: "What DRAXB is used for",
      text: "On our platform, the DRAXB token acts as a unique bonus means. To activate and utilize these bonus tokens, you need to wager with the DRAXB token for an amount that is 150 times the initial bonus. This is an easy and exciting way to maximize your opportunities and dive into the world of gaming with new perspectives.",
      id: 3,
    },
    {
      title: "Where can I find answers to additional questions ?",
      text: "If you have any questions or need more information, we are always happy to help you in our Greek Keepers telegram chat. Feel free to ask your questions there, where our team will be quick and happy to provide you with all the information you need. Alternatively, if you prefer a more formal way of communication, we are always open to your emails. Write to our mail and we will be sure to respond to all your queries as soon as possible. Your satisfaction and convenience in communicating with us is our priority.",
      id: 4,
    },
  ],
  vip: [
    {
      title: "Exclusive Access:",
      text: "Our VIP customers enjoy the privilege of 24/7 access to personalized support. At any time of the day or night, our highly trained experts are available to assist and answer any questions related to the gaming platform.",
      id: 0,
    },
    {
      title: "Personalized Service:",
      text: "Each VIP customer receives a designated personal account manager who is familiar with the player's history and preferences. This provides more efficient and focused service, as well as assistance with any questions or concerns.",
      id: 1,
    },
    {
      title: "Quick Problem Solving:",
      text: `With prioritized service, all VIP customer inquiries and concerns are handled first, ensuring a faster and more efficient resolution.`,
      text_2:
        " Your VIP support at Greek Keepers is a guarantee that your time at our casino will be as comfortable, safe and enjoyable as possible",
      id: 2,
    },
  ],
};

interface VipFaqProps { }

export const VipFaq: FC<VipFaqProps> = () => {
  const [activeStatus, setActiveStatus] = useState<"general" | "vip">(
    "general"
  );
  const [activeAccordeon, setActiveAccordeon] = useState<number[]>([]);
  const swiperRef = useRef<SwiperRef>(null);
  const handleChangeAccordeon = (id: number) => {
    const index = activeAccordeon.findIndex((val) => val == id);
    if (index != -1) {
      setActiveAccordeon([
        ...activeAccordeon.slice(0, index),
        ...activeAccordeon.slice(index + 1, undefined),
      ]);
    } else {
      setActiveAccordeon([id, ...activeAccordeon]);
    }
  };

  return (
    <section className={s.faq_section}>
      <div className={s.faq_body}>
        <h3 className={s.faq_title}>FAQ of our VIP Club</h3>
        {/* <div className={s.mob_swiper}>
          <Swiper ref={swiperRef} slidesPerView={"auto"} centeredSlides={true}>
            <SwiperSlide className={s.slide}>
              <button
                onClick={() => setActiveStatus("general")}
                className={clsx(
                  s.faq_types_btns_item,
                  activeStatus === "general" && s.btn_active
                )}
              >
                General
              </button>
            </SwiperSlide>
            <SwiperSlide className={s.slide}>
              <button
                onClick={() => setActiveStatus("vip")}
                className={clsx(
                  s.faq_types_btns_item,
                  activeStatus === "vip" && s.btn_active
                )}
              >
                VIP Support
              </button>
            </SwiperSlide>
          </Swiper>
        </div> */}

        <div className={s.faq_types_btns}>
          <button
            onClick={() => setActiveStatus("general")}
            className={clsx(
              s.faq_types_btns_item,
              activeStatus === "general" && s.btn_active
            )}
          >
            General
          </button>
          <button
            onClick={() => setActiveStatus("vip")}
            className={clsx(
              s.faq_types_btns_item,
              activeStatus === "vip" && s.btn_active
            )}
          >
            VIP Support
          </button>
        </div>
        <div className={s.faq_block}>
          <div className={s.accordeon_block}>
            {questions[activeStatus]?.map((item: any, ind: number) => (
              <div key={item.id} className={`${s.accordeon} `}>
                <div
                  className={s.accordeon_header}
                  onClick={() => handleChangeAccordeon(item.id)}
                >
                  <span className={s.accordeon_title}>{item.title}</span>
                  <img
                    src={downArr.src}
                    data-active={activeAccordeon.includes(item.id) && true}
                    className={s.arr}
                    alt="arr"
                  />
                </div>
                <div
                  className={`${s.accordeon_body} ${activeAccordeon.find((val) => item.id == val) !=
                    undefined && s.accordeon_active
                    }`}
                >
                  <div className={s.accordeon_content}>
                    <p className={s.accordeon_text}>{item.text}</p>
                    <p className={clsx(s.accordeon_text, s.accordeon_text_2)}>
                      {item?.text_2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
