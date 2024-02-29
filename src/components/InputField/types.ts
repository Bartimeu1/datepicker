import { IDateItem } from '@root/types/calendar';

export interface IInputFieldProps {
  label: string;
  minValue: IDateItem | undefined;
  maxValue: IDateItem | undefined;
  dateInputValue: string;
  isCalendarVisible: boolean;
  onCalendarIconClick: () => void;
  setInputValue: (value: string) => void;
  onChange: ((value: string) => void) | undefined;
}

export interface ICalendarButton {
  $isCalendarVisible: boolean;
}
