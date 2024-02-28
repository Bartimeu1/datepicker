import { ComponentType, useCallback, useMemo, useState } from 'react';

import {
  mondayCalendarIndex,
  sundayCalendarIndex,
  weeksInMonth,
  initialMonthIndex,
  initialWeekIndex,
} from '@constants/calendar';
import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
  DateInputTypesEnum,
  IDateItem,
  IDecoratedCalendarProps,
} from '@root/types/calendar';
import {
  formatMonthYear,
  getCalendarDates,
  getNextMonth,
  getPreviousMonth,
  getWeekCalendarDates,
  getYearCalendarDates,
} from '@utils/calendar';
import { parseDateItemIntoDate } from '@utils/date';
import { syncInputWithState } from '@utils/helpers';

interface IDateValueState {
  target: IDateItem | null;
  week: number;
  month: number;
  year: number;
}

export const WithViewLogic = (
  Calendar: ComponentType<IDecoratedCalendarProps>,
) => {
  const WithViewComponent = (props: IDecoratedCalendarProps) => {
    const {
      changeDateInputValue,
      startDateInputValue,
      viewType,
      startDay,
      minValue,
      maxValue,
    } = props;

    const [startDateValue, setStartDateValue] = useState<IDateValueState>(
      syncInputWithState(startDateInputValue, minValue, maxValue),
    );

    const startDayIndex = useMemo(
      () =>
        startDay === CalendarStartDaysEnum.monday
          ? mondayCalendarIndex
          : sundayCalendarIndex,
      [startDay],
    );

    const getCurrentCalendarDates = () => {
      const { month, year, week } = startDateValue;

      let calendarDates;

      switch (viewType) {
        case CalendarViewTypesEnum.year:
          calendarDates = getYearCalendarDates(year, startDayIndex);
          break;
        case CalendarViewTypesEnum.month:
          calendarDates = [getCalendarDates(year, month, startDayIndex)];
          break;
        case CalendarViewTypesEnum.week:
          calendarDates = [
            getWeekCalendarDates(year, month, week, startDayIndex),
          ];
          break;
        default:
          throw new Error('Unreachable view type');
      }

      return calendarDates;
    };

    const getCurrentCalendarHeader = () => {
      return viewType !== CalendarViewTypesEnum.year
        ? formatMonthYear(startDateValue.month, startDateValue.year)
        : String(startDateValue.year);
    };

    const onPrevButtonClick = () => {
      let { target, week, month, year } = startDateValue;
      const { month: prevMonth, year: yearOfPrevMonth } = getPreviousMonth(
        month,
        year,
      );

      switch (viewType) {
        case CalendarViewTypesEnum.year:
          month = initialMonthIndex;
          week = initialWeekIndex;
          year -= 1;
          break;
        case CalendarViewTypesEnum.month:
          month = prevMonth;
          week = initialWeekIndex;
          year = yearOfPrevMonth;
          break;
        case CalendarViewTypesEnum.week:
          week = week === initialWeekIndex ? weeksInMonth : week - 1;

          if (!week) {
            month = prevMonth;
            year = yearOfPrevMonth;
          }
          break;
        default:
          throw new Error('Unreachable view type');
      }

      setStartDateValue({ month, week, year, target });
    };

    const onNextButtonClick = () => {
      let { target, week, month, year } = startDateValue;
      const { month: nextMonth, year: yearOfNextMonth } = getNextMonth(
        month,
        year,
      );

      switch (viewType) {
        case CalendarViewTypesEnum.year:
          month = initialMonthIndex;
          week = initialWeekIndex;
          year += 1;
          break;
        case CalendarViewTypesEnum.month:
          month = nextMonth;
          week = initialWeekIndex;
          year = yearOfNextMonth;
          break;
        case CalendarViewTypesEnum.week:
          week = week === weeksInMonth ? initialWeekIndex : week + 1;

          if (!week) {
            month = nextMonth;
            year = yearOfNextMonth;
          }
          break;
        default:
          throw new Error('Unreachable view type');
      }

      setStartDateValue({ month, week, year, target });
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

        const isDatesMatching =
          month === targetMonth && day === targetDay && year === targetYear;

        return isDatesMatching;
      }

      return false;
    };

    const isCalendarDayDisabled = (date: IDateItem) => {
      const currentDate = parseDateItemIntoDate(date);

      const isMinValueGreaterThanCurrDate =
        minValue && parseDateItemIntoDate(minValue) > currentDate;

      const isMaxValueLowerThanCurrDate =
        maxValue && currentDate > parseDateItemIntoDate(maxValue);

      const isMonthsDifferent =
        viewType !== CalendarViewTypesEnum.year &&
        date.month !== startDateValue.month;

      if (
        isMinValueGreaterThanCurrDate ||
        isMaxValueLowerThanCurrDate ||
        isMonthsDifferent
      ) {
        return true;
      }

      return false;
    };

    const onCalendarDayClick = useCallback(
      (date: IDateItem) => () => {
        changeDateInputValue(date, DateInputTypesEnum.start);
      },
      [changeDateInputValue],
    );

    return (
      <Calendar
        {...props}
        currentCalendarDates={getCurrentCalendarDates()}
        currentCalendarHeader={getCurrentCalendarHeader()}
        onPrevButtonClick={onPrevButtonClick}
        onNextButtonClick={onNextButtonClick}
        isTargetDay={isCalendarDayTarget}
        isDayDisabled={isCalendarDayDisabled}
        targetDateItem={startDateValue.target}
        onCalendarDayClick={onCalendarDayClick}
      />
    );
  };

  return WithViewComponent;
};
