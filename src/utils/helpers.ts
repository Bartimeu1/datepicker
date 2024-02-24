import { validateInputValue, formatInputToDateItem } from '@utils/input';
import { generateNewDateItem } from '@utils/calendar';
import { IDateItem } from '@root/types/calendar';

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
