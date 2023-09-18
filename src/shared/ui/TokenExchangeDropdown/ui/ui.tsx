import {FC, useState} from "react";
import styles from './ui.module.scss'
import Image from "next/image";

export interface IToken {
  id: number;
  name: string;
  iconToken: string
}

interface ITokenExchangeDropdownProps {
  tokenList: IToken[];
}


export const TokenExchangeDropdown: FC<ITokenExchangeDropdownProps> = ({tokenList}) => {
  const [selectedToken, setSelectedToken] = useState<IToken | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTokenClick = (token: IToken) => {
    setSelectedToken(token);
    setIsOpen(false);
  };


  return (
    <div className={styles.dropdown}>
      <div className={styles.selected_token} onClick={toggleDropdown}>
        {selectedToken ? (
          <div className={styles.token_item}>
            <Image
              src={selectedToken.iconToken}
              width={30}
              alt={selectedToken.name}
              className={styles.token_icon}
            />
            {selectedToken.name}
          </div>
        ) : (
          <div className={styles.token_item}>
            <Image
              src={tokenList[0].iconToken}
              width={30}
              alt={tokenList[0].name}
              className={styles.token_icon}
            />
            {tokenList[0].name}
          </div>
        )}
        <i className={`arrow ${isOpen ? styles.up : styles.down}`}/>
      </div>
      {isOpen && (
        <div className={styles.token_list}>
          {tokenList.map((token) => (
            <div
              key={token.id}
              className={styles.token_item}
              onClick={() => handleTokenClick(token)}
            >
              <Image src={token.iconToken} width={30} alt={token.name} className={styles.token_icon}/>
              {token.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

