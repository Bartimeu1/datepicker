import { ComponentType,useEffect, useState } from 'react';

import { IDateItem, IDecoratedCalendarProps } from '@root/types/calendar';
import {
  convertInputToDateItem,
  formatMonthYear,
  getCalendarDates,
  getCurrentDateItem,
  isValidDateItem,
} from '@utils/helpers';
import { getNextMonth, getPreviousMonth } from '@utils/helpers';

interface IDateValueState {
  target: IDateItem | null;
  month: number;
  year: number;
}

export const WithView = (Calendar: ComponentType<IDecoratedCalendarProps>) => {
  const WithViewComponent = (props: IDecoratedCalendarProps) => {
    const { dateInputValue, changeDateInputValue } = props;

    const syncDateWithState = (inputValue: string) => {
      const inputDate = convertInputToDateItem(inputValue);
      const isInputDateValid = isValidDateItem(inputDate);
      const chosenDate = isInputDateValid ? inputDate : getCurrentDateItem();

      return {
        target: isInputDateValid ? inputDate : null,
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
      const { month, year } = dateValue;

      const calendarMonth = month;
      const calendarYear = year;
      return getCalendarDates(calendarYear, calendarMonth);
    };

    const getCurrentCalendarHeader = () => {
      return formatMonthYear(dateValue.month, dateValue.year);
    };

    const onPrevButtonClick = () => {
      const { target, month, year } = dateValue;
      const previousMonth = getPreviousMonth(month, year);
      setDateValue({
        month: previousMonth.month,
        year: previousMonth.year,
        target: target,
      });
    };

    const onNextButtonClick = () => {
      const { target, month, year } = dateValue;
      const nextMonth = getNextMonth(month, year);

      setDateValue({
        month: nextMonth.month,
        year: nextMonth.year,
        target: target,
      });
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
