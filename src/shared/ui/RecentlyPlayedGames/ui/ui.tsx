import {FC} from "react";
import styles from './ui.module.scss'
import Image, {StaticImageData} from "next/image";

interface IRecentlyGames {
  id: number | null
  title: string
  text: string | null
  imgBackground: StaticImageData | string
}

export const RecentlyPlayedGames: FC<{ RecentlyGames: IRecentlyGames[] }> = ({RecentlyGames}) => {

  return (
    <div className={styles.recently_played_container}>
      <p className={styles.recently_played_heading}>recently played</p>
      {RecentlyGames.map((game: IRecentlyGames) => (
        <div key={game.id} className={styles.game_item}>
          <Image src={game.imgBackground} alt={game.title} className={styles.game_image} layout={'fill'}
                 objectFit={'cover'} />
          <div className={styles.content}>
            <h2 className={styles.game_title}>{game.title}</h2>
            <p>{game.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}