import {FC, useState} from "react";
import styles from './ui.module.scss'
import {EdithIcon} from "@/shared/SVGs";

interface IUserName {
  userName: string | null
}

export const UserName: FC<IUserName> = ({userName}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName || '')
  const handleNameChange = () => {
    setIsEditing(true);
  }
  const handleSave = () => {
    setIsEditing(false);
    console.log('Сохранено новое имя:', newName);
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  return (
    <div className={styles.userName}>
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder='Enter your name'
            value={newName}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Ok</button>
        </>
      ) : (
        <>
          <span>{isEditing ? newName : (newName || userName || "Athena")}</span>
          <EdithIcon onClick={handleNameChange}/>
        </>
      )}
    </div>
  );
}