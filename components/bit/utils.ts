export class BitUtils {
  static toBits(value: number | null | undefined) {
    return value?.toString(2).split('') ?? [];
  }
  static getBitId(sceneId: string, bitIdx: number) {
    return [sceneId, bitIdx].join('-');
  }
}
