import { ComponentType } from 'react';

import { holidayDates } from '@constants/calendar';
import { IDateItem, IDecoratedCalendarProps } from '@root/types/calendar';

export const WithHolidays = (
  Calendar: ComponentType<IDecoratedCalendarProps>,
) => {
  const WithHolidaysComponent = (props: IDecoratedCalendarProps) => {
    const checkIfHoliday = (dateItem: IDateItem) => {
      return !!holidayDates.find(
        (holiday) =>
          holiday.month === dateItem.month && holiday.day === dateItem.day,
      );
    };
    return <Calendar {...props} checkIfHoliday={checkIfHoliday} />;
  };

  return WithHolidaysComponent;
};
