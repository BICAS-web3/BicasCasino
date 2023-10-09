import { FC, useState } from "react";
import s from "./styles.module.scss";
import { SidePickerModel } from ".";
import { useUnit } from "effector-react";

interface SidePickerProps { }

export const SidePicker: FC<SidePickerProps> = ({ }) => {
    const [
        pickedSide,
        pickSide,
        active
    ] = useUnit([
        SidePickerModel.$pickedSide,
        SidePickerModel.pickSide,
        SidePickerModel.$active
    ])
    //const [activeSide, setActiveSide] = useState("face");

    return (<div className={s.face_tails_wrap}>
        <div className={s.face_tails_block}>
            <div
                className={`${s.face_block} ${pickedSide == SidePickerModel.Side.Heads && s.face_tails_active
                    }`}
                onClick={() => { if (active) pickSide(SidePickerModel.Side.Heads) }}
            >
                face
            </div>
            <div
                className={`${s.tails_block} ${pickedSide == SidePickerModel.Side.Tails && s.face_tails_active
                    }`}
                onClick={() => { if (active) pickSide(SidePickerModel.Side.Tails) }}
            >
                tails
            </div>
        </div>
    </div>)
}