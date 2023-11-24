import s from "./styles.module.scss";

import { FC, useEffect } from "react";
import { useDropdown } from "@/shared/tools";
import { CloseIcon } from "@/shared/SVGs";
import { CustomButton } from "@/shared/ui/CustomButton";
import { Blur } from "./Blur";

export interface ErrorCheckProps {
  // openModel: boolean;
  text: string;
  btnTitle: string;
}

export const ErrorCheck: FC<ErrorCheckProps> = (props) => {
  const { text, btnTitle } = props;

  let openModel = true;
  const { isOpen, close, open, dropdownRef, toggle } = useDropdown();

  useEffect(() => {
    if (openModel) {
      open();
    } else {
      close();
    }
  }, [openModel]);

  return (
    <>
      <Blur isOpen={isOpen} />
      <article className={s.wrapper} ref={dropdownRef}>
        <CloseIcon onClick={close} className={s.close_icon} />
        <h3>An error occurred </h3>
        <p>{text}</p>
        <CustomButton
          className={s.btn}
          size="md"
          color="gradient"
          text={btnTitle}
        />
      </article>
    </>
  );
};
