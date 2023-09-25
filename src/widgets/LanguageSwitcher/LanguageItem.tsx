import s from "./styles.module.scss";
import { languages } from "@/widgets/LanguageSwitcher/LanguageSwitcher";
import { FC } from "react";

interface Language {
  id: string;
  title: string;
}

interface LanguageItemProps {
  title: string;
  id: string;
  setActiveLanguage: (language: Language) => void;
  setLanguagesListVisibility: (isVisible: boolean) => void;
}

export const LanguageItem: FC<LanguageItemProps> = (props) => {
  const setLanguage = () => {
    props.setLanguagesListVisibility(false);
    const activeLanguage = languages.filter((item) => item.id === props.id)[0];
    props.setActiveLanguage(activeLanguage);
  };

  return (
    <div className={s.languages_list_item} onClick={setLanguage}>
      <h4 className={s.languages_list_item_title}>{props.title}</h4>
    </div>
  );
};
