import { ComponentType, useMemo, useCallback } from 'react';

import { IDecoratedCalendarProps, IDateItem } from '@root/types/calendar';

import { syncInputWithDateItem } from '@utils/helpers';
import { parseDateItemIntoDate, isDateAfter } from '@root/utils/date';
import { DateInputTypesEnum } from '@root/types/calendar';

export const WithRange = (Calendar: ComponentType<IDecoratedCalendarProps>) => {
  const WithRangeComponent = (props: IDecoratedCalendarProps) => {
    const {
      startDateInputValue,
      endDateInputValue,
      minValue,
      maxValue,
      changeDateInputValue,
    } = props;

    const targetStartDate = useMemo(
      () => syncInputWithDateItem(startDateInputValue, minValue, maxValue),
      [startDateInputValue, syncInputWithDateItem],
    );

    const targetEndDate = useMemo(
      () => syncInputWithDateItem(endDateInputValue, minValue, maxValue),
      [endDateInputValue, syncInputWithDateItem],
    );

    const isTargetEnd = (date: IDateItem) => {
      if (targetEndDate) {
        const { day, month, year } = date;
        const {
          day: targetDay,
          month: targetMonth,
          year: targetYear,
        } = targetEndDate;

        return (
          month === targetMonth && day === targetDay && year === targetYear
        );
      }

      return false;
    };

    const onRangeCalendarDayClick = useCallback(
      (date: IDateItem) => () => {
        const selectedDate = parseDateItemIntoDate(date);
        if (!targetStartDate || (targetStartDate && targetEndDate)) {
          changeDateInputValue(date, DateInputTypesEnum.start);
          changeDateInputValue(null, DateInputTypesEnum.end);
        } else if (
          isDateAfter(selectedDate, parseDateItemIntoDate(targetStartDate))
        ) {
          changeDateInputValue(date, DateInputTypesEnum.end);
        } else {
          changeDateInputValue(date, DateInputTypesEnum.start);
          changeDateInputValue(targetStartDate, DateInputTypesEnum.end);
        }
      },
      [changeDateInputValue, targetEndDate, targetStartDate],
    );

    const isDayInRange = (date: IDateItem) => {
      if (targetStartDate && targetEndDate) {
        const currentDate = parseDateItemIntoDate(date);
        const startDate = parseDateItemIntoDate(targetStartDate);
        const endDate = parseDateItemIntoDate(targetEndDate);

        return currentDate > startDate && currentDate < endDate;
      }

      return false;
    };

    return (
      <Calendar
        {...props}
        isDayInRange={isDayInRange}
        isTargetEndDay={isTargetEnd}
        onRangeCalendarDayClick={onRangeCalendarDayClick}
      />
    );
  };

  return WithRangeComponent;
};
