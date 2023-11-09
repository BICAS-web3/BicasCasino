import s from "./styles.module.scss";
import { languages } from "@/widgets/LanguageSwitcher/LanguageSwitcher";
import { useUnit } from "effector-react";
import { FC } from "react";
import { $isOpen } from "../SideBar/model";
import clsx from "clsx";

interface Language {
  id: string;
  title: string;
}

interface LanguageItemProps {
  title: string;
  id: string;
  setActiveLanguage: (language: Language) => void;
  // setLanguagesListVisibility: (isVisible: boolean) => void;
  close: () => void;
}

export const LanguageItem: FC<LanguageItemProps> = (props) => {
  const setLanguage = () => {
    // props.setLanguagesListVisibility(false);
    props.close();
    const activeLanguage = languages.filter((item) => item.id === props.id)[0];
    props.setActiveLanguage(activeLanguage);
  };

  const [isOpen] = useUnit([$isOpen]);

  return (
    <div
      className={clsx(
        s.languages_list_item,
        isOpen && s.languages_list_item_opened
      )}
      onClick={setLanguage}
    >
      <h4 className={s.languages_list_item_title}>
        {isOpen ? props.title : props.id}
      </h4>
    </div>
  );
};
