import { ComponentType, useCallback, useEffect, useState } from 'react';

import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
  DateInputTypesEnum,
  IDateItem,
  IDecoratedCalendarProps,
} from '@root/types/calendar';
import {
  formatMonthYear,
  generateNewDateItem,
  getCalendarDates,
  getNextMonth,
  getPreviousMonth,
  getWeekCalendarDates,
  getYearCalendarDates,
} from '@utils/calendar';
import { isDateAfter, parseDateItemIntoDate } from '@utils/date';
import { formatInputToDateItem, validateInputValue } from '@utils/input';

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
      startDateInputValue,
      endDateInputValue,
      changeDateInputValue,
      viewType,
      startDay,
      minValue,
      maxValue,
      range,
    } = props;

    const syncDateWithState = useCallback(
      (inputValue: string) => {
        const isInputValueValid = !validateInputValue(
          inputValue,
          minValue,
          maxValue,
        );
        const inputDate = formatInputToDateItem(inputValue);
        const chosenDate = isInputValueValid
          ? inputDate
          : generateNewDateItem();

        return {
          target: isInputValueValid ? inputDate : null,
          week: chosenDate.week,
          month: chosenDate.month,
          year: chosenDate.year,
        };
      },
      [maxValue, minValue],
    );

    const [startDateValue, setStartDateValue] = useState<IDateValueState>(
      syncDateWithState(startDateInputValue),
    );

    const [endDateValue, setEndDateValue] = useState<IDateValueState>(
      syncDateWithState(endDateInputValue),
    );

    useEffect(() => {
      setStartDateValue(syncDateWithState(startDateInputValue));
    }, [startDateInputValue, syncDateWithState]);

    useEffect(() => {
      setEndDateValue(syncDateWithState(endDateInputValue));
    }, [endDateInputValue, syncDateWithState]);

    const startDayIndex = startDay === CalendarStartDaysEnum.monday ? 1 : 0;

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
        newWeek = week === 0 ? 4 : week - 1;
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
        newWeek = week === 4 ? 0 : week + 1;
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

    const isTargetEnd = (date: IDateItem) => {
      const { target: targetDate } = endDateValue;

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
          date.month !== startDateValue.month) ||
        date.month !== startDateValue.month ||
        date.year !== startDateValue.year
      ) {
        return true;
      }

      return false;
    };

    const isDayInRange = (date: IDateItem) => {
      const { target: startDayTarget } = startDateValue;
      const { target: endDayTarget } = endDateValue;

      if (startDayTarget && endDayTarget) {
        const currentDate = parseDateItemIntoDate(date);
        const startDate = parseDateItemIntoDate(startDayTarget);
        const endDate = parseDateItemIntoDate(endDayTarget);

        return currentDate > startDate && currentDate < endDate;
      }

      return false;
    };

    const onRangeCalendarDayClick = (date: IDateItem) => () => {
      const selectedDate = parseDateItemIntoDate(date);
      const { target: startDate } = startDateValue;
      const { target: endDate } = endDateValue;

      if (!startDate || (startDate && endDate)) {
        changeDateInputValue(date, DateInputTypesEnum.start);
        changeDateInputValue(null, DateInputTypesEnum.end);
      } else if (isDateAfter(selectedDate, parseDateItemIntoDate(startDate))) {
        changeDateInputValue(date, DateInputTypesEnum.end);
      } else {
        changeDateInputValue(date, DateInputTypesEnum.start);
        changeDateInputValue(startDate, DateInputTypesEnum.end);
      }
    };

    const onCalendarDayClick = (date: IDateItem) => () => {
      changeDateInputValue(date, DateInputTypesEnum.start);
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
        targetDateItem={startDateValue.target}
        onCalendarDayClick={
          range ? onRangeCalendarDayClick : onCalendarDayClick
        }
      />
    );
  };

  return WithViewComponent;
};
