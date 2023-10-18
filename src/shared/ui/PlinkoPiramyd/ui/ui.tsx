import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";
import { $pickedValue } from "@/widgets/CustomWagerRangeInput/model";
import { useStore, useUnit } from "effector-react";
import {
	easyMultipliers,
	hardMultipliers,
	normalMultipliers,
} from "@/shared/ui/PlinkoPiramyd/multipliersArrays";
import { PlinkoBallIcon } from "@/shared/SVGs/PlinkoBallIcon";
import { useDeviceType } from "@/shared/tools";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";

const testBallPath = [true, true, false, false, false, true, false, true];

interface PlinkoBallProps {
	path: boolean[];
}

export const PlinkoBall: FC<PlinkoBallProps> = (props) => {
	const ballRef = useRef<HTMLDivElement>(null);

	const [ballTop, setBallTop] = useState<number>(-37); // starting position top/Y
	const [ballLeft, setBallLeft] = useState<number>(0); // starting position left/X
	const [pathIndex, setPathIndex] = useState<number>(-1);
	const device = useDeviceType();

	let lastMove = 0;
	let firstMove = 0;
	let movingDeep = 0;
	let sidesMove = 0;

	useEffect(() => {
		if (device) {
			if (device == "bigTablet") {
				setBallLeft(-5);
			} else if (device == "main") {
				setBallLeft(-10);
			} else {
				setBallLeft(-4);
			}
		}
	}, [device]);

	useEffect(() => {
		if (!device) {
			return;
		}
		if (device === "bigTablet") {
			movingDeep = 15;
			firstMove = -9;
			lastMove = 11;
			sidesMove = 13;
		} else if (device === "main") {
			firstMove = -11;
			movingDeep = 26;
			lastMove = 26;
			sidesMove = 17.5;
		} else {
			firstMove = -10;
			movingDeep = 11;
			lastMove = 5;
			sidesMove = 9;
		}

		if (pathIndex >= props.path.length) {
			setBallTop(ballTop + lastMove); // last movement to the basket
			return;
		}
		if (pathIndex == -1) {
			setBallTop(firstMove); // first movement from the starting position
			setPathIndex(pathIndex + 1);
			return;
		}
		const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
		const run = async () => {
			// main body of the loop
			const point = props.path[pathIndex];
			setBallTop(ballTop + movingDeep);
			if (point) {
				setBallLeft(ballLeft + sidesMove);
			} else {
				setBallLeft(ballLeft - sidesMove);
			}
			await sleep(200); // animation length
			setPathIndex(pathIndex + 1);
		};
		run();
	}, [pathIndex, device]);

	return (
		<div
			className={styles.plinko_ball}
			ref={ballRef}
			style={{
				top: `${ballTop}px`,
				left: `calc(50% + ${ballLeft}px)`,
			}}
		>
			<PlinkoBallIcon />
		</div>
	);
};

interface IPlinkoPyramid {
	path: boolean[] | undefined
}

export const PlinkoPyramid: FC<IPlinkoPyramid> = props => {
	const pickedValue = useStore($pickedValue);
	const [rowCount, setRowCount] = useState(pickedValue);
	const [multipliers, setMultipliers] = useState<number[]>([]);
	const device = useDeviceType();
	const [currentLevel, setCurrentLevel] = useState("");

	const [level] = useUnit([levelModel.$level]);

	useEffect(() => {
		setCurrentLevel(level);
	}, [level]);

	const updateMultipliers = (rowCount: number, lvl: string) => {
		const easyMultipliersArray = easyMultipliers[rowCount];
		const normalMultipliersArray = normalMultipliers[rowCount];
		const hardMultipliersArray = hardMultipliers[rowCount];

		if (lvl == "easy") {
			setMultipliers(easyMultipliersArray);
		} else if (lvl == "normal") {
			setMultipliers(normalMultipliersArray);
		} else if (lvl == "hard") {
			setMultipliers(hardMultipliersArray);
		}
	};

	useLayoutEffect(() => {
		const updateDotSizes = (rowCount: number) => {
			const dotWidth =
				device === "main"
					? "5px"
					: device === "bigTablet"
						? "3px"
						: device === "tablet"
							? "3px"
							: device === "phone"
								? "3px"
								: "5px";
			const dotHeight =
				device === "main"
					? "5px"
					: device === "bigTablet"
						? "3px"
						: device === "tablet"
							? "3px"
							: device === "phone"
								? "3px"
								: "5px";
			document.documentElement.style.setProperty("--dot-width", dotWidth);
			document.documentElement.style.setProperty("--dot-height", dotHeight);
		};
		updateDotSizes(pickedValue);
	}, [device]);

	useEffect(() => {
		updateMultipliers(pickedValue, currentLevel);
	}, [pickedValue, currentLevel]);

	useEffect(() => {
		setRowCount(pickedValue);

		console.log("PICKED VALUE", pickedValue);
	}, [pickedValue]);

	const generateRows = () => {
		const rows = [];
		for (let i = 0; i < rowCount; i++) {
			const dots = [];
			for (let j = 0; j < i + 3; j++) {
				dots.push(<span className={styles.dot} key={j}></span>);
			}

			rows.push(
				<div className={styles.pyramid_row} key={i}>
					<span className={styles.ball}>ball</span>
					<div className={styles.dot_container}>{dots}</div>
				</div>
			);
		}

		// Стилизация Кубиков со значениями
		function countMultipliersSteps(length: number): number {
			return ((length - 1) / 2);
		}

		const [multipliersSteps, setMultipliersSteps] = useState<number>(countMultipliersSteps(multipliers.length));

		useEffect(() => {
			setMultipliersSteps(countMultipliersSteps(multipliers.length));
		}, [multipliers.length]);

		// Назначение цветов
		interface InterfaceMultipliersColor {
			r: number,
			g: number,
			b: number,
		}
		// rgba(205, 93, 33, 1) rgba(255, 170, 92, 1)
		const multipliersColorCenter: string = "rgba(255, 170, 92, 1)"; // вот цвета. Крайние и центральный. Надо, чтобы обязательно затемнялись. На высветвление надо другое делать
		const multipliersColorStart: InterfaceMultipliersColor = {
			r: 205,
			g: 93,
			b: 33, // это тоже цвета 
		};
		const multipliersColorEnd: InterfaceMultipliersColor = {
			r: 255,
			g: 170,
			b: 92,
		};
		// Высчитывание цвета на один шаг
		const calcMultipliersColor: InterfaceMultipliersColor = {
			r: (multipliersColorEnd.r - multipliersColorStart.r) / multipliersSteps,
			g: (multipliersColorEnd.g - multipliersColorStart.g) / multipliersSteps,
			b: (multipliersColorEnd.b - multipliersColorStart.b) / multipliersSteps,
		}

		function multipliersBackground(i: number): string {
			if (i !== multipliersSteps) {
				if (i / (multipliersSteps / 2) < 2) {
					const formula: number = (calcMultipliersColor.r * (i + 1));
					return `rgb(${multipliersColorStart.r + formula}, ${multipliersColorStart.g + formula}, ${multipliersColorStart.b + formula})`;

				} else if (i / (multipliersSteps / 2) > 2) {
					const formula: number = (calcMultipliersColor.r * (((multipliersSteps * 2) + 1) - i))
					return `rgb(${multipliersColorStart.r + formula}, ${multipliersColorStart.g + formula}, ${multipliersColorStart.b + formula})`;

				}
			}
			return multipliersColorCenter
		}

		const multiplierElements = multipliers.map((value, i) => (
			<div className={styles.multipiler_cell} key={i} >
				<svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M27.7339 0C24 2.08113 21.0414 2.08113 17 2.08113C12.9586 2.08113 10 2.08113 6.82225 0H0V24H34V0H27.7339Z" fill={multipliersBackground(i)} />
				</svg>
				<span>
					{value}x
				</span>
			</div >
		));
		rows.push(
			<div className={styles.pyramid_row} key={rowCount}>
				<div className={styles.multipiler_container}>{multiplierElements}</div>
			</div>
		);

		return rows;
	};

	return (
		<div className={styles.container}>
			{generateRows()}
			{props.path &&
				<div className={styles.plinko_ball_container}>
					<PlinkoBall path={props.path} />
				</div>}
		</div>
	);
};
