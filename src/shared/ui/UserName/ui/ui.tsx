import React, { FC, useState, useRef, useEffect } from "react";
import styles from './ui.module.scss'
import { EdithIcon } from "@/shared/SVGs";
import { useSignMessage } from 'wagmi';
import * as api from '@/shared/api/';

interface IUserName {
  userName: string | null,
  editable: boolean,
  address: string
}

export const UserName: FC<IUserName> = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(props.userName as string);
  const inputRef = useRef<HTMLInputElement>(null);

  const { signMessage, variables, data: signMessageData } = useSignMessage();

  useEffect(() => {
    setNewName(props.userName as string);
  }, [props.userName])

  const handleNameChange = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  const handleSave = () => {
    console.log('Saved new name:', newName);
    signMessage({ message: newName });
  }

  useEffect(() => {
    ; (async () => {
      if (variables?.message && signMessageData) {
        await api.setUsernameFx({
          address: props.address,
          nickname: variables?.message,
          signature: signMessageData.slice(2)
        });
        setIsEditing(false);
      }
    })()
  }, [signMessageData, variables?.message])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  return (
    <div className={styles.user_name}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          placeholder='Enter your name'
          value={newName}
          ref={inputRef}
          autoFocus
          onChange={handleInputChange}
          maxLength={20}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSave();
            }
          }}
          className={styles.input_user_name}
          disabled={isEditing ? false : true}
        />
        {isEditing ? (
          <button onClick={handleSave} className={styles.ok_button}>OK</button>) : <></>}
      </div>
      {
        !isEditing && props.editable ? <>
          {/* <span className={styles.name_span}>{isEditing ? newName : (newName || props.userName)}</span> */}
          <EdithIcon onClick={handleNameChange} />
        </> : <></>
      }
    </div>
  );
}