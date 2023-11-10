import { cache } from 'react';

import { yearSchema } from '@/components/year';

import { fetchDistinctYearDataset } from './services';

// export const revalidate = 3600; // revalidate the data at most every hour

export const validateDistinctYears = cache(async (): Promise<string | null> => {
  try {
    const distinctYears = (await fetchDistinctYearDataset())
      .map((dbYearData) => dbYearData.year)
      .filter((year) => !Number.isNaN(Number(year))) as number[] | null;

    if (!distinctYears) {
      return 'Cannot request database years. Please check database table.';
    }

    const isSynced = yearSchema.checkSyncWithDB(distinctYears);

    if (!isSynced) {
      return 'Database has been updated. Please check schema years with database years.';
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
});
