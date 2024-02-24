import { dateRegex } from '@constants/calendar';
import {
  formatValidationText,
  greaterValidationText,
  lowerValidationText,
} from '@constants/text';
import { IDateItem } from '@root/types/calendar';
import { parseDateItemIntoDate, parseInputValueIntoDate } from '@utils/date';

export const formatDateItemToInput = (dateItem: IDateItem) => {
  const dayString = dateItem.day.toString().padStart(2, '0');
  const monthString = dateItem.month.toString().padStart(2, '0');

  return `${dayString}/${monthString}/${dateItem.year}`;
};

export const formatInputToDateItem = (inputDate: string) => {
  const [dayStr, monthStr, yearStr] = inputDate.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);
  const week = Math.floor(day / 7);

  return {
    day,
    week,
    month,
    year,
  };
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

  if (minDateItem && selectedDate < parseDateItemIntoDate(minDateItem)) {
    return `${greaterValidationText} ${formatDateItemToInput(minDateItem)}`;
  }

  if (maxDateItem && selectedDate > parseDateItemIntoDate(maxDateItem)) {
    return `${lowerValidationText} ${formatDateItemToInput(maxDateItem)}`;
  }

  return '';
};
