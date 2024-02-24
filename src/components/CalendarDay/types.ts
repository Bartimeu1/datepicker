import { IDateItem } from '@root/types/calendar';

export interface ICalendarDayProps {
  isDisabled: boolean;
  isTarget: boolean;
  range: boolean;
  isTargetEnd: boolean | null;
  isHoliday: boolean | null;
  isInRange: boolean;
  toggleTodoModal: () => void;
  date: IDateItem;
  onCalendarDayClick: (date: IDateItem) => () => void;
}

export interface IStyledCalendarDay {
  $isDisabled: boolean;
  $isTarget: boolean;
  $range: boolean;
  $isInRange: boolean;
  $isTargetEnd: boolean | null;
  $isHoliday: boolean | null;
}
