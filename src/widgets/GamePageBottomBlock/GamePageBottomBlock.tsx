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

  const toggleItem = () => {
    // if (currentItem === ind) {
    //   return setCurrentItem(null);
    // }
    // setCurrentItem(ind);
  };

  return (
    <div className={s.game_page_bottom_wrap}>
      <div className={s.game_page_bottom_wrap_header}>
        {isPoker && (
          <div
            className={`${s.game_page_bottom_show_table_btn} 
          ${s.game_page_bottom_wrap_header_accordion_btn}`}
            onClick={() => setAccordionActive(!accordionActive)}
          >
            Show table <ArrowDownIcon />
          </div>
        )}
        <div
          className={`${s.game_page_bottom_about_the_game_btn} 
          ${s.game_page_bottom_wrap_header_accordion_btn}`}
          onClick={() => setAccordionActive(!accordionActive)}
        >
          About the Game <ArrowDownIcon />
        </div>
      </div>
      <div
        className={`${s.game_page_bottom_wrap_accordion} ${
          accordionActive && s.active
        }`}
      >
        {currentItem == "poker" && (
          <PokerHandsBlock />
          // <p className={s.about_text}>
          //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          //   explicabo, repellat quibusdam aut impedit mollitia, rerum libero
          //   praesentium ducimus ab dolore sunt dolores ipsa! Vel maxime nam
          //   beatae aspernatur quis ex sed nemo eligendi voluptate necessitatibus
          //   repudiandae deleniti reprehenderit aut ab suscipit, possimus
          //   explicabo asperiores, ut sint quaerat adipisci labore.
          // </p>
        )}
      </div>
    </div>
  );
};
