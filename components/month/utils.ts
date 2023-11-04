// import { defaultMonthKey, MonthKey } from './schema';

export function toMonthName(
  value: number,
  format: Intl.DateTimeFormatOptions['month'] = 'long',
  locale: Intl.LocalesArgument = 'ko-KR'
) {
  const date = new Date();
  date.setMonth(value - 1);
  return date.toLocaleString(locale, { month: format });
}

// export function translateMonth(monthKey: MonthKey = defaultMonthKey) {
//   switch (monthKey) {
//     case 'All':
//       return '매달';
//     case 'January':
//       return '1월';
//     case 'February':
//       return '2월';
//     case 'March':
//       return '3월';
//     case 'April':
//       return '4월';
//     case 'May':
//       return '5월';
//     case 'June':
//       return '6월';
//     case 'July':
//       return '7월';
//     case 'August':
//       return '8월';
//     case 'September':
//       return '9월';
//     case 'October':
//       return '10월';
//     case 'November':
//       return '11월';
//     case 'December':
//       return '12월';
//     default:
//       throw new TypeError(`${monthKey} is not a MonthKey type`);
//   }
// }
