import type { BitValue, VacantBitValue } from './context';

export class BitUtils {
  static getBitId(sceneId: string, bitIdx: number) {
    return [sceneId, bitIdx].join('-');
  }
  static toBitValues(value: number | null | undefined) {
    return (value?.toString(2).split('') ?? []) as BitValue[];
  }
  static toBitValuesWithVacancies(
    value: number | null | undefined,
    sceneLength: number
  ) {
    const bitValues = BitUtils.toBitValues(value);
    const bitValuesWithVacancies =
      sceneLength > bitValues.length
        ? bitValues.concat(new Array(sceneLength - bitValues.length).fill('-1'))
        : bitValues;
    return bitValuesWithVacancies as (BitValue | VacantBitValue)[];
  }
}
