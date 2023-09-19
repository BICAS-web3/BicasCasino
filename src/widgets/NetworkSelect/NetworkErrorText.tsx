import s from './styles.module.scss'

export const NetworkErrorText = ({error_text}) => {
    return (
        <div className={s.network_error_text_block}>
            <span className={s.network_error_text}>{error_text}</span>
        </div>
    )
}