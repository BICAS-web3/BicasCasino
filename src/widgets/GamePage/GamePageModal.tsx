import s from './styles.module.scss'
import closeIco from '@/public/media/game_layout_images/closeIco.svg'
import Image from "next/image";

export const GamePageModal = ({text, modalVisible, closeModal}) => {
    return (
        <div className={`${s.game_page_modal_wrap} ${modalVisible && s.visible}`}>
            <div className={s.game_page_modal}>
                <Image className={s.game_page_modal_close_btn} onClick={closeModal} src={closeIco} width={17} height={17}/>
                <h2 className={s.game_page_modal_title}>About the game</h2>
                <p className={s.game_page_modal_text}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, accusantium beatae commodi ipsam magnam nisi officiis possimus praesentium quaerat quibusdam quo, quos, repellat saepe? Animi, assumenda at atque dignissimos dolor dolorem dolorum fuga fugit, harum iure minima nisi numquam, officia omnis pariatur reprehenderit sunt vel veniam veritatis vitae voluptas voluptatem.
                </p>
            </div>
        </div>
    )
}