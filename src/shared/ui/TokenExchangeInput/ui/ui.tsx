"use clients"
import React, {FC, useState} from "react";
import styles from "./ui.module.scss";
import {IToken} from "@/shared/ui/TokenExchangeDropdown";

export const TokenExchangeInput: FC<{}> = () => {
  const [selectedToken, setSelectedToken] = useState<IToken | null>(null);
  const [tokenAmount, setTokenAmount] = useState<number | null>(null);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value);
    setTokenAmount(amount || null);
  };
  return (
    <div className={styles.token_exchange}>
      <div className={styles.form_group}>
        <input
          type='string'
          inputMode='numeric'
          placeholder="000.000"
          onChange={handleAmountChange}
        />
      </div>
    </div>
  )
}

