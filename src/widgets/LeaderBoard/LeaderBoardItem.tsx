import s from './styles.module.scss'
import linkIco from '../../public/media/leaderBoard_images/linkIco.svg'
import Image from 'next/image';

export const LeaderBoardItem = ({rank, player, address, volume, playerBg}) => {
    return (
        <div className={s.leader_board_list_item}>
            <div className={s.leader_board_list_item_rank_block}>
                <span className={s.leader_board_list_item_rank} data-top={rank <= 3 && true} >{rank}</span>
            </div>
            <div className={s.leader_board_list_item_player_block}>
                <div className={s.leader_board_list_item_player_icon} style={{background: playerBg}}>
                    <span className={s.leader_board_list_item_player_icon_title}>B</span>
                </div>
                <span className={s.leader_board_list_item_player_title}>{player}</span>
            </div>
            <div className={s.leader_board_list_item_address_block}>
                <span className={s.leader_board_list_item_address}>{address}</span>
            </div>
            <div className={s.leader_board_list_item_link}>
                <Image src={linkIco} width='22' height='22' />
            </div>
            <div className={s.leader_board_list_item_volume_block}>
                <span className={s.leader_board_list_item_volume}>{volume}</span>
            </div>
        </div>
    )
}