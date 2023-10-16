"use client";

import { Sequence } from "@/components/sequence"
import { useDailyDataListQuery, useWeekDailyDataListQuery } from '@/domains'

export default function IndexPage() {
  const dailySceneDataset = useDailyDataListQuery({ enabled: true, select(dataset) {
    return dataset.map((data) => ({
      id: data.id,
      label: data.day === 1 ? `${data.day}st` : data.day === 2 ? `${data.day}nd` : data.day === 3 ? `${data.day}rd` : `${data.day}th`,
      value: data["pm2.5"] ?? 0,
    }))
  }, });

  const weeklySceneDataset = useWeekDailyDataListQuery({ enabled: false, select(dataset) {
    return dataset.map((data) => ({
      id: data.id,
      label: data.weekday.slice(0, 3),
      value: data["pm2.5"] ?? 0,
    }))
  } });

  const dataset = dailySceneDataset || weeklySceneDataset;

  return (
    <main className="container h-main overflow-y-auto">
      <Sequence id="first" dataset={dataset} />
    </main>
  )
}
