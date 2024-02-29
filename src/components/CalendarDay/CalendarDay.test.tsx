import { ConfigProvider } from '@components/ConfigProvider';
import { fireEvent, render } from '@testing-library/react';

import { CalendarDay } from '.';
import { ICalendarDayProps } from './types';

const mockedDate = { year: 2024, day: 1, month: 1 };

const mockedProps: ICalendarDayProps = {
  todos: false,
  isDisabled: false,
  isHoliday: false,
  isInRange: false,
  isTarget: false,
  isTargetEnd: false,
  range: false,
  date: mockedDate,
  toggleTodoModal: jest.fn(() => jest.fn()),
  onCalendarDayClick: jest.fn(() => jest.fn()),
};

describe('CalendarDay component', () => {
  test('component should render correctly', () => {
    render(<CalendarDay {...mockedProps} />, { wrapper: ConfigProvider });
  });

  test('should not act when disabled', () => {
    const { getByTestId } = render(
      <CalendarDay {...mockedProps} isDisabled={true} />,
      {
        wrapper: ConfigProvider,
      },
    );

    const calendarDay = getByTestId('calendar-day');
    fireEvent.click(calendarDay);

    expect(mockedProps.onCalendarDayClick).not.toHaveBeenCalled();
  });

  test('should call onCalendarDayClick with correct date when clicked', () => {
    const { getByTestId } = render(<CalendarDay {...mockedProps} />, {
      wrapper: ConfigProvider,
    });

    const calendarDay = getByTestId('calendar-day');
    expect(calendarDay).toBeInTheDocument();

    fireEvent.click(calendarDay);

    expect(mockedProps.onCalendarDayClick).toHaveBeenCalledWith(mockedDate);
  });

  test('should toggle todo modal after double click', () => {
    const { getByTestId } = render(<CalendarDay {...mockedProps} />, {
      wrapper: ConfigProvider,
    });

    const calendarDay = getByTestId('calendar-day');
    expect(calendarDay).toBeInTheDocument();

    fireEvent.doubleClick(calendarDay);

    expect(mockedProps.onCalendarDayClick).toHaveBeenCalledWith(mockedDate);
  });
});
