import { FC, useState } from "react";
import styles from "./ui.module.scss";
import { BufferCopyIcon } from "@/shared/SVGs";

interface IUserAddress {
  address: string | null;
}

export const UserAddress: FC<IUserAddress> = ({ address }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (address === null) {
    return "Waiting.....";
  }
  const handleNameChange = () => {
    console.log("Скопировали адрес");
    setIsEditing(true);
  };

  return (
    <span className={styles.userAddress}>
      <span className={styles.truncatedAddress}>
        {address.slice(0, 5) + "..." + address.slice(-5)}
      </span>
      <span className={styles.fullAddress}>{address}</span>
      <BufferCopyIcon onClick={handleNameChange} />
    </span>
  );
};
