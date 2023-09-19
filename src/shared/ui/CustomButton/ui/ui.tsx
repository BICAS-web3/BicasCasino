import { FC } from "react";
import styles from "./ui.module.scss";
import Link from "next/link";
import clsx from "clsx";

interface ICustomButton {
  onClick?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "transparent" | "dark" | "gradient";
  radius?: "sm" | "md" | "lg" | "xl";
  text?: string;
  textColor?: 'gold' | 'white' | 'dark';
  link?: string;
}

export const CustomButton: FC<ICustomButton> = ({
  onClick,
  size = "md",
  color = "gradient",
  radius = "md",
  text,
  textColor,
  link,
  ...rest
}) => {
  const buttonClasses = clsx(
    styles.button,
    styles[size],
    styles[color],
    styles[radius],
    textColor && styles[`text_${textColor}`]
  );

  if (link) {
    return (
      <Link href={link} target="_blank">
        <a target="_blank" className={buttonClasses}>
          <span className={styles.text}>{text}</span>
        </a>
      </Link>
    );
  }
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};
