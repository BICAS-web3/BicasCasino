import { FC } from "react";
import s from "./styles.module.scss";

import { RockButton } from "@/shared/SVGs/RockButton";
import { ScissorsButton } from "@/shared/SVGs/ScissorsButton";
import { PaperButton } from "@/shared/SVGs/PaperButton";

import * as RPSModel from "./model";
import { useUnit } from "effector-react";
import clsx from "clsx";

interface RpsPickerProps {}

export const RpsPicker: FC<RpsPickerProps> = () => {
  const [pickedValue, pickValue, active] = useUnit([
    RPSModel.$pickedValue,
    RPSModel.pickValue,
    RPSModel.$active,
  ]);

  return (
    <div className={s.rps_picker_block}>
      <div
        onClick={() => pickValue(RPSModel.RPSValue.Rock)}
        className={clsx(
          s.rps_picker_block_item,
          pickedValue === RPSModel.RPSValue.Rock &&
            s.rps_picker_block_item_active
        )}
      >
        <RockButton />
      </div>
      <div
        onClick={() => pickValue(RPSModel.RPSValue.Scissors)}
        className={clsx(
          s.rps_picker_block_item,
          pickedValue === RPSModel.RPSValue.Scissors &&
            s.rps_picker_block_item_active
        )}
      >
        <ScissorsButton />
      </div>
      <div
        onClick={() => pickValue(RPSModel.RPSValue.Paper)}
        className={clsx(
          s.rps_picker_block_item,
          pickedValue === RPSModel.RPSValue.Paper &&
            s.rps_picker_block_item_active
        )}
      >
        <PaperButton />
      </div>
    </div>
  );
};
