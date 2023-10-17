import { FC, useState } from "react";
import s from "./styles.module.scss";
import { ArrowDownIcon } from "@/shared/SVGs/ArrowDownIcon";
import { PokerHandsBlock } from "../PokerHandsBlock/PokerHandsBlock";
interface GamePageBottomBlockProps {
  isPoker?: boolean;
}
export const GamePageBottomBlock: FC<GamePageBottomBlockProps> = ({
  isPoker,
}) => {
  const [accordionActive, setAccordionActive] = useState(false);
  const [currentItem, setCurrentItem] = useState("poker");

  const showTableHandler = () => {
    setCurrentItem("poker");
    if (!accordionActive) {
      setAccordionActive(true);
    } else if (accordionActive && currentItem == "about") {
      setCurrentItem("poker");
    } else if (accordionActive && currentItem == "poker") {
      setAccordionActive(false);
    }
  };

  const aboutHandler = () => {
    setCurrentItem("about");
    if (!accordionActive) {
      setAccordionActive(true);
    } else if (accordionActive && currentItem == "poker") {
      setCurrentItem("about");
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
          ${s.game_page_bottom_wrap_header_accordion_btn}`}
            onClick={showTableHandler}
          >
            Show table <ArrowDownIcon />
          </div>
        )}
        <div
          className={`${s.game_page_bottom_about_the_game_btn} 
          ${s.game_page_bottom_wrap_header_accordion_btn}`}
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
        >
          <PokerHandsBlock />
        </div>
        <div
          className={`${s.aboutTheGame_wrap} ${
            currentItem == "about" && s.aboutActive
          }`}
        >
          <p className={s.about_text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            explicabo, repellat quibusdam aut impedit mollitia, rerum libero
            praesentium ducimus ab dolore sunt dolores ipsa! Vel maxime nam
            beatae aspernatur quis ex sed nemo eligendi voluptate necessitatibus
            repudiandae deleniti reprehenderit aut ab suscipit, possimus
            explicabo asperiores, ut sint quaerat adipisci labore.
          </p>
        </div>
      </div>
    </div>
  );
};
