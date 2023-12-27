import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import clsx from "clsx";
import "swiper/scss";
import downArr from "@/public/media/vipPage/downArrr.png";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const questions = {
  general: [
    {
      title: "What is an Affiliates Program?",
      text: "The Greek Keepers Affiliate Program is a partnership between you and the operator game.greekkeepers.io. The operator pays you a commission for any leads that are sent through your sites/social media/forums/links etc. Every referred customer that is active and produces revenue, generates profit for you.",
      id: 0,
    },
    {
      title: "How to join the affiliate program?",
      text: "The Greek Keepers Affiliate Program is a partnership between you and the operator game.greekkeepers.io. The operator pays you a commission for any leads that are sent through your sites/social media/forums/links etc. Every referred customer that is active and produces revenue, generates profit for you.",
      id: 1,
    },
    {
      title: "How much can I earn as an affiliate?",
      text: "The Greek Keepers Affiliate Program is a partnership between you and the operator game.greekkeepers.io. The operator pays you a commission for any leads that are sent through your sites/social media/forums/links etc. Every referred customer that is active and produces revenue, generates profit for you.",
      id: 2,
    },
    {
      title: "How much can I earn as an affiliate?",
      text: "The Greek Keepers Affiliate Program is a partnership between you and the operator game.greekkeepers.io. The operator pays you a commission for any leads that are sent through your sites/social media/forums/links etc. Every referred customer that is active and produces revenue, generates profit for you.",
      id: 3,
    },
  ],
};

interface VipFaqProps {}

export const VipFaq: FC<VipFaqProps> = () => {
  const [activeStatus, setActiveStatus] = useState("general");
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
        <div className={s.mob_swiper}>
          <Swiper ref={swiperRef} slidesPerView={"auto"} centeredSlides={true}>
            <SwiperSlide className={s.slide}>
              <button
                className={clsx(
                  s.faq_types_btns_item,
                  activeStatus === "general" && s.btn_active
                )}
              >
                General
              </button>
            </SwiperSlide>
            <SwiperSlide className={s.slide}>
              <button className={s.faq_types_btns_item}>Privileges</button>
            </SwiperSlide>
            <SwiperSlide className={s.slide}>
              <button className={s.faq_types_btns_item}>VIP-Manager</button>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={s.faq_types_btns}>
          <button
            className={clsx(
              s.faq_types_btns_item,
              activeStatus === "general" && s.btn_active
            )}
          >
            General
          </button>
          <button className={s.faq_types_btns_item}>Privileges</button>
          <button className={s.faq_types_btns_item}>VIP-Manager</button>
        </div>
        <div className={s.faq_block}>
          <div className={s.accordeon_block}>
            {questions.general.map((item, ind) => (
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
                  className={`${s.accordeon_body} ${
                    activeAccordeon.find((val) => item.id == val) !=
                      undefined && s.accordeon_active
                  }`}
                >
                  <div className={s.accordeon_content}>
                    <p className={s.accordeon_text}>{item.text}</p>
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
