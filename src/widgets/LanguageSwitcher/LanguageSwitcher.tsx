import s from './styles.module.scss'
import settingsIco from '@/public/media/sidebar_icons/settingsIcon.svg'
import downIco from '@/public/media/sidebar_icons/downIco.svg'
import Image from "next/image";
import {useEffect, useState} from "react";
import {LanguageItem} from "@/widgets/LanguageSwitcher/LanguageItem";
import {FC} from "react";

export const languages = [
    {
        title: 'English',
        id: 'eng'
    },
    {
        title: "Russian",
        id: 'rus'
    },
]

interface LanguageSwitcherProps {}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = props => {
    const [activeLanguage, setActiveLanguage] = useState(languages[0])
    const [languagesListVisibility, setLanguagesListVisibility] = useState(false)
    const [languagesList, setLanguagesList] = useState(languages)
    const [activeTheme, setActiveTheme] = useState('dark')

    const setListVisibility = () => {
        setLanguagesListVisibility(!languagesListVisibility)
    }

    const handleChangeTheme = () => {
        activeTheme === 'dark' ? setActiveTheme('light') : setActiveTheme('dark')
    }

    useEffect(() => {
        setLanguagesList(languages.filter(item =>  item.id !== activeLanguage.id))
    }, [languagesList])

    return (
        <div className={s.language_switcher_wrap}>
            <div className={s.language_switcher_title_block}>
                <Image src={settingsIco} width={18} height={18} />
                <h2 className={s.language_switcher_title}>language</h2>
            </div>
            <div className={s.language_switcher_block}>
                <div className={s.language_switcher} onClick={setListVisibility} >
                    <h3 className={s.active_language_title}>{activeLanguage.title}</h3>
                    <Image src={downIco} width={9} height={5} />
                </div>
                <div className={`${s.languages_list} ${languagesListVisibility && s.visible}`}>
                    {
                        languagesList && languagesList.map((item, _) => (
                            <LanguageItem setLanguagesListVisibility={setLanguagesListVisibility} setActiveLanguage={setActiveLanguage} {...item} key={item.id} />
                        ))
                    }
                </div>
            </div>
            <div className={s.theme_switcher_wrap}>
                <div className={s.themes_block}>
                    <div className={`${s.theme_block} ${activeTheme === 'dark' && s.active}`} onClick={handleChangeTheme} >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.22498 16.5H9.14998C8.12138 16.4922 7.10467 16.2792 6.15941 15.8735C5.21414 15.4678 4.35931 14.8777 3.64498 14.1375C2.32037 12.721 1.56739 10.864 1.53138 8.92495C1.49537 6.9859 2.17888 5.10225 3.44998 3.6375C4.26889 2.71976 5.29838 2.01457 6.44998 1.5825C6.58436 1.5308 6.73077 1.51886 6.87174 1.54812C7.01271 1.57738 7.14229 1.6466 7.24498 1.7475C7.3401 1.8445 7.40708 1.9655 7.43878 2.09759C7.47048 2.22969 7.46571 2.36791 7.42498 2.4975C7.01395 3.62321 6.93251 4.84279 7.19023 6.01315C7.44795 7.1835 8.03413 8.25608 8.87998 9.10501C9.73372 9.94826 10.8088 10.5325 11.9809 10.79C13.1529 11.0475 14.3739 10.9677 15.5025 10.56C15.6368 10.5127 15.7818 10.5047 15.9206 10.5368C16.0593 10.5689 16.1861 10.6398 16.286 10.7413C16.3859 10.8428 16.4548 10.9706 16.4848 11.1098C16.5147 11.2491 16.5044 11.3939 16.455 11.5275C16.0719 12.5503 15.4733 13.4788 14.7 14.25C13.9806 14.9672 13.1266 15.5352 12.187 15.9214C11.2474 16.3075 10.2408 16.5041 9.22498 16.5Z" fill="#7E7E7E"/>
                        </svg>

                    </div>
                    <div className={`${s.theme_block} ${activeTheme === 'light' && s.active}`} onClick={handleChangeTheme}>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.29885 10.4483C3.29885 10.1207 3.08046 9.89655 2.74713 9.89655H0.551725C0.224138 9.89655 0 10.2241 0 10.4483C0 10.7759 0.218391 11.0001 0.551725 11.0001H2.74713C3.08046 10.9942 3.29885 10.7759 3.29885 10.4483Z" fill="#363636"/>
                            <path d="M4.62065 15.5L3.08042 17.0402C2.86203 17.2586 2.86203 17.592 3.08042 17.8103C3.29881 18.0287 3.63214 18.0287 3.85054 17.8103L5.39077 16.2701C5.60916 16.0517 5.60916 15.7183 5.39077 15.5C5.17238 15.3908 4.83904 15.2816 4.62065 15.5Z" fill="#363636"/>
                            <path d="M16.2701 5.39089L17.8103 3.85066C18.0287 3.63227 18.0287 3.29893 17.8103 3.08054C17.5919 2.86215 17.2585 2.86215 17.0402 3.08054L15.5 4.62077C15.2816 4.83916 15.2816 5.1725 15.5 5.39089C15.7242 5.60928 16.1609 5.60928 16.2701 5.39089Z" fill="#363636"/>
                            <path d="M10.4483 3.29885C10.7759 3.29885 11.0001 3.08046 11.0001 2.74713V0.551725C11.0001 0.224138 10.7817 0 10.4483 0C10.2299 0 9.89661 0.218391 9.89661 0.551725V2.74713C9.89661 3.08046 10.2242 3.29885 10.4483 3.29885Z" fill="#363636"/>
                            <path d="M4.62065 5.39089C4.83904 5.60928 5.17238 5.60928 5.39077 5.39089C5.60916 5.1725 5.60916 4.83916 5.39077 4.62077L3.85054 3.08054C3.63214 2.86215 3.29881 2.86215 3.08042 3.08054C2.86203 3.29893 2.86203 3.63227 3.08042 3.85066L4.62065 5.39089Z" fill="#363636"/>
                            <path d="M10.4483 17.7012C10.1208 17.7012 9.89661 17.9196 9.89661 18.253V20.4483C9.89661 20.7759 10.115 21.0001 10.4483 21.0001C10.7817 21.0001 11.0001 20.7817 11.0001 20.4483V18.253C10.9943 17.9196 10.7759 17.7012 10.4483 17.7012Z" fill="#363636"/>
                            <path d="M20.4483 9.89655H18.253C17.9254 9.89655 17.7012 10.1149 17.7012 10.4483C17.7012 10.7817 17.9196 11.0001 18.253 11.0001H20.4483C20.7759 11.0001 21.0001 10.7817 21.0001 10.4483C21 10.2241 20.6667 9.89655 20.4483 9.89655Z" fill="#363636"/>
                            <path d="M16.2702 15.5C16.0517 15.2816 15.7184 15.2816 15.5001 15.5C15.2817 15.7184 15.2817 16.0518 15.5001 16.2702L17.0403 17.8104C17.2587 18.0288 17.5921 18.0288 17.8104 17.8104C18.0288 17.592 18.0288 17.2586 17.8104 17.0403L16.2702 15.5Z" fill="#363636"/>
                            <path d="M10.4483 16.4942C13.7874 16.4942 16.4943 13.7874 16.4943 10.4483C16.4943 7.10916 13.7874 4.40228 10.4483 4.40228C7.10922 4.40228 4.40234 7.10916 4.40234 10.4483C4.40234 13.7874 7.10922 16.4942 10.4483 16.4942Z" fill="#363636"/>
                        </svg>

                    </div>
                </div>
                <div className={s.active_theme_block}>
                    <h2 className={s.active_theme_title}>{activeTheme}</h2>
                    <span className={s.active_theme_subTitle}>Currently</span>
                </div>
            </div>
        </div>
    )
}