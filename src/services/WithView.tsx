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
  getYearCalendarDates,
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
      startDateInputValue,
      endDateInputValue,
      changeDateInputValue,
      viewType,
      startDay,
      minValue,
      maxValue,
      range,
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

    const [startDateValue, setStartDateValue] = useState<IDateValueState>(
      syncDateWithState(startDateInputValue),
    );

    const [endDateValue, setEndDateValue] = useState<IDateValueState>(
      syncDateWithState(endDateInputValue),
    );

    useEffect(() => {
      setStartDateValue(syncDateWithState(startDateInputValue));
    }, [startDateInputValue]);

    useEffect(() => {
      setEndDateValue(syncDateWithState(endDateInputValue));
    }, [endDateInputValue]);

    const startDayIndex = startDay === 'monday' ? 1 : 0;

    const getCurrentCalendarDates = () => {
      const { month, year, week } = startDateValue;

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
        ? formatMonthYear(startDateValue.month, startDateValue.year)
        : String(startDateValue.year);
    };

    const onPrevButtonClick = () => {
      const { target, week, month, year } = startDateValue;
      const previousMonth = getPreviousMonth(month, year);

      if (viewType === 'week') {
        const newWeek = week === 0 ? 4 : week - 1;
        const newMonth = week === 0 ? previousMonth.month : month;
        const newYear = week === 0 ? previousMonth.year : year;

        setStartDateValue({
          month: newMonth,
          week: newWeek,
          year: newYear,
          target,
        });
      } else if (viewType === 'month') {
        setStartDateValue({
          month: previousMonth.month,
          week: 0,
          year: previousMonth.year,
          target,
        });
      } else if (viewType === 'year') {
        setStartDateValue({
          month: 1,
          week: 0,
          year: year - 1,
          target,
        });
      }
    };

    const onNextButtonClick = () => {
      const { target, week, month, year } = startDateValue;
      const nextMonth = getNextMonth(month, year);

      if (viewType === 'week') {
        const newWeek = week === 4 ? 0 : week + 1;
        const newMonth = !newWeek ? nextMonth.month : month;
        const newYear = !newWeek ? nextMonth.year : year;

        setStartDateValue({
          month: newMonth,
          week: newWeek,
          year: newYear,
          target,
        });
      } else if (viewType === 'month') {
        setStartDateValue({
          month: nextMonth.month,
          week,
          year: nextMonth.year,
          target,
        });
      } else if (viewType === 'year') {
        setStartDateValue({
          month: 1,
          week: 0,
          year: year + 1,
          target,
        });
      }
    };

    const isCalendarDayTarget = (date: IDateItem) => {
      const targetDate = startDateValue.target;
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

    const isTargetEnd = (date: IDateItem) => {
      const targetDate = endDateValue.target;
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
        return date.month !== startDateValue.month;
      }

      return false;
    };

    const isDayInRange = (date: IDateItem) => {
      const startDayTarget = startDateValue.target;
      const endDayTarget = endDateValue.target;

      if (startDayTarget && endDayTarget) {
        const {
          day: startDay,
          month: startMonth,
          year: startYear,
        } = startDayTarget;

        const { day: endDay, month: endMonth, year: endYear } = endDayTarget;

        const currentDate = new Date(date.year, date.month, date.day);
        const startDate = new Date(startYear, startMonth, startDay);
        const endDate = new Date(endYear, endMonth, endDay);

        if (currentDate > startDate && currentDate < endDate) {
          return true;
        }
      }

      return false;
    };

    const onRangeCalendarDayClick = (date: IDateItem) => () => {
      if (!startDateValue.target) {
        changeDateInputValue(date, 'start');
      } else if (!endDateValue.target) {
        if (
          date.year > startDateValue.target.year ||
          (date.year === startDateValue.target.year &&
            date.month > startDateValue.target.month) ||
          (date.year === startDateValue.target.year &&
            date.month === startDateValue.target.month &&
            date.day >= startDateValue.target.day)
        ) {
          changeDateInputValue(date, 'end');
        } else {
          changeDateInputValue(date, 'start');
          changeDateInputValue(startDateValue.target, 'end');
        }
      } else {
        changeDateInputValue(date, 'start');
        changeDateInputValue(null, 'end');
      }
    };

    const onCalendarDayClick = (date: IDateItem) => () => {
      changeDateInputValue(date, 'start');
    };

    return (
      <Calendar
        {...props}
        currentCalendarDates={getCurrentCalendarDates()}
        currentCalendarHeader={getCurrentCalendarHeader()}
        onPrevButtonClick={onPrevButtonClick}
        onNextButtonClick={onNextButtonClick}
        isTargetDay={isCalendarDayTarget}
        isDayInRange={isDayInRange}
        isTargetEndDay={isTargetEnd}
        isDayDisabled={isCalendarDayDisabled}
        onCalendarDayClick={
          range ? onRangeCalendarDayClick : onCalendarDayClick
        }
      />
    );
  };

  return WithViewComponent;
};
