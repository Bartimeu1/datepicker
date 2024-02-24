import { ComponentType } from 'react';

import { ICalendarProps, IDecoratedCalendarProps } from '@root/types/calendar';

import { CalendarService } from './CalendarService';
import { WithHolidays } from './WithHolidays';
import { WithTodos } from './WithTodos';
import { WithRange } from './WithRange';
import { WithViewLogic } from './WithViewLogic';

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
