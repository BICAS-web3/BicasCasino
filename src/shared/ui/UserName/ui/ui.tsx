import React, {FC, useState, useRef} from "react";
import styles from './ui.module.scss'
import {EdithIcon} from "@/shared/SVGs";

interface IUserName {
  userName: string | null
}

export const UserName: FC<IUserName> = ({userName}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName || '')
  const inputRef = useRef<HTMLInputElement>(null);
  const handleNameChange = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  const handleSave = () => {
    setIsEditing(false);
    console.log('Сохранено новое имя:', newName);
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  return (
    <div className={styles.user_name}>
      {isEditing ? (
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
          />
          <button onClick={handleSave} className={styles.ok_button}>OK</button>
        </div>
      ) : (
        <>
          <span className={styles.name_span}>{isEditing ? newName : (newName || userName )}</span>
          <EdithIcon onClick={handleNameChange}/>
        </>
      )}
    </div>
  );
}