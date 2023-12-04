import s from "./styles.module.scss";
import { FC } from "react";

interface StepTabProps {
  content: any;
}

export const StepTab: FC<StepTabProps> = ({ content }) => {
  return content;
};
