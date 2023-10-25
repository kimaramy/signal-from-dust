export function translateWeekday(weekday: string) {
  const uppercasedWeekday = weekday.toUpperCase();
  switch (uppercasedWeekday) {
    case 'MONDAY':
      return '월요일';
    case 'TUESDAY':
      return '화요일';
    case 'WEDNESDAY':
      return '수요일';
    case 'THURSDAY':
      return '목요일';
    case 'FRIDAY':
      return '금요일';
    case 'SATURDAY':
      return '토요일';
    case 'SUNDAY':
      return '일요일';
    default:
      throw new TypeError(`${weekday} is not a Weekday type`);
  }
}
