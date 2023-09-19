import s from './styles.module.scss'
import errorInfoIco from '../../public/media/networkSelect_icons/errorInfoIco.svg'
import downIco from '../../public/media/networkSelect_icons/dropDownIco.svg'

export const NetworkError = () => {
    return (
        <div className={s.network_error_body}>
            <img className={s.network_error_img} src={errorInfoIco.src} alt="error_img"/>
            <span className={s.network_error_main_text}>error</span>
            <img className={s.network_error_down_ico} src={downIco.src} alt="down_ico"/>
        </div>
    )
}