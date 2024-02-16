import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import upArr from "@/public/media/payment/upArrow.svg";
import clsx from "clsx";

interface PaymentDropdownProps {
  list: any[];
  setActive: any;
}

export const PaymentDropdown: FC<PaymentDropdownProps> = ({
  list,
  setActive,
}) => {
  const [activeItem, setActiveItem] = useState(list[0]);
  const [currentList, setCurrentList] = useState(list);
  const [listVisibility, setListVisibility] = useState(false);

  useEffect(() => {
    setCurrentList(list.filter((item) => item.title !== activeItem.title));
  }, [activeItem]);

  const handleChangeActiveItem = (title: string) => {
    setListVisibility(false);
    const newActiveItem = currentList.filter((item) => item.title === title)[0];
    setActiveItem(newActiveItem);
    setActive(newActiveItem);
  };

  return (
    <div
      className={clsx(s.dropdown_body, listVisibility && s.dropdown_visible)}
    >
      <div
        className={s.dropdown_active}
        onClick={() => setListVisibility(!listVisibility)}
      >
        <div className={s.dropdown_title_group}>
          <img src={activeItem.img.src} alt="" />
          {activeItem.title}
        </div>
        <img src={upArr.src} className={s.active_arrow_ico} alt="arr-ico" />
      </div>
      <div className={s.dropdown_list}>
        {currentList.map((item, ind) => (
          <div
            className={s.dropdown_list_item}
            onClick={() => handleChangeActiveItem(item.title)}
          >
            <img src={item.img.src} key={ind} alt="coin-ico" />
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
