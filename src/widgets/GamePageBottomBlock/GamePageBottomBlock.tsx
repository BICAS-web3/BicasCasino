import { FC, useState } from "react";
import s from "./styles.module.scss";
import { ArrowDownIcon } from "@/shared/SVGs/ArrowDownIcon";
import { PokerHandsBlock } from "../PokerHandsBlock/PokerHandsBlock";
interface GamePageBottomBlockProps {
  isPoker?: boolean;
  gameText?: string;
}
export const GamePageBottomBlock: FC<GamePageBottomBlockProps> = ({
  isPoker,
  gameText,
}) => {
  const [accordionActive, setAccordionActive] = useState(false);
  const [currentItem, setCurrentItem] = useState("poker");

  const showTableHandler = () => {
    const pokerBlock = document.getElementById("poker_hands_wrap");

    setCurrentItem("poker");
    if (!accordionActive) {
      setAccordionActive(true);
      pokerBlock && window.scrollTo(0, pokerBlock?.scrollHeight - 150);
    } else if (accordionActive && currentItem == "about") {
      setCurrentItem("poker");
      pokerBlock && window.scrollTo(0, pokerBlock?.scrollHeight - 150);
    } else if (accordionActive && currentItem == "poker") {
      setAccordionActive(false);
    }
  };

  const aboutHandler = () => {
    const aboutBlock = document.getElementById("about_game_block");

    setCurrentItem("about");
    if (!accordionActive) {
      setAccordionActive(true);
      aboutBlock && window.scrollTo(0, 750);
    } else if (accordionActive && currentItem == "poker") {
      setCurrentItem("about");
      aboutBlock && window.scrollTo(0, 750);
    } else if (accordionActive && currentItem == "about") {
      setAccordionActive(false);
    }
  };

  return (
    <div className={s.game_page_bottom_wrap}>
      <div className={s.game_page_bottom_wrap_header}>
        {isPoker && (
          <div
            className={`${s.game_page_bottom_show_table_btn} 
          ${s.game_page_bottom_wrap_header_accordion_btn} ${
              currentItem === "poker" && accordionActive ? s.arrow_anim : null
            }`}
            onClick={showTableHandler}
          >
            Show table <ArrowDownIcon />
          </div>
        )}
        <div
          className={`${s.game_page_bottom_about_the_game_btn} 
          ${s.game_page_bottom_wrap_header_accordion_btn} ${
            currentItem === "about" && accordionActive ? s.arrow_anim : null
          }`}
          onClick={aboutHandler}
        >
          About the Game <ArrowDownIcon />
        </div>
      </div>
      <div
        className={`${s.game_page_bottom_wrap_accordion} ${
          -accordionActive && s.active
        }`}
      >
        <div
          className={`${s.poker_showTable_wrap} ${
            currentItem == "poker" && s.pokerActive
          }`}
          id="poker_hands_wrap"
        >
          <PokerHandsBlock />
        </div>
        <div
          className={`${s.aboutTheGame_wrap} ${
            currentItem == "about" && s.aboutActive
          }`}
          id="about_game_block"
        >
          <p className={s.about_text}>{gameText}</p>
        </div>
      </div>
    </div>
  );
};
