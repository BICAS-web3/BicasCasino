import { FC, useState } from "react";
import styles from "./ui.module.scss";
import { BufferCopyIcon } from "@/shared/SVGs";

interface IUserAddress {
  address: string | null;
}

export const UserAddress: FC<IUserAddress> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  if (props.address === null) {
    return "Waiting.....";
  }
  const handleNameChange = () => {
    console.log("Скопировали адрес");
    setIsEditing(true);
  };

  return (
    <span className={styles.userAddress}>
      <span className={styles.truncatedAddress}>
        {props.address.slice(0, 5) + "..." + props.address.slice(-5)}
      </span>
      <span className={styles.fullAddress}>{props.address}</span>
      <BufferCopyIcon onClick={handleNameChange} />
    </span>
  );
};
