import { FC } from "react";
import styles from "./styles.module.scss";
import { riskModel, changeRiskLevel, riskLevel } from "./model";

interface CustomRiskSelector {}

export const CustomRiskSelector: FC<CustomRiskSelector> = ({}) => {
  const riskLevelValue = riskModel.getState().riskLevel;

  const changeLevel = (level: string) => {
    changeRiskLevel(level);
  };

  return (
    <div className={styles.risk_container}>
      <div
        className={`${styles.button_risk} ${
          riskLevelValue === "Easy" ? styles.active : ""
        }`}
        onClick={() => changeLevel("Easy")}
      >
        Easy
      </div>
      <div
        className={`${styles.button_risk} ${
          riskLevelValue === "Normal" ? styles.active : ""
        }`}
        onClick={() => changeLevel("Normal")}
      >
        Normal
      </div>
      <div
        className={`${styles.button_risk} ${
          riskLevelValue === "Hard" ? styles.active : ""
        }`}
        onClick={() => changeLevel("Hard")}
      >
        Hard
      </div>
    </div>
  );
};
