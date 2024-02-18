import { ComponentType } from 'react';
import { WithHolidays } from './WithHolidays';
import { CalendarService } from './CalendarService';
import { WithView } from './WithView';

import { IDecoratedCalendarProps, ICalendarProps } from '@root/types/calendar';

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
