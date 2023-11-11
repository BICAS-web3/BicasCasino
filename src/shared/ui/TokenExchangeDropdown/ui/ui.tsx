import { FC, useState } from "react";
import styles from "./ui.module.scss";
import Image from "next/image";
import clsx from "clsx";

import { ArrowIcon } from "@/shared/SVGs";
import { useDropdown } from "@/shared/tools";

export interface IToken {
  id: number;
  name: string;
  iconToken: string;
}

interface ITokenExchangeDropdownProps {
  tokenList: IToken[];
}

export const TokenExchangeDropdown: FC<ITokenExchangeDropdownProps> = ({
  tokenList,
}) => {
  const [selectedToken, setSelectedToken] = useState<IToken | null>(null);

  const { isOpen, toggle, close, dropdownRef } = useDropdown();
  const handleTokenClick = (token: IToken) => {
    setSelectedToken(token);
    close();
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div
        className={clsx(
          styles.selected_token,
          isOpen && styles.selected_token_open
        )}
        onClick={toggle}
      >
        {selectedToken ? (
          <div className={styles.token_item_selected}>
            <Image
              src={selectedToken.iconToken}
              width={30}
              alt={selectedToken.name}
              className={styles.token_icon}
            />
            {selectedToken.name}
          </div>
        ) : (
          <div className={styles.token_item_selected}>
            <Image
              src={tokenList[0].iconToken}
              width={30}
              alt={tokenList[0].name}
              className={styles.token_icon}
            />
            {tokenList[0].name}
          </div>
        )}
        <div
          className={clsx(
            styles.arrow_swap,
            isOpen ? styles.arrow_open : styles.arrow_close
          )}
        >
          <ArrowIcon />
        </div>
      </div>
      <div className={clsx(styles.token_list, { [styles.open]: isOpen })}>
        {tokenList.map((token) => (
          <div
            key={token.id}
            className={styles.token_item}
            onClick={() => handleTokenClick(token)}
          >
            <Image
              src={token.iconToken}
              width={30}
              alt={token.name}
              className={styles.token_icon}
            />
            {token.name}
          </div>
        ))}
      </div>
    </div>
  );
};
