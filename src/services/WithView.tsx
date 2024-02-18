import { ComponentType, useEffect, useState } from 'react';

import { IDateItem, IDecoratedCalendarProps } from '@root/types/calendar';
import {
  convertInputToDateItem,
  formatMonthYear,
  getCalendarDates,
  getCurrentDateItem,
  getWeekCalendarDates,
  isValidDateItem,
} from '@utils/helpers';
import { getNextMonth, getPreviousMonth } from '@utils/helpers';

interface IDateValueState {
  target: IDateItem | null;
  week: number;
  month: number;
  year: number;
}

export const WithView = (Calendar: ComponentType<IDecoratedCalendarProps>) => {
  const WithViewComponent = (props: IDecoratedCalendarProps) => {
    const { dateInputValue, changeDateInputValue, viewType } = props;

    const syncDateWithState = (inputValue: string) => {
      const inputDate = convertInputToDateItem(inputValue);
      const isInputDateValid = isValidDateItem(inputDate);
      const chosenDate = isInputDateValid ? inputDate : getCurrentDateItem();

      return {
        target: isInputDateValid ? inputDate : null,
        week: chosenDate.week,
        month: chosenDate.month,
        year: chosenDate.year,
      };
    };

    const [dateValue, setDateValue] = useState<IDateValueState>(
      syncDateWithState(dateInputValue),
    );

    useEffect(() => {
      setDateValue(syncDateWithState(dateInputValue));
    }, [dateInputValue]);

    const getCurrentCalendarDates = () => {
      const { month, year, week } = dateValue;

      const calendarMonth = month;
      const calendarYear = year;
      const calendarWeek = week;

      return viewType === 'month'
        ? getCalendarDates(calendarYear, calendarMonth)
        : getWeekCalendarDates(calendarYear, calendarMonth, calendarWeek);
    };

    const getCurrentCalendarHeader = () => {
      return formatMonthYear(dateValue.month, dateValue.year);
    };

    const onPrevButtonClick = () => {
      const { target, week, month, year } = dateValue;
      const previousMonth = getPreviousMonth(month, year);

      if (viewType === 'week') {
        const newWeek = week === 0 ? 4 : week - 1;
        const newMonth = week === 0 ? previousMonth.month : month;
        const newYear = week === 0 ? previousMonth.year : year;

        setDateValue({ month: newMonth, week: newWeek, year: newYear, target });
      } else if (viewType === 'month') {
        setDateValue({
          month: previousMonth.month,
          week: 0,
          year: previousMonth.year,
          target,
        });
      }
    };

    const onNextButtonClick = () => {
      const { target, week, month, year } = dateValue;
      const nextMonth = getNextMonth(month, year);

      if (viewType === 'week') {
        const newWeek = week === 4 ? 0 : week + 1;
        const newMonth = !newWeek ? nextMonth.month : month;
        const newYear = !newWeek ? nextMonth.year : year;

        setDateValue({ month: newMonth, week: newWeek, year: newYear, target });
      } else if (viewType === 'month') {
        setDateValue({
          month: nextMonth.month,
          week,
          year: nextMonth.year,
          target,
        });
      }
    };

    const isCalendarDayTarget = (date: IDateItem) => {
      const targetDate = dateValue.target;
      if (targetDate) {
        const { day, month, year } = date;
        const {
          day: targetDay,
          month: targetMonth,
          year: targetYear,
        } = targetDate;

        return (
          month === targetMonth && day === targetDay && year === targetYear
        );
      }

      return false;
    };

    const isCalendarDayDisabled = (date: IDateItem) => {
      return dateValue.month !== date.month;
    };

    const onCalendarDayClick = (date: IDateItem) => () => {
      changeDateInputValue(date);
    };

    return (
      <Calendar
        {...props}
        currentCalendarDates={getCurrentCalendarDates()}
        currentCalendarHeader={getCurrentCalendarHeader()}
        onPrevButtonClick={onPrevButtonClick}
        onNextButtonClick={onNextButtonClick}
        isCalendarDayTarget={isCalendarDayTarget}
        isCalendarDayDisabled={isCalendarDayDisabled}
        onCalendarDayClick={onCalendarDayClick}
      />
    );
  };

  return WithViewComponent;
};
