import s from './styles.module.scss'
import gameBg from '../../public/media/game_layout_images/game_background.png'


export const GamePage = ({children, gameTitle}) => {
    return (
        <div className={s.game_layout}>
            <div className={s.game_wrap}>
                <div className={s.game_background_wrap}>
                    <img src={gameBg.src} alt="background-img"/>
                </div>
                <div className={s.game_background_shadow}></div>
                <div className={s.game_body}>
                    <div className={s.game_header}>
                        <h2 className={s.game_title}>{gameTitle}</h2>
                        <button className={s.game_info_btn}>About the game</button>
                    </div>
                    <div className={s.game_block}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}