export interface IDateItem {
  id?: string;
  year: number;
  month: number;
  week?: number;
  day: number;
}

export interface ICalendarProps {
  maxValue: IDateItem | undefined;
  minValue: IDateItem | undefined;
  range: boolean;
  startDateInputValue: string;
  endDateInputValue: string;
  holidays: boolean;
  todos: boolean;
  changeDateInputValue: (
    dateItem: IDateItem | null,
    type: DateInputType,
  ) => void;
  viewType: LiteralViewTypes;
  startDay: LiteralStartDays;
}

export interface IDecoratedCalendarProps extends ICalendarProps {
  currentCalendarDates: IDateItem[][];
  currentCalendarHeader: string;
  targetDateItem: IDateItem | null;
  targetEndDateItem: IDateItem | null;
  checkIfHoliday?: (dateItem: IDateItem) => boolean;
  onCalendarDayClick: (date: IDateItem) => () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  isTargetDay: (date: IDateItem) => boolean;
  isTargetRangeEnd: (date: IDateItem) => boolean;
  isDayInRange: (date: IDateItem) => boolean;
  isDayDisabled: (date: IDateItem) => boolean;
  onRangeCalendarDayClick: (date: IDateItem) => () => void;
  toggleTodoModal: () => void;
  closeTodoModal: () => void;
  isTodoModalVisible: boolean;
}

export enum DateInputTypesEnum {
  start = 'start',
  end = 'end',
}

export enum CalendarViewTypesEnum {
  year = 'year',
  month = 'month',
  week = 'week',
}

export enum CalendarStartDaysEnum {
  sunday = 'sunday',
  monday = 'monday',
}

export type DateInputType = keyof typeof DateInputTypesEnum;

export type LiteralViewTypes = keyof typeof CalendarViewTypesEnum;

export type LiteralStartDays = keyof typeof CalendarStartDaysEnum;
