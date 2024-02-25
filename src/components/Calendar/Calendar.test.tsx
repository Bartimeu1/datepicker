import { StylingWrapper } from '@components/StylingWrapper';
import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
  ICalendarProps,
  IDateItem,
  IDecoratedCalendarProps,
} from '@root/types/calendar';
import { fireEvent, render } from '@testing-library/react';
import { formatMonthYear,getCalendarDates } from '@utils/calendar';

import { DecoratedCalendar } from '.';

const mockedDateItem: IDateItem = {
  year: 2024,
  month: 1,
  day: 1,
};

const { year, month } = mockedDateItem;

const calendarProps: ICalendarProps = {
  minValue: undefined,
  maxValue: undefined,
  range: false,
  todos: false,
  holidays: false,
  startDateInputValue: '',
  endDateInputValue: '',
  startDay: CalendarStartDaysEnum.monday,
  viewType: CalendarViewTypesEnum.month,
  changeDateInputValue: jest.fn(),
};

const decoratedCalendarProps: IDecoratedCalendarProps = {
  ...calendarProps,
  onCalendarDayClick: jest.fn(),
  onRangeCalendarDayClick: jest.fn(),
  isDayDisabled: jest.fn(),
  isTargetDay: jest.fn(),
  isTargetEndDay: jest.fn(),
  isDayInRange: jest.fn(),
  checkIfHoliday: jest.fn(),
  onPrevButtonClick: jest.fn(),
  onNextButtonClick: jest.fn(),
  currentCalendarDates: [getCalendarDates(year, month, 0)],
  currentCalendarHeader: formatMonthYear(month, year),
  targetDateItem: mockedDateItem,
  isTodoModalVisible: false,
  toggleTodoModal: jest.fn(),
  closeTodoModal: jest.fn(),
  targetEndDateItem: null,
};

describe('DecoratedCalendar component', () => {
  test('component should render correctly', () => {
    render(<DecoratedCalendar {...decoratedCalendarProps} />, {
      wrapper: StylingWrapper,
    });
  });

  test('should change dates after prev button click', () => {
    const { getByTestId } = render(
      <DecoratedCalendar {...decoratedCalendarProps} />,
      {
        wrapper: StylingWrapper,
      },
    );

    const prevButton = getByTestId('calendar-prev-button');
    const calendarHeader = getByTestId('calendar-header');
    expect(calendarHeader).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();

    expect(calendarHeader).toHaveTextContent(formatMonthYear(month + 1, year));
    fireEvent.click(prevButton);
    expect(calendarHeader).toHaveTextContent(formatMonthYear(month, year));
  });

  test('should change dates after next button click', () => {
    const { getByTestId } = render(
      <DecoratedCalendar {...decoratedCalendarProps} />,
      {
        wrapper: StylingWrapper,
      },
    );

    const nextButton = getByTestId('calendar-next-button');
    const calendarHeader = getByTestId('calendar-header');
    expect(nextButton).toBeInTheDocument();

    expect(calendarHeader).toHaveTextContent(formatMonthYear(month + 1, year));
    fireEvent.click(nextButton);
    expect(calendarHeader).toHaveTextContent(formatMonthYear(month + 2, year));
  });
  
  test('should show only one month when view type is month', () => {
    const { getAllByTestId } = render(
      <DecoratedCalendar
        {...decoratedCalendarProps}
        viewType={CalendarViewTypesEnum.month}
      />,
      {
        wrapper: StylingWrapper,
      },
    );

    const calendarMonth = getAllByTestId('calendar-month');
    expect(calendarMonth.length).toBe(1);
  });

  test('should show twelve months when view type is year', () => {
    const { getAllByTestId } = render(
      <DecoratedCalendar
        {...decoratedCalendarProps}
        viewType={CalendarViewTypesEnum.year}
      />,
      {
        wrapper: StylingWrapper,
      },
    );

    const calendarMonth = getAllByTestId('calendar-month');
    expect(calendarMonth.length).toBe(12);
  });

  test('should show seven days when view type is week', () => {
    const { getAllByTestId } = render(
      <DecoratedCalendar
        {...decoratedCalendarProps}
        viewType={CalendarViewTypesEnum.week}
      />,
      {
        wrapper: StylingWrapper,
      },
    );

    const calendarDays = getAllByTestId('calendar-day');
    expect(calendarDays.length).toBe(7);
  });
});
