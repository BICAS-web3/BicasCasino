import { FC, useEffect, useState } from "react";
import styles from "./ui.module.scss";

interface IPlinkoPyramid {}

export const PlinkoPyramid: FC<IPlinkoPyramid> = () => {
    const [rowCount, setRowCount] = useState(8);
    const [multiplierCount, setMultiplierCount] = useState(9); // Изменяем начальное значение множителей

    const generateRows = () => {
        const rows = [];
        const middleIndex = Math.floor(rowCount / 2);

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

        const multipliers = [];
        for (let i = 0; i < multiplierCount; i++) {
            const multiplierValue = (middleIndex - Math.abs(middleIndex - i) * 0.5).toFixed(1);

            multipliers.push(
                <div className={styles.multipiler_cell} key={i}>
                    {multiplierValue}
                </div>
            );
        }

        rows.push(
            <div className={styles.pyramid_row} key={rowCount}>
                <div className={styles.multipiler_container}>{multipliers}</div>
            </div>
        );

        return rows;
    };

    return (
        <div className={styles.container}>
            {generateRows()}
            <button onClick={() => {
                setRowCount(rowCount + 1);
                setMultiplierCount(multiplierCount + 1); // Увеличиваем количество множителей при добавлении ряда
            }}>Добавить ряд</button>
            <button onClick={() => {
                if (rowCount > 0) {
                    setRowCount(rowCount - 1);
                    setMultiplierCount(multiplierCount - 1); // Убираем ряд и уменьшаем количество множителей
                }
            }}>Убрать ряд</button>
        </div>
    );
};

