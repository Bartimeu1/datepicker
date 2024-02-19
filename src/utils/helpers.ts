import { calendarMonth, calendarWeeks } from '@constants/calendar';
import { IDateItem } from '@root/types/calendar';

export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};

export const getCurrentDateItem = () => {
  const currentDate = new Date();

  return {
    year: currentDate.getFullYear(),
    week: Math.ceil(currentDate.getDate() / 7),
    month: currentDate.getMonth() + 1,
  };
};

// const generateDatesArray = (length: number, month: number, year: number) => {
//   return Array.from({ length }, (_, index) => {
//     const dayValue = index + 1;
//     return {
//       day: dayValue,
//       month: month,
//       year: year,
//     };
//   });
// };

export const isValidDateItem = (dateItem: IDateItem) => {
  const { day, month, year } = dateItem;
  const inputDate = new Date(year, month, day);

  return inputDate instanceof Date && !isNaN(inputDate.valueOf());
};

export const convertInputToDateItem = (inputDate: string) => {
  const dateParts = inputDate.split('/');
  const day = Number(dateParts[0]);
  const month = Number(dateParts[1]);
  const year = Number(dateParts[2]);
  const week = Math.floor(day / 7);

  return {
    day,
    week,
    month,
    year,
  };
};

export const convertDateItemToInputFormat = (dateItem: IDateItem) => {
  const dayString = dateItem.day.toString().padStart(2, '0');
  const monthString = dateItem.month.toString().padStart(2, '0');
  return `${dayString}/${monthString}/${dateItem.year}`;
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

export const getCalendarDates = (
  year: number,
  month: number,
  startDayIndex: number,
) => {
  const currentMonthFirstDay = getFirstDayOfMonth(year, month) + 1;
  const daysFromPrevMonth = currentMonthFirstDay - startDayIndex - 1;

  const currentMonthDays = getDaysInMonth(year, month);
  const nextMonthDays =
    calendarWeeks * 7 - (daysFromPrevMonth + currentMonthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year,
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonth);

  const prevMonthDates = Array.from(
    { length: daysFromPrevMonth },
    (_, index) => {
      const dayValue = index + 1 + (prevMonthDays - daysFromPrevMonth);
      return {
        day: dayValue,
        month: prevMonth,
        year: prevMonthYear,
      };
    },
  );

  const currentMonthDates = Array.from(
    { length: currentMonthDays },
    (_, index) => {
      const dayValue = index + 1;
      return {
        day: dayValue,
        month: month,
        year: year,
      };
    },
  );

  const nextMonthDates = Array.from({ length: nextMonthDays }, (_, index) => {
    const dayValue = index + 1;
    return {
      day: dayValue,
      month: nextMonth,
      year: nextMonthYear,
    };
  });

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const getWeekCalendarDates = (
  year: number,
  month: number,
  week: number,
  startDayIndex: number,
) => {
  const currentMonthDays = getCalendarDates(year, month, startDayIndex);

  const startIndex = week * 7;
  const endIndex = startIndex + 7;

  return currentMonthDays.slice(startIndex, endIndex);
};

export const getYearCalendarDates = (year: number, startDayIndex: number) => {
  const yearCalendarDates = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return getCalendarDates(year, month, startDayIndex);
  });
  return yearCalendarDates;
};
