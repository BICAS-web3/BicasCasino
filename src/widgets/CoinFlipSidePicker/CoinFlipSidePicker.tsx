import { FC, useState } from "react";
import s from "./styles.module.scss";

interface SidePickerProps { }

export const SidePicker: FC<SidePickerProps> = ({ }) => {
    const [activeSide, setActiveSide] = useState("face");

    return (<div className={s.face_tails_wrap}>
        <div className={s.face_tails_block}>
            <div
                className={`${s.face_block} ${activeSide === "face" && s.face_tails_active
                    }`}
                onClick={() => setActiveSide("face")}
            >
                face
            </div>
            <div
                className={`${s.tails_block} ${activeSide === "tails" && s.face_tails_active
                    }`}
                onClick={() => setActiveSide("tails")}
            >
                tails
            </div>
        </div>
    </div>)
}