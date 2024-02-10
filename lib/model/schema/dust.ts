import { z } from 'zod';

import { CustomValueMapSchema, type CustomValueTemplate } from './base';
import { LocaleSchema } from './locale';

const dustSchemaName = 'dust';

const dustKeys = ['PM_LARGE', 'PM_SMALL'] as const;

const dustGradeKeys = ['GOOD', 'NORMAL', 'BAD', 'WORST'] as const;

const dustKeySchema = z.enum(dustKeys);

type DustSchemaName = typeof dustSchemaName;

type DustKey = z.infer<typeof dustKeySchema>;

type DustGradeKey = (typeof dustGradeKeys)[number];

type DustValue = CustomValueTemplate<DustKey>;

type DustGrades = Record<
  DustGradeKey,
  CustomValueTemplate<DustGradeKey> & {
    bgColor: string;
    color: string;
  }
>;

const dustValues: ReadonlyArray<DustValue> = [
  {
    name: 'PM_LARGE',
    order: 0,
    i18n: {
      en: 'PM10',
      ko: '미세먼지',
    },
  },
  {
    name: 'PM_SMALL',
    order: 1,
    i18n: {
      en: 'PM2.5',
      ko: '초미세먼지',
    },
  },
];

const dustGrades: DustGrades = {
  GOOD: {
    name: 'GOOD',
    order: 1,
    bgColor: '#25ce7b',
    color: '#0f172a',
    i18n: {
      en: 'Good',
      ko: '좋음',
    },
  },
  NORMAL: {
    name: 'NORMAL',
    order: 2,
    bgColor: '#fdc741',
    color: '#0f172a',
    i18n: {
      en: 'Normal',
      ko: '보통',
    },
  },
  BAD: {
    name: 'BAD',
    order: 3,
    bgColor: '#ff6b01',
    color: '#0f172a',
    i18n: {
      en: 'Bad',
      ko: '나쁨',
    },
  },
  WORST: {
    name: 'WORST',
    order: 4,
    bgColor: '#fc4236',
    color: '#e2e8f0',
    i18n: {
      en: 'Worst',
      ko: '매우나쁨',
    },
  },
};

const dustMap = new Map<DustKey, DustValue>(
  dustKeys.map((dustKey) => [
    dustKey,
    dustValues.find((dustValue) => dustValue.name === dustKey)!,
  ])
);

class DustSchema extends CustomValueMapSchema<
  DustSchemaName,
  DustKey,
  DustValue
> {
  protected readonly dustGrades: DustGrades;
  public readonly unit: string;

  constructor(dustGrades: DustGrades) {
    super(dustSchemaName, dustMap, dustKeySchema, dustKeySchema.enum.PM_LARGE);
    this.dustGrades = dustGrades;
    this.unit = '㎍/㎥';
  }
  display(dustKey: DustKey, locale = LocaleSchema.defaultLocale) {
    return this.getValue(dustKey)['i18n'][locale];
  }
  protected getLargeDustGrade(measures: number) {
    if (measures <= 30) return this.dustGrades.GOOD;
    if (measures <= 60) return this.dustGrades.NORMAL;
    if (measures <= 90) return this.dustGrades.BAD;
    // if (measures <= 80) return this.dustGrades.NORMAL;
    // if (measures <= 150) return this.dustGrades.BAD;
    return this.dustGrades.WORST;
  }
  protected getSmallDustGrade(measures: number) {
    if (measures <= 15) return this.dustGrades.GOOD;
    if (measures <= 30) return this.dustGrades.NORMAL;
    if (measures <= 45) return this.dustGrades.BAD;
    // if (measures <= 35) return this.dustGrades.NORMAL;
    // if (measures <= 75) return this.dustGrades.BAD;
    return this.dustGrades.WORST;
  }
  getGrade(measures: number, dustKey: DustKey) {
    if (dustKey === 'PM_LARGE') return this.getLargeDustGrade(measures);
    if (dustKey === 'PM_SMALL') return this.getSmallDustGrade(measures);
    throw new Error(
      `dustKey must be one of ${JSON.stringify(this.getAllKeys())}`
    );
  }
  getAllGradeKeys() {
    return Object.keys(this.dustGrades) as DustGradeKey[];
  }
}

const dustSchema = new DustSchema(dustGrades);

export namespace DustUtils {
  export type Key = DustKey;
  export type GradeKey = DustGradeKey;
  export type Value = DustValue;
  export type SchemaName = DustSchemaName;
  export const schema = dustSchema;
}
