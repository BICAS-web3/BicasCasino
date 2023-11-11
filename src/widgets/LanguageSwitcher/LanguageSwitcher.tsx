import s from "./styles.module.scss";
import settingsIco from "@/public/media/sidebar_icons/settingsIcon.svg";
import downIco from "@/public/media/sidebar_icons/downIco.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageItem } from "@/widgets/LanguageSwitcher/LanguageItem";
import { FC } from "react";
import moonIco from "@/public/media/sidebar_icons/moonIco.svg";
import sunIco from "@/public/media/sidebar_icons/sunIco.svg";
import { useUnit } from "effector-react";
import { $isOpen } from "../SideBar/model";
import clsx from "clsx";
import { useDropdown } from "@/shared/tools";

export const languages = [
  {
    title: "English",
    id: "eng",
  },
  {
    title: "Russian",
    id: "rus",
  },
];

interface LanguageSwitcherProps {}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);
  // const [languagesListVisibility, setLanguagesListVisibility] = useState(false);
  const { dropdownRef, isOpen: isVisible, toggle, close } = useDropdown();
  const [languagesList, setLanguagesList] = useState(languages);
  const [activeTheme, setActiveTheme] = useState("dark");

  // const setListVisibility = () => {
  //   setLanguagesListVisibility(!languagesListVisibility);
  // };

  const handleChangeTheme = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark");
  };

  useEffect(() => {
    setLanguagesList(languages.filter((item) => item.id !== activeLanguage.id));
  }, [activeLanguage]);

  const [isOpen] = useUnit([$isOpen]);

  return isOpen ? (
    <div className={s.language_switcher_wrap}>
      <div className={s.language_switcher_title_block}>
        <Image alt="settings-ico" src={settingsIco} width={18} height={18} />
        <h2 className={s.language_switcher_title}>language</h2>
      </div>
      <div className={s.language_switcher_block}>
        <div className={s.language_switcher} onClick={toggle}>
          <h3 className={s.active_language_title}>{activeLanguage.title}</h3>
          <Image
            className={clsx(s.arr_icon, isOpen && s.arr_icon_open)}
            alt="down-ico"
            src={downIco}
            width={9}
            height={5}
          />
        </div>
        <div
          ref={dropdownRef}
          className={`${s.languages_list} ${isVisible && s.visible}`}
        >
          {languagesList &&
            languagesList.map((item, _) => (
              <LanguageItem
                // setLanguagesListVisibility={setLanguagesListVisibility}
                close={close}
                setActiveLanguage={setActiveLanguage}
                {...item}
                key={item.id}
              />
            ))}
        </div>
      </div>
      <div className={s.theme_switcher_wrap}>
        <div className={s.themes_block}>
          <div
            className={`${s.theme_block} ${activeTheme === "dark" && s.active}`}
            onClick={handleChangeTheme}
          >
            <Image alt="moon-ico" src={moonIco} />
          </div>
          <div
            className={`${s.theme_block} ${
              activeTheme === "light" && s.active
            }`}
            onClick={handleChangeTheme}
          >
            <Image alt="sun-ico" src={sunIco} />
          </div>
        </div>
        <div className={s.active_theme_block}>
          <h2 className={s.active_theme_title}>{activeTheme}</h2>
          <span className={s.active_theme_subTitle}>Currently</span>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className={s.language_closed}>
        {languagesList &&
          languagesList.map((item, _) => (
            <LanguageItem
              // setLanguagesListVisibility={setLanguagesListVisibility}
              close={close}
              setActiveLanguage={setActiveLanguage}
              {...item}
              key={item.id}
            />
          ))}
      </div>
      <div className={clsx(s.themes_block, s.themes_block_closed)}>
        {activeTheme === "dark" ? (
          <div
            className={`${s.theme_block} ${activeTheme === "dark" && s.active}`}
            onClick={handleChangeTheme}
          >
            <Image alt="moon-ico" src={moonIco} />
          </div>
        ) : (
          <div
            className={`${s.theme_block} ${
              activeTheme === "light" && s.active
            }`}
            onClick={handleChangeTheme}
          >
            <Image alt="sun-ico" src={sunIco} />
          </div>
        )}
      </div>
    </>
  );
};
