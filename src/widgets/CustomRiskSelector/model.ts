import { createStore, createEvent, combine, Store } from "effector";

export const changeRiskLevel = createEvent<string>();

interface IMultipliers {
  Easy: { [key: number]: number[] };
  Normal: { [key: number]: number[] };
  Hard: { [key: number]: number[] };
}

import { newMultipliers } from "@/shared/ui/PlinkoPiramyd/multipliersArrays";

export const riskLevel = createStore<string>("Easy").on(
  changeRiskLevel,
  (_, level) => level
);

export const multipliers = riskLevel.map<IMultipliers>((level) => {
  return {
    Easy: newMultipliers[level] || {},
    Normal: newMultipliers[level] || {},
    Hard: newMultipliers[level] || {},
  };
});

export const riskModel: Store<{
  multipliers: IMultipliers;
  riskLevel: string;
}> = combine({
  riskLevel: riskLevel,
  multipliers: multipliers,
});
