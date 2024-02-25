import { IDateItem } from '@root/types/calendar';
import { formatInputToDateItem,validateInputValue } from '@root/utils/formatting';
import { generateNewDateItem } from '@utils/calendar';

export const syncInputWithDateItem = (
  inputValue: string,
  minValue?: IDateItem,
  maxValue?: IDateItem,
) => {
  const isInputValueValid = !validateInputValue(inputValue, minValue, maxValue);

  return isInputValueValid ? formatInputToDateItem(inputValue) : null;
};

export const syncInputWithState = (
  inputValue: string,
  minValue?: IDateItem,
  maxValue?: IDateItem,
) => {
  const inputDate = syncInputWithDateItem(inputValue, minValue, maxValue);
  const chosenDate = inputDate ? inputDate : generateNewDateItem();

  return {
    target: inputDate,
    week: chosenDate.week,
    month: chosenDate.month,
    year: chosenDate.year,
  };
};
