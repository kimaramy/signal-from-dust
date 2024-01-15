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
    return [listId, itemId].join(',');
  }
  static getSceneLength(value: number) {
    return value.toString(2).length;
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
      name: dustKey,
      displayName: DustUtils.schema.display(dustKey, locale),
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey, locale),
      dates: [
        DayUtils.schema.display(DayUtils.schema.getKeyByValue(day), locale),
        MonthUtils.schema.display(
          MonthUtils.schema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: LocationUtils.schema.display(locationKey, locale),
      rank: null,
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
      name: dustKey,
      displayName: DustUtils.schema.display(dustKey, locale),
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey, locale),
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
      location: LocationUtils.schema.display(locationKey, locale),
      rank: null,
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
      name: dustKey,
      displayName: DustUtils.schema.display(dustKey, locale),
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey, locale),
      dates: [
        WeekUtils.schema.display(WeekUtils.schema.getKeyByValue(week), locale),
        YearUtils.schema.display(
          YearUtils.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: LocationUtils.schema.display(locationKey, locale),
      rank: null,
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
      name: dustKey,
      displayName: DustUtils.schema.display(dustKey, locale),
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey, locale),
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
      location: LocationUtils.schema.display(locationKey, locale),
      rank: null,
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
      name: dustKey,
      displayName: DustUtils.schema.display(dustKey, locale),
      value:
        dustKey === 'PM_LARGE'
          ? pm_large
          : dustKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey, locale),
      dates: [
        YearUtils.schema.display(
          YearUtils.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: LocationUtils.schema.display(locationKey, locale),
      rank: null,
    }));
  }
}
