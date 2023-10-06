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
  textColor?: "gold" | "white" | "dark" | "gray";
  link?: string;
}

// {
//   onClick,
//     size = "md",
//     color = "gradient",
//     radius = "md",
//     text,
//     textColor,
//     link,
// ...rest
// }
export const CustomButton: FC<ICustomButton> = (props) => {
  const buttonClasses = clsx(
    styles.button,
    props.size && styles[props.size],
    props.color && styles[props.color],
    props.radius && styles[props.radius],
    props.textColor && styles[`text_${props.textColor}`]
  );

  if (props.link) {
    return (
      <Link href={props.link} target="_blank">
        <Link target="_blank" className={buttonClasses} href={""}>
          <span className={styles.text}>{props.text}</span>
        </Link>
      </Link>
    );
  }
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className={styles.text}>{props.text}</span>
    </button>
  );
};
