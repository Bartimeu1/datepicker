import { IDateItem } from '@root/types/calendar';

export const createDate = (day: number, month: number, year: number) => {
  return new Date(`${month}/${day}/${year}`);
};

export const parseInputValueIntoDate = (inputValue: string) => {
  const [day, month, year] = inputValue.split('/').map((part) => Number(part));

  return createDate(day, month, year);
};

export const parseDateItemIntoDate = (dateItem: IDateItem) => {
  const { month, day, year } = dateItem;

  return createDate(day, month, year);
};

export const isDateAfter = (firstDate: Date, secondDate: Date) => {
  return firstDate > secondDate;
};
