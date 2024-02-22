export interface IDateItem {
  year: number;
  month: number;
  week?: number;
  day: number;
}

export type LiteralViewTypes = 'week' | 'month' | 'year';

export type LiteralStartDays = 'sunday' | 'monday';

export interface ICalendarProps {
  maxValue?: IDateItem | null;
  minValue?: IDateItem | null;
  range: boolean;
  startDateInputValue: string;
  endDateInputValue: string;
  withHolidays: boolean;
  changeDateInputValue: (dateItem: IDateItem | null, type: string) => void;
  viewType: LiteralViewTypes;
  startDay: LiteralStartDays;
}

export interface IDecoratedCalendarProps extends ICalendarProps {
  currentCalendarDates: IDateItem[][];
  currentCalendarHeader: string;
  targetDateItem: IDateItem | null;
  checkIfHoliday?: (dateItem: IDateItem) => boolean;
  onCalendarDayClick: (date: IDateItem) => () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  isTargetDay: (date: IDateItem) => boolean;
  isTargetEndDay: (date: IDateItem) => boolean;
  isDayDisabled: (date: IDateItem) => boolean;
  isDayInRange: (date: IDateItem) => boolean;
}
