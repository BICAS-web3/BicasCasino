import { FC, useState } from "react";
import styles from "./ui.module.scss";

interface IPlinkoPyramid {}

export const PlinkoPyramid: FC<IPlinkoPyramid> = () => {
    const [rowCount, setRowCount] = useState(10);
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
        return rows;
    };
    return (
        <div className={styles.container}>
            {generateRows()}
            <button onClick={() => setRowCount(rowCount + 1)}>Добавить ряд</button>
            <button onClick={() => setRowCount(rowCount - 1)}>Убрать ряд</button>
        </div>
    );

  //   return (
  //   <div className={styles.container}>
  //     <div className={styles.pyramid_row}>
  //         <span className={styles.ball}>ball</span>
  //       <div className={styles.dot_container}>
  //           <span className={styles.dot}></span>
  //       </div>
  //     </div>
  //   </div>
  // );
};