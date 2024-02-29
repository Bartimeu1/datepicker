import { IDateItem } from '@root/types/calendar';

export interface IInputFieldProps {
  label: string;
  minValue: IDateItem | undefined;
  maxValue: IDateItem | undefined;
  dateInputValue: string;
  isCalendarVisible: boolean;
  onCalendarIconClick: () => void;
  setInputValue: (value: string) => void;
}

export interface ICalendarButton {
  $isCalendarVisible: boolean;
}
