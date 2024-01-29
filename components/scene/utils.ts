import {
  CollectionUtils,
  DayUtils,
  DustUtils,
  LocaleSchema,
  LocationUtils,
  Model,
  MonthUtils,
  WeekdayUtils,
  WeekUtils,
  YearUtils,
} from '@/lib/model';

import type { SceneData } from './context';

export class SceneUtils {
  static getSceneId(listId: string | number, itemId: string | number) {
    return [listId, itemId].join('-');
  }
  static getSceneLength(value: number) {
    return value.toString(2).length;
  }
  static toRealtimeSceneDataset<T>({
    dataset,
    locationKey,
    dustKey,
    locale,
    setValue,
  }: {
    dataset: T[];
    dustKey: DustUtils.Key;
    locationKey: LocationUtils.Key;
    locale: typeof LocaleSchema.defaultLocale;
    setValue: (data: T, dustKey: DustUtils.Key) => number;
  }): SceneData[] {
    return dataset.map((data, idx) => ({
      id: idx,
      value: setValue(data, dustKey),
      display: {
        dust: DustUtils.schema.display(dustKey, locale),
        location: LocationUtils.schema.display(locationKey, locale),
        dates: [
          new Date().toLocaleString(locale, {
            year: 'numeric', // 연
            month: 'long', // 월
            day: 'numeric', // 일
            weekday: 'short', // 요일,
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          }),
        ],
        ...[],
      },
      _ctx: {
        locale,
        dustKey,
      },
    }));
  }
  static toDailySceneDataset(
    dataset: Model.DailyData[],
    dustKey: DustUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
      id,
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      rank: null,
      display: {
        collection: CollectionUtils.schema.display(collectionKey, locale),
        yearRange: YearUtils.schema.getValueRange().join('~'),
        dust: DustUtils.schema.display(dustKey, locale),
        location: LocationUtils.schema.display(locationKey, locale),
        dates: [
          DayUtils.schema.display(DayUtils.schema.getKeyByValue(day), locale),
          MonthUtils.schema.display(
            MonthUtils.schema.getKeyByValue(month),
            'short',
            locale
          ),
        ],
      },
      _ctx: {
        locale,
        collectionKey,
        dustKey,
      },
    }));
  }
  static toWeekDailySceneDataset(
    dataset: Model.WeekDailyData[],
    dustKey: DustUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
      id,
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      rank: null,
      display: {
        collection: CollectionUtils.schema.display(collectionKey, locale),
        yearRange: YearUtils.schema.getValueRange().join('~'),
        dust: DustUtils.schema.display(dustKey, locale),
        location: LocationUtils.schema.display(locationKey, locale),
        dates: [
          WeekdayUtils.schema.display(
            WeekdayUtils.schema.getKeyByValue(weekday),
            'long',
            locale
          ),
          MonthUtils.schema.display(
            MonthUtils.schema.getKeyByValue(month),
            'short',
            locale
          ),
        ],
      },
      _ctx: {
        locale,
        collectionKey,
        dustKey,
      },
    }));
  }
  static toWeeklySceneDataset(
    dataset: Model.WeeklyData[],
    dustKey: DustUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
      id,
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      rank: null,
      display: {
        collection: CollectionUtils.schema.display(collectionKey, locale),
        yearRange: YearUtils.schema.getValueRange().join('~'),
        dust: DustUtils.schema.display(dustKey, locale),
        location: LocationUtils.schema.display(locationKey, locale),
        dates: [
          WeekUtils.schema.display(
            WeekUtils.schema.getKeyByValue(week),
            locale
          ),
          YearUtils.schema.display(
            YearUtils.schema.getKeyByValue(year),
            'short',
            locale
          ),
        ],
      },
      _ctx: {
        locale,
        collectionKey,
        dustKey,
      },
    }));
  }
  static toMonthlySceneDataset(
    dataset: Model.MonthlyData[],
    dustKey: DustUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
      id,
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      rank: null,
      display: {
        collection: CollectionUtils.schema.display(collectionKey, locale),
        yearRange: YearUtils.schema.getValueRange().join('~'),
        dust: DustUtils.schema.display(dustKey, locale),
        location: LocationUtils.schema.display(locationKey, locale),
        dates: [
          MonthUtils.schema.display(
            MonthUtils.schema.getKeyByValue(month),
            'long',
            locale
          ),
          YearUtils.schema.display(
            YearUtils.schema.getKeyByValue(year),
            'short',
            locale
          ),
        ],
      },
      _ctx: {
        locale,
        collectionKey,
        dustKey,
      },
    }));
  }
  static toYearlySceneDataset(
    dataset: Model.YearlyData[],
    dustKey: DustUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, pm_large, pm_small }) => ({
      id,
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      rank: null,
      display: {
        collection: CollectionUtils.schema.display(collectionKey, locale),
        yearRange: YearUtils.schema.getValueRange().join('~'),
        dust: DustUtils.schema.display(dustKey, locale),
        location: LocationUtils.schema.display(locationKey, locale),
        dates: [
          YearUtils.schema.display(
            YearUtils.schema.getKeyByValue(year),
            'short',
            locale
          ),
        ],
      },
      _ctx: {
        locale,
        collectionKey,
        dustKey,
      },
    }));
  }
}
