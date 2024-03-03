import { calendarMonth, daysInWeek } from '@constants/calendar';
import { dateRegex, lettersRegex } from '@constants/regex';
import {
  formatValidationText,
  greaterValidationText,
  lowerValidationText,
} from '@constants/text';
import { IDateItem } from '@root/types/calendar';
import { parseDateItemIntoDate, parseInputValueIntoDate } from '@utils/date';

export const getDateFormattedString = (
  day: string | number,
  month: string | number,
  year: string | number,
) => {
  return `${day}/${month}/${year}`;
};

export const formatDateItemIntoInput = (dateItem: IDateItem | null) => {
  if (dateItem) {
    const dayString = dateItem.day.toString().padStart(2, '0');
    const monthString = dateItem.month.toString().padStart(2, '0');

    return getDateFormattedString(dayString, monthString, dateItem.year);
  }
  return '';
};

export const formatInputValueIntoDateItem = (inputDate: string) => {
  const [dayStr, monthStr, yearStr] = inputDate.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  const week = Math.floor(day / daysInWeek);

  return {
    day,
    week,
    month,
    year,
  };
};

export const formatCalendarHeader = (month: number, year: number) => {
  const monthObject = calendarMonth.find((item) => item.id === month);

  return `${monthObject?.fullName} ${year}`;
};

export const validateInputValue = (
  inputValue: string,
  minDateItem?: IDateItem | null,
  maxDateItem?: IDateItem | null,
) => {
  if (!dateRegex.test(inputValue)) {
    return formatValidationText;
  }

  const selectedDate = parseInputValueIntoDate(inputValue);
  const isSelectedDateLowerThanMinDate =
    minDateItem && selectedDate < parseDateItemIntoDate(minDateItem);
  const isSelectedDateGreaterThanMaxDate =
    maxDateItem && selectedDate > parseDateItemIntoDate(maxDateItem);

  if (isSelectedDateLowerThanMinDate) {
    return `${greaterValidationText} ${formatDateItemIntoInput(minDateItem)}`;
  }

  if (isSelectedDateGreaterThanMaxDate) {
    return `${lowerValidationText} ${formatDateItemIntoInput(maxDateItem)}`;
  }

  return '';
};

export const applyDateMask = (value: string) => {
  const filteredValue = value.replace(lettersRegex, '');
  const valueLength = filteredValue.length;

  if (valueLength <= 2) {
    return filteredValue;
  } else if (valueLength <= 4) {
    return `${filteredValue.slice(0, 2)}/${filteredValue.slice(2)}`;
  } else {
    return `${filteredValue.slice(0, 2)}/${filteredValue.slice(2, 4)}/${filteredValue.slice(4, 8)}`;
  }
};
