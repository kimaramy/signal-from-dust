import { mergeQueryKeys } from "@lukemorales/query-key-factory"

import { dailyDataKeys } from "./daily"
import { weekDailyDataKeys } from "./weekdaily"

export default mergeQueryKeys(dailyDataKeys, weekDailyDataKeys)
