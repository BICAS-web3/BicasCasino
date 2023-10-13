import Image from 'next/image';
import { FC, JSX, useEffect, useState } from 'react';
import s from './style.module.scss';
import gold from "../../public/media/user_board//gold.png";
import silver from "../../public/media/user_board/silver.png";
import bronze from "../../public/media/user_board/bronze.png";
import dunkin from "../../public/media/user_board/dunkin.svg";
import { SideBarModel } from '../SideBar';
import { useUnit } from 'effector-react';
import * as Api from '@/shared/api';

const triplex = (n: string): string => n.replace(/(?!^)(\d{3})(?=(\d{3})*$)/g, " $1");


export interface TotalItemProps { dunkin: string; description: string; image: any, dollar?: boolean, statistics: number | string };
const TotalItem: FC<TotalItemProps> = props => {
	const [
		isSideBarOpen
	] = useUnit([
		SideBarModel.$isOpen
	]);

	return (<div className={`${s.total_item} ${isSideBarOpen && s.open_sidebar}`}>

		{/* <div className={s.total_item_image}>
            <div className={s.total_item_bg_image}>

            </div>
            <Image src={props.image}
                alt=''
                className={s.image}
            />
        </div> */}
		<div className={s.total_item_overflow_container}>
			<div className={s.description}>
				{props.description}
			</div>
			<div className={s.dunkin}>
				<Image src={dunkin}
					alt=''
					className={s.dunkin_image}
				/>
				{props.dunkin}
			</div>
			<div className={s.statistic}>
				{props.dollar ? `$ ${props.statistics}` : `${props.statistics}`}
			</div>
		</div>

		<Image src={props.image}
			alt=''
			className={s.image}
		/>
	</div>);
}

export interface TotalProps1 { }
export const Total: FC<TotalProps1> = props => {
	const [totals, setTotals] = useState({ total_wagered: '-', total_users: '-', total_bets: '-' });

	useEffect(() => {
		const interval = setInterval(() => {
			//console.log('Logs every minute');
			Api.GetTotalsFx().then((response) => {
				const totals = response.body as Api.T_Totals;
				setTotals({ total_wagered: (totals.sum ? totals.sum : 0).toFixed(2), total_users: totals.player_amount.toString(), total_bets: totals.bets_amount.toString() });
			})
		}, 20000);

		// return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, [])

	//     useEffect(() => {
	//    fetch(api_url).then((response) => response.json()).then((obj) => setObj(obj));
	//     }, []);

	// if (!obj) {
	//     return null;
	// }
	const [activeButton, setActiveButton] = useState<string | null>("vol Daily");

	const handleButtonClick = (period: string) => {
		setActiveButton(period);
	};


	const [activeButtonCross, setActiveButtonCross] = useState<string | null>("cross Daily");

	const activeButtonCrossFunction = (period: string) => {
		setActiveButtonCross(period);
	};

	return (<>
		<div className={s.period}>
			<div className={s.period_column}>
				<div className={s.period_title}>Volume</div>
				<ul className={s.period_list}>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButton === 'vol Daily' ? s.period_button_active : ''}`}
						onClick={() => handleButtonClick('vol Daily')}>Daily</button></li>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButton === 'vol Weekly' ? s.period_button_active : ''}`}
						onClick={() => handleButtonClick('vol Weekly')}>Weekly</button></li>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButton === 'vol Monthly' ? s.period_button_active : ''}`}
						onClick={() => handleButtonClick('vol Monthly')}>Monthly</button></li>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButton === 'vol All Time' ? s.period_button_active : ''}`}
						onClick={() => handleButtonClick('vol All Time')}>All Time</button></li>
				</ul>
			</div>
			<div className={s.period_column}>
				<div className={s.period_title}>Cross Profit</div>
				<ul className={s.period_list}>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButtonCross === 'cross Daily' ? s.period_button_active : ''}`}
						onClick={() => activeButtonCrossFunction('cross Daily')}>Daily</button></li>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButtonCross === 'cross Weekly' ? s.period_button_active : ''}`}
						onClick={() => activeButtonCrossFunction('cross Weekly')}>Weekly</button></li>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButtonCross === 'cross Monthly' ? s.period_button_active : ''}`}
						onClick={() => activeButtonCrossFunction('cross Monthly')}>Monthly</button></li>
					<li className={s.period_item}><button type='button' className={`${s.period_button} ${activeButtonCross === 'cross All Time' ? s.period_button_active : ''}`}
						onClick={() => activeButtonCrossFunction('cross All Time')}>All Time</button></li>
				</ul>
			</div>
		</div>
		<div className={s.total_container}>
			<TotalItem description='UserName' dunkin="Dunkin Caps" image={gold} dollar statistics={totals.total_wagered} />
			<TotalItem description='UserName' dunkin="Dunkin Caps" image={silver} dollar statistics={totals.total_bets} />
			<TotalItem description='UserName' dunkin="Dunkin Caps" image={bronze} dollar statistics={totals.total_users} />
		</div>
	</>);
}