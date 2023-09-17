import Image from 'next/image';
import { FC, JSX, useEffect, useState } from 'react';
import s from './styles.module.scss';
import Discord from '@/public/media/social_media/Discord.svg';
import Twitter from '@/public/media/social_media/Twitter.svg';
import Telegram from '@/public/media/social_media/Telegram.svg';
import Insta from '@/public/media/social_media/Insta.svg';
import Eagle from '@/public/media/brand_images/GKEagle.png';
import Greek_Keepers from '@/public/media/brand_images/Greek_Keepers.png';

export interface FooterProps{}
export const Footer: FC<FooterProps>  = props => {
   
    return(<>
    <div className={s.footer_container}>

        <div className={s.logo}>
            <Image
                src={Eagle}
                alt={''}
                width={46.065}
                height={36}
            />
            <Image
                src={Greek_Keepers}
                alt={''}
                width={54.706}
                height={23.708}
            />
        </div>

        <div className={s.games}>
            <a href="" className={s.footer_text}>GAMES</a>
            <a href="" className={s.game_row}>Coinflip</a>
            <a href="" className={s.game_row}>Dice</a>
            <a href="" className={s.game_row}>Rock paper scissors</a>
            <a href="" className={s.game_row}>Poker</a>
        </div>

        <div className={s.support}>
            <a href="" className={s.footer_text}>support</a>
            <a href="" className={s.footer_text}>Profile</a>
        </div>

        <div className={s.nft_market}>
            <a href="" className={s.footer_text}>NFT Market</a>
            <a href="" className={s.footer_text}>Leader board</a>
        </div>

        <div className={s.icons}>
            <a
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
            <Image
                src={Discord}
                alt={''}
                width={30}
                height={30}
            />
            </a>
            <a
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
            <Image
                src={Twitter}
                alt={''}
                width={30}
                height={30}
            />
            </a>
            <a
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
            <Image
                src={Telegram}
                alt={''}
                width={30}
                height={30}
            />
            </a>
            <a
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
            <Image
                src={Insta}
                alt={''}
                width={30}
                height={30}
            />
            </a>
                    
        </div>
                
    </div>
    <div className={s.footer_below}>
        BSC METAVERSE LIMITED Suite 305,<br /> 
        Griffith Corporate Centre<br />
        P.O. Box 1510, Beachmont Kingstown St. Vincent and the Grenadines<br />
        6818 BC 2023
    </div>
    
    </>);
}