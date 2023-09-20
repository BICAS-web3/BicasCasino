import {FC} from "react";
import {TitleTable} from "@/shared/ui/TitleTable/ui/ui";
import styles from './ui.module.scss'
export const BetsHistoryReDesign: FC<{}> = () => {

  return (
    <div className={styles.table}>
      <TitleTable />
    </div>
  )
}