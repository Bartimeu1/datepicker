export interface IDateItem {
  year: number;
  month: number;
  week?: number;
  day: number;
}

export type LiteralViewTypes = 'week' | 'month' | 'year';

export interface ICalendarProps {
  dateInputValue: string;
  withHolidays: boolean;
  changeDateInputValue: (dateItem: IDateItem) => void;
  viewType: LiteralViewTypes;
}

export interface IDecoratedCalendarProps extends ICalendarProps {
  currentCalendarDates: IDateItem[];
  currentCalendarHeader: string;
  checkIfHoliday?: (dateItem: IDateItem) => boolean;
  onCalendarDayClick: (date: IDateItem) => () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  isCalendarDayTarget: (date: IDateItem) => boolean;
  isCalendarDayDisabled: (date: IDateItem) => boolean;
}
