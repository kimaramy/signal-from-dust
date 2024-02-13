import { Parser, type ParserOptions } from '@json2csv/plainjs';

export type CsvFileName = `${string}.csv`;

export type JsonToCsvParserOptions<T> = ParserOptions<T>;

export function parseJsonToCsv<T extends object = object>(
  json: T[],
  parserOptions?: JsonToCsvParserOptions<T>
) {
  const parser = new Parser(parserOptions);
  const csv = parser.parse(json);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  return blob;
}
