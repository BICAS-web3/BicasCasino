import { FC, useEffect } from "react";

import s from "./styles.module.scss";

import { useDropdown } from "@/shared/tools";
import { CloseIcon } from "@/shared/SVGs";
import { CustomButton } from "@/shared/ui/CustomButton";

import { Blur } from "./Blur";
import clsx from "clsx";
import { useRouter } from "next/router";

export interface ErrorCheckProps {
  text: string;
  btnTitle: "Contact us" | "ok" | "Top up balance";
  openModal?: boolean;
  Wager?: boolean;
}

export const ErrorCheck: FC<ErrorCheckProps> = (props) => {
  const { text, btnTitle, Wager } = props;
  const { push } = useRouter();

  const { isOpen, close, open, dropdownRef } = useDropdown();

  // useEffect(() => {
  //   open();
  // }, [Wager]);
  useEffect(() => {
    open();
  }, [Wager]);

  return (
    <>
      <Blur isOpen={isOpen} />
      <article
        className={clsx(s.wrapper, isOpen && s.wrapper_open)}
        ref={dropdownRef}
      >
        <CloseIcon onClick={close} className={s.close_icon} />
        <h3>An error occurred </h3>
        <p>{text}</p>
        <button
          onClick={() => {
            if (btnTitle === "Contact us") {
              window.open("https://t.me/greekkeepers", "_blank");
            } else if (btnTitle === "Top up balance") {
              push("/ExchangeManual");
            }
          }}
          className={s.btn}
        >
          {btnTitle}
        </button>
      </article>
    </>
  );
};
