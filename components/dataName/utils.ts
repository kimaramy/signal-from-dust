import type { QueryParams } from '@/lib/types';
import { pickQueryParam, QueryParamEnum, toUpperCase } from '@/lib/utils';

import { dataNameSchema, type DataNameKey } from './schema';

export const pickDataNameKey = (params?: QueryParams) => {
  const maybeDataNameKey = toUpperCase(
    pickQueryParam(params, QueryParamEnum.DataName, dataNameSchema.defaultKey)
  );
  dataNameSchema.parseKey(maybeDataNameKey);
  return maybeDataNameKey as DataNameKey;
};
