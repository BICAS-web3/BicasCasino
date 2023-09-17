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
    <div className={styles.recentlyPlayedContainer}>
      <p className={styles.recentlyPlayedHeading}>recently played</p>
      {RecentlyGames.map((game: IRecentlyGames) => (
        <div key={game.id} className={styles.gameItem}>
          <Image src={game.imgBackground} alt={game.title} className={styles.gameImage} layout={'fill'}
                 objectFit={'cover'} />
          <div className={styles.content}>
            <h2 className={styles.gameTitle}>{game.title}</h2>
            <p>{game.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}