import s from "./styles.module.scss";
import { FC } from "react";
import Blockies from "react-blockies";

interface BlockiesAvaProps {
  address: any;
}

export const BlockiesAva: FC<BlockiesAvaProps> = ({ address }) => {
  return (
    <div className={s.blockies_wrap}>
      <Blockies
        seed={`${address.toLowerCase()}`}
        bgColor="#fff"
        className={s.header_profile_ico_block}
      />
    </div>
  );
};
