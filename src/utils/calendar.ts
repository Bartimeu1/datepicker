import {
  calendarMonth,
  calendarWeeks,
  monthsInYear,
} from '@constants/calendar';
import { daysInWeek } from '@constants/calendar';
import { v1 as uuidv1 } from 'uuid';

export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : monthsInYear;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < monthsInYear ? month + 1 : 1;
  const nextMonthYear = month < monthsInYear ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

export const generateNewDateItem = () => {
  const currentDate = new Date();

  return {
    id: uuidv1(),
    year: currentDate.getFullYear(),
    week: Math.ceil(currentDate.getDate() / daysInWeek),
    month: currentDate.getMonth() + 1,
  };
};

export const formatMonthYear = (month: number, year: number) => {
  const monthObject = calendarMonth.find((item) => item.id === month);

  return `${monthObject?.fullName} ${year}`;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month - 1, 1).getDay();
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

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year,
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

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
