import Image from 'next/image'
import tableBg from '../../public/media/games_assets/mines/1280Bg.png'
import styles from './styles.module.scss'
type Props = {}

export const Mines = (props: Props) => {
	return (
		<div className={styles.mines_table_wrap}>
			<div className={styles.mines_table_background}>
				<Image
					src={tableBg}
					className={styles.mines_table_background_img}
					alt='table-bg'
					width={1418}
					height={680}
					quality={100}
				/>
			</div>
			<div className={styles.mines_table}>
				<div className={styles.mine}>
					there will be a component of the game!!!
				</div>
			</div>
		</div>
	)
}
