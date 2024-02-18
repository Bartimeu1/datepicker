import { ComponentType } from 'react';

import { ICalendarProps,IDecoratedCalendarProps } from '@root/types/calendar';

import { CalendarService } from './CalendarService';
import { WithHolidays } from './WithHolidays';
import { WithView } from './WithView';

export const CalendarDecorator = function (
  Calendar: ComponentType<IDecoratedCalendarProps>,
) {
  return (props: ICalendarProps) => {
    const { withHolidays } = props;
    const calendarService = new CalendarService(Calendar);

    calendarService.addDecorator(WithView);

    if (withHolidays) {
      calendarService.addDecorator(WithHolidays);
    }

    const DecoratedCalendar =
      calendarService.getCalendar() as ComponentType<ICalendarProps>;

    return <DecoratedCalendar {...props} />;
  };
};
