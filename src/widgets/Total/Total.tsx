import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import s from './styles.module.scss';
import locker from "../../public/media/total/locker_safe_box_icon.png";
import star from "../../public/media/total/star_favorite_icon.png";
import trophy from "../../public/media/total/trophy_winner_cup_icon.png";

const triplex = (n: string):string => n.replace(/(?!^)(\d{3})(?=(\d{3})*$)/g, " $1");


export interface TotalProps { description: string; image: any, dollar?: boolean,statistics: string };


const TotalItem: FC<TotalProps> = props => {
    return(<div className={s.total_item}>
        
        <Image src={props.image}
                    alt=''
                    width={126}
                    height={126}
                    className={s.image}
                    />
        <div className={s.description}>
            {props.description}
        </div>
        <div className={s.statistic}>
        { props.dollar ? `$ ${props.statistics}` : `${props.statistics}`}
        </div>
    </div>);
}


export const Total: FC<TotalProps> = props => {
   const [obj, setObj] = useState({money: "285298103",star: "4639291",award:"26398"});

//     useEffect(() => {
//    fetch(api_url).then((response) => response.json()).then((obj) => setObj(obj));
//     }, []);

    if (!obj) {
    return null;
    }

    return(<div className={s.total_container}>
        <TotalItem description='total wagered' image={locker} dollar statistics={triplex(obj.money)} />
        <TotalItem description='total bets'  image={star} statistics={triplex(obj.star)}/>
        <TotalItem description='total users'  image={trophy} statistics={triplex(obj.award)}/>
    </div>);
}