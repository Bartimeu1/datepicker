import { ComponentType, useCallback, useMemo, useState } from 'react';

import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
  DateInputTypesEnum,
  IDateItem,
  IDecoratedCalendarProps,
} from '@root/types/calendar';
import {
  mondayCalendarIndex,
  sundayCalendarIndex,
  weeksInMonth,
} from '@constants/calendar';
import {
  formatMonthYear,
  getCalendarDates,
  getNextMonth,
  getPreviousMonth,
  getWeekCalendarDates,
  getYearCalendarDates,
} from '@utils/calendar';
import { isDateAfter, parseDateItemIntoDate } from '@utils/date';
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

      if (viewType === CalendarViewTypesEnum.year) {
        calendarDates = getYearCalendarDates(year, startDayIndex);
      } else if (viewType === CalendarViewTypesEnum.month) {
        calendarDates = [getCalendarDates(year, month, startDayIndex)];
      } else {
        calendarDates = [
          getWeekCalendarDates(year, month, week, startDayIndex),
        ];
      }

      return calendarDates;
    };

    const getCurrentCalendarHeader = () => {
      return viewType !== CalendarViewTypesEnum.year
        ? formatMonthYear(startDateValue.month, startDateValue.year)
        : String(startDateValue.year);
    };

    const onPrevButtonClick = () => {
      const { target, week, month, year } = startDateValue;
      const previousMonth = getPreviousMonth(month, year);

      let newMonth = month;
      let newWeek = week;
      let newYear = year;

      if (viewType === CalendarViewTypesEnum.week) {
        newWeek = week === 0 ? weeksInMonth : week - 1;
        if (!newWeek) {
          newMonth = previousMonth.month;
          newYear = previousMonth.year;
        }
      } else if (viewType === CalendarViewTypesEnum.month) {
        newMonth = previousMonth.month;
        newWeek = 0;
        newYear = previousMonth.year;
      } else if (viewType === CalendarViewTypesEnum.year) {
        newMonth = 1;
        newWeek = 0;
        newYear -= 1;
      }

      setStartDateValue({
        month: newMonth,
        week: newWeek,
        year: newYear,
        target,
      });
    };

    const onNextButtonClick = () => {
      const { target, week, month, year } = startDateValue;
      const nextMonth = getNextMonth(month, year);

      let newMonth = month;
      let newWeek = week;
      let newYear = year;

      if (viewType === CalendarViewTypesEnum.week) {
        newWeek = week === weeksInMonth ? 0 : week + 1;
        if (!newWeek) {
          newMonth = nextMonth.month;
          newYear = nextMonth.year;
        }
      } else if (viewType === CalendarViewTypesEnum.month) {
        newMonth = nextMonth.month;
        newYear = nextMonth.year;
      } else if (viewType === CalendarViewTypesEnum.year) {
        newMonth = 1;
        newWeek = 0;
        newYear += 1;
      }

      setStartDateValue({
        month: newMonth,
        week: newWeek,
        year: newYear,
        target,
      });
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

    const isCalendarDayDisabled = (date: IDateItem) => {
      const currentDate = parseDateItemIntoDate(date);

      if (
        (minValue &&
          isDateAfter(parseDateItemIntoDate(minValue), currentDate)) ||
        (maxValue &&
          isDateAfter(currentDate, parseDateItemIntoDate(maxValue))) ||
        (viewType !== CalendarViewTypesEnum.year &&
          date.month !== startDateValue.month)
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
