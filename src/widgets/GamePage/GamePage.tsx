import s from './styles.module.scss'
import gameBg from '../../public/media/game_layout_images/game_background.png'
import {CustomBets} from "@/widgets/CustomBets/CustomBets";


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
                    <CustomBets title='Live bets' isGamePage={true} isMainPage={false} bets={
                        [
                            {
                                time:{ date: '25.08.23', time: '17:05' },
                                game_name: 'Dice',
                                player: 'UserName',
                                wager: 11,
                                multiplier: 3,
                                profit: 5.34,
                                userBg: '#3DBCE5',
                                player_url: 'test',
                                trx_url: 'test',
                                game_url: 'test',
                                network_icon: 'test',
                                numBets: 1,
                                gameAddress: '0x563...4ba9'
                            }
                        ]
                    } />
                </div>
            </div>
        </div>
    )
}