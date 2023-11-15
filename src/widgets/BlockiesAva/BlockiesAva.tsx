import s from "./styles.module.scss";
import { FC } from "react";
import Blockies from "react-blockies";

interface BlockiesAvaProps {
  address: any;
}

const colors = [
  "#9746B5",
  "#F57731",
  "#4ED26C",
  "#E3C549",
  "#43B581",
  "#43B581",
  "#43B581",
  "#FAA61A",
  "#F47B68",
  "#9B84EE",
  "#44DDBF",
  "#FF0092",
  "#3DBCE5",
  "#FF73FA",
];

export const BlockiesAva: FC<BlockiesAvaProps> = ({ address }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={s.blockies_wrap}>
      <Blockies
        seed={`${address.toLowerCase()}`}
        className={s.header_profile_ico_block}
      />
    </div>
  );
};
