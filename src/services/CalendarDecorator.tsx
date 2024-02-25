import { ComponentType } from 'react';

import { ICalendarProps, IDecoratedCalendarProps } from '@root/types/calendar';
import {
  WithHolidays,
  WithRange,
  WithTodos,
  WithViewLogic,
} from '@services/decorators';

import { CalendarService } from './CalendarService';

export const CalendarDecorator = function (
  Calendar: ComponentType<IDecoratedCalendarProps>,
) {
  const WithDecorators = (props: ICalendarProps) => {
    const { holidays, todos, range } = props;
    const calendarService = new CalendarService(Calendar);

    calendarService.addDecorator(WithViewLogic);

    if (holidays) {
      calendarService.addDecorator(WithHolidays);
    }

    if (range) {
      calendarService.addDecorator(WithRange);
    }

    if (todos) {
      calendarService.addDecorator(WithTodos);
    }

    const DecoratedCalendar =
      calendarService.getCalendar() as ComponentType<ICalendarProps>;

    return <DecoratedCalendar {...props} />;
  };

  return WithDecorators;
};
