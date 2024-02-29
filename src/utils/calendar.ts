import { calendarWeeks, monthsInYear } from '@constants/calendar';
import { daysInWeek } from '@constants/calendar';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getNextMonthAndYear,
  getPreviousMonthAndYear,
} from '@utils/date';
import { v1 as uuidv1 } from 'uuid';

export const generateNewDateItem = () => {
  const currentDate = new Date();

  return {
    id: uuidv1(),
    year: currentDate.getFullYear(),
    week: Math.ceil(currentDate.getDate() / daysInWeek),
    month: currentDate.getMonth() + 1,
  };
};

const generateMonthDates = (
  length: number,
  month: number,
  year: number,
  offset: number = 0,
) => {
  return Array.from({ length }, (_, index) => {
    const dayValue = index + 1 + offset;
    return {
      id: uuidv1(),
      day: dayValue,
      month: month,
      year: year,
    };
  });
};

export const getCalendarDates = (
  year: number,
  month: number,
  startDayIndex: number,
) => {
  const currentMonthFirstDay = getFirstDayOfMonth(year, month) + 1;
  let daysFromPrevMonth = currentMonthFirstDay - startDayIndex - 1;

  daysFromPrevMonth = daysFromPrevMonth < 0 ? calendarWeeks : daysFromPrevMonth;

  const currentMonthDays = getDaysInMonth(year, month);
  const nextMonthDays =
    calendarWeeks * daysInWeek - (daysFromPrevMonth + currentMonthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonthAndYear(
    month,
    year,
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonthAndYear(
    month,
    year,
  );

  const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonth);

  const prevMonthDates = generateMonthDates(
    daysFromPrevMonth,
    prevMonth,
    prevMonthYear,
    prevMonthDays - daysFromPrevMonth,
  );

  const currentMonthDates = generateMonthDates(currentMonthDays, month, year);

  const nextMonthDates = generateMonthDates(
    nextMonthDays,
    nextMonth,
    nextMonthYear,
  );

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const getWeekCalendarDates = (
  year: number,
  month: number,
  week: number,
  startDayIndex: number,
) => {
  const currentMonthDays = getCalendarDates(year, month, startDayIndex);

  const startIndex = week * daysInWeek;
  const endIndex = startIndex + daysInWeek;

  return currentMonthDays.slice(startIndex, endIndex);
};

export const getYearCalendarDates = (year: number, startDayIndex: number) => {
  const yearCalendarDates = Array.from({ length: monthsInYear }, (_, index) => {
    const month = index + 1;
    return getCalendarDates(year, month, startDayIndex);
  });

  return yearCalendarDates;
};
