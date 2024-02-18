import { ComponentType } from 'react';

import { IDateItem, IDecoratedCalendarProps } from '@root/types/calendar';

import { holidayDates } from '@constants/calendar';

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
