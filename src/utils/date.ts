import { monthsInYear } from '@constants/calendar';
import { IDateItem } from '@root/types/calendar';
import { getDateFormattedString } from '@utils/formatting';

export const createDate = (day: number, month: number, year: number) => {
  return new Date(getDateFormattedString(month, day, year));
};

export const parseInputValueIntoDate = (inputValue: string) => {
  const [dayStr, monthStr, yearStr] = inputValue.split('/');
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  return createDate(day, month, year);
};

export const parseDateItemIntoDate = (dateItem: IDateItem) => {
  const { month, day, year } = dateItem;

  return createDate(day, month, year);
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay();
};

export const getPreviousMonthAndYear = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : monthsInYear;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonthAndYear = (month: number, year: number) => {
  const nextMonth = month < monthsInYear ? month + 1 : 1;
  const nextMonthYear = month < monthsInYear ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};
