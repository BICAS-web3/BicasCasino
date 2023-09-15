import {FC, useState} from "react";
import styles from './ui.module.scss'
import {CopyIcon} from "@/shared/SVGs";

interface IUserAddress {
  userAddress: string | null
}

export const UserAddress: FC<IUserAddress> = ({userAddress}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleNameChange = () => {
    setIsEditing(true);
  }
  return <h2 className={styles.userAddress}>{userAddress} <CopyIcon onClick={handleNameChange}/></h2>
}