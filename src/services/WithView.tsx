import { ComponentType, useEffect, useState } from 'react';

import { IDateItem, IDecoratedCalendarProps } from '@root/types/calendar';
import { validateInputValue } from '@utils/helpers';
import {
  convertInputToDateItem,
  formatMonthYear,
  getCalendarDates,
  getCurrentDateItem,
  getNextMonth,
  getPreviousMonth,
  getWeekCalendarDates,
  getYearCalendarDates
} from '@utils/helpers';

interface IDateValueState {
  target: IDateItem | null;
  week: number;
  month: number;
  year: number;
}

export const WithView = (Calendar: ComponentType<IDecoratedCalendarProps>) => {
  const WithViewComponent = (props: IDecoratedCalendarProps) => {
    const {
      dateInputValue,
      changeDateInputValue,
      viewType,
      startDay,
      minValue,
      maxValue,
    } = props;

    const syncDateWithState = (inputValue: string) => {
      const isInputValueValid = !validateInputValue(
        inputValue,
        minValue,
        maxValue,
      );
      const inputDate = convertInputToDateItem(inputValue);
      const chosenDate = isInputValueValid ? inputDate : getCurrentDateItem();

      return {
        target: isInputValueValid ? inputDate : null,
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

    const startDayIndex = startDay === 'monday' ? 1 : 0;

    const getCurrentCalendarDates = () => {
      const { month, year, week } = dateValue;

      const calendarMonth = month;
      const calendarYear = year;
      const calendarWeek = week;

      if (viewType === 'year') {
        return getYearCalendarDates(calendarYear, startDayIndex);
      } else if (viewType === 'month') {
        return [getCalendarDates(calendarYear, calendarMonth, startDayIndex)];
      } else {
        return [
          getWeekCalendarDates(
            calendarYear,
            calendarMonth,
            calendarWeek,
            startDayIndex,
          ),
        ];
      }
    };

    const getCurrentCalendarHeader = () => {
      return viewType !== 'year'
        ? formatMonthYear(dateValue.month, dateValue.year)
        : String(dateValue.year);
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
      } else if (viewType === 'year') {
        setDateValue({
          month: 1,
          week: 0,
          year: year - 1,
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
      } else if (viewType === 'year') {
        setDateValue({
          month: 1,
          week: 0,
          year: year + 1,
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
      const currentDate = new Date(date.year, date.month, date.day);
      if (minValue) {
        if (currentDate < new Date(minValue.year, minValue.month, minValue.day))
          return true;
      }
      if (maxValue) {
        if (currentDate > new Date(maxValue.year, maxValue.month, maxValue.day))
          return true;
      }

      if (viewType !== 'year') {
        return date.month !== dateValue.month;
      }

      return false;
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
