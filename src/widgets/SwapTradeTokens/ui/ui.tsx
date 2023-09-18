import {FC} from "react";
import styles from './ui.module.scss'
import {TokenExchangeInput} from "@/shared/ui/TokenExchangeInput/ui/ui";
import {IToken, TokenExchangeDropdown} from "@/shared/ui/TokenExchangeDropdown";
import drax from "@/public/media/tokens/drax.svg";
import bnb from "@/public/media/tokens/bnb.svg";
import arb from "@/public/media/tokens/arb.svg";
import usdt from "@/public/media/tokens/usdt.svg";

const tokenList: IToken[] = [
  {id: 1, name: 'DRAX', iconToken: drax},
  {id: 2, name: 'BNB', iconToken: bnb},
  {id: 3, name: 'ARB', iconToken: arb},
  {id: 3, name: 'USDT', iconToken: usdt},
];

export const SwapTradeTokens: FC<{}> = () => {

  return (
    <div className={styles.trade}>
      <div className={styles.trade_title}>
        <h2 className={styles.title}>Swap</h2>
        <span className={styles.description}>Trade tokens in an instant</span>
      </div>
      <div className={styles.exchange_tokens}>
        <form className={styles.initial_exchange}>
          <TokenExchangeDropdown tokenList={tokenList}/>
          <TokenExchangeInput/>
        </form>
        <div className={styles.arrow}></div>
        <form className={styles.total_exchange}>
          <TokenExchangeDropdown tokenList={tokenList}/>
          <TokenExchangeInput/>
        </form>
      </div>
    </div>
  )
}


