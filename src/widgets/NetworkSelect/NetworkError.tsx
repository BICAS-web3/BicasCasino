import s from './styles.module.scss'
import errorInfoIco from '../../public/media/networkSelect_icons/errorInfoIco.svg'
import downIco from '../../public/media/networkSelect_icons/dropDownIco.svg'
import Image from 'next/image';
import {FC} from "react";

interface NetworkErrorProps {
    networkChange: () => void
}

export const NetworkError: FC<NetworkErrorProps> = props => {
    return (
        <div className={s.network_error_body} onClick={props.networkChange} >
            <Image src={errorInfoIco} className={s.network_error_img} alt="error_img"/>
            <span className={s.network_error_main_text}>error</span>
            <Image className={s.network_error_down_ico} src={downIco} alt="down_ico"/>
        </div>
    )
}