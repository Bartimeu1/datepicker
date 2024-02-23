import {
  IDateItem,
  LiteralStartDays,
  LiteralViewTypes,
} from '@root/types/calendar';

export interface IDatePickerProps {
  maxValue?: IDateItem;
  minValue?: IDateItem;
  range: boolean;
  holidays: boolean;
  todos: boolean;
  viewType: LiteralViewTypes;
  startDay: LiteralStartDays;
}
