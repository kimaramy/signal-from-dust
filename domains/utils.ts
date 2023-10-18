import type { DataUnit } from "./types"

export function getDataUnitCount(dataUnit: DataUnit) {
  switch (dataUnit) {
    case "weekdaily":
      return 7
    case "daily":
      return 31
    case "weekly":
      return 53
    case "monthly":
      return 12
    case "yearly":
      return 8
    default:
      throw new TypeError(`${dataUnit} is not a DataUnit type`)
  }
}
