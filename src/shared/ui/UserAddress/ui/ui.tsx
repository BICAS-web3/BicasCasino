import { FC, useState } from "react";
import styles from "./ui.module.scss";
import { BufferCopyIcon } from "@/shared/SVGs";
import { CopyToClipboardButton } from "@/shared/ui/CopyToClipboardButton";
import { shortenAddress, useMediaQuery } from "@/shared/tools";

interface IUserAddress {
  address: string | null;
}

export const UserAddress: FC<IUserAddress> = (props) => {
  const isMobile = useMediaQuery("(max-width: 1400px)");
  const [isEditing, setIsEditing] = useState(false);
  if (props.address === null) {
    return "Waiting.....";
  }
  const handleNameChange = () => {
    setIsEditing(true);
  };

  return (
    <span className={styles.userAddress}>
      <span className={styles.truncatedAddress}>
        {props.address.slice(0, 5) + "..." + props.address.slice(-5)}
      </span>
      <span className={styles.fullAddress}>
        {isMobile ? shortenAddress(props.address) : props.address}
      </span>
      <CopyToClipboardButton textToCopy={props.address} />
    </span>
  );
};
