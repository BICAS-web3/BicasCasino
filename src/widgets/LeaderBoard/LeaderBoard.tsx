import s from './styles.module.scss'
import {LeaderBoardItem} from "@/widgets/LeaderBoard/LeaderBoardItem";

//demo
export const leadersList = [
    {
        rank: 1,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#E84D62;'
    },
    {
        rank: 2,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#FF73FA;'
    },
    {
        rank: 3,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#43B581;'
    },
    {
        rank: 4,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#3DBCE5;'
    },
    {
        rank: 5,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#FAA61A;'
    },
    {
        rank: 6,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#FAA61A;'
    },
    {
        rank: 7,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#F47B68;'
    },
    {
        rank: 8,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#3DBCE5;'
    },
    {
        rank: 9,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#FAA61A;'
    },
    {
        rank: 10,
        player: 'UserName',
        address: '0x563...4ba9',
        volume: '37,298,200',
        playerBg: '#F57731;'
    },
]

export const LeaderBoard = () => {
    return (
        <div className={s.leader_board_wrap}>
            <h2 className={s.leader_board_title}>Leader Board</h2>
            <div className={s.leader_board_list_titles}>
                <div className={s.leader_board_row_titles_block}>
                    <span className={s.leader_board_list_titles_item}>Rank</span>
                    <span className={s.leader_board_list_titles_item}>Player</span>
                    <span className={s.leader_board_list_titles_item}>Address</span>
                    <span className={s.leader_board_list_titles_item}>Volume</span>
                </div>
                <div className={s.leader_board_row_titles_block}>
                    <span className={s.leader_board_list_titles_item}>Rank</span>
                    <span className={s.leader_board_list_titles_item}>Player</span>
                    <span className={s.leader_board_list_titles_item}>Address</span>
                    <span className={s.leader_board_list_titles_item}>Volume</span>
                </div>
            </div>
            <div className={s.leader_board_list}>
                {
                    leadersList && leadersList.map((item, ind) => (
                        <LeaderBoardItem {...item} />
                    ))
                }
            </div>
        </div>
    )
}