import {
  CollectionUtils,
  DataNameUtils,
  DayUtils,
  LocaleSchema,
  LocationUtils,
  Model,
  MonthUtils,
  WeekdayUtils,
  WeekUtils,
  YearUtils,
} from '@/lib/model';

export interface SceneData {
  id: number;
  name: string;
  displayName: string;
  value: number | null;
  collection: string;
  dates: string[];
  location: string;
  rank: number | null;
}

export class SceneUtils {
  static getSceneId(listId: string | number, itemId: string | number) {
    return [listId, itemId].join(',');
  }
  static getSceneLength(value: number) {
    return value.toString(2).length;
  }
  static toDailyScenes(
    dataset: Model.DailyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey, locale),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
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
  static toWeekDailyScenes(
    dataset: Model.WeekDailyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey, locale),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
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
  static toWeeklyScenes(
    dataset: Model.WeeklyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey, locale),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
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
  static toMonthlyScenes(
    dataset: Model.MonthlyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey, locale),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
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
  static toYearlyScenes(
    dataset: Model.YearlyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locationKey: LocationUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey, locale),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
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
