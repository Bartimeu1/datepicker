import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
} from '@root/types/calendar';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DatePicker } from '.';
import { IDatePickerProps } from './types';

const mockedProps: IDatePickerProps = {
  range: true,
  holidays: true,
  todos: true,
  viewType: CalendarViewTypesEnum.year,
  startDay: CalendarStartDaysEnum.sunday,
};

describe('DatePicker component', () => {
  test('component should render correctly', () => {
    render(<DatePicker />);
  });

  test('component should render correctly with all props', () => {
    render(<DatePicker {...mockedProps} />);
  });

  test('should toggle calendar after button click', () => {
    const { getByTestId } = render(<DatePicker />);

    const openCalendarButton = getByTestId('open-calendar-button');
    expect(openCalendarButton).toBeInTheDocument();
    fireEvent.click(openCalendarButton);

    const calendar = getByTestId('calendar');
    expect(calendar).toBeInTheDocument();
    fireEvent.click(openCalendarButton);
    expect(calendar).not.toBeInTheDocument();
  });

  test('should close calendar after outside click', async () => {
    const { getByTestId } = render(<DatePicker />);

    const openCalendarButton = getByTestId('open-calendar-button');
    expect(openCalendarButton).toBeInTheDocument();
    fireEvent.click(openCalendarButton);

    const calendar = getByTestId('calendar');
    expect(calendar).toBeInTheDocument();

    userEvent.click(document.body);

    await waitFor(() => {
      expect(calendar).not.toBeInTheDocument();
    });
  });

  test('should have two inputs when range is true', () => {
    const { getAllByTestId } = render(<DatePicker range={true} />);

    const dateInputs = getAllByTestId('date-input');
    expect(dateInputs).toHaveLength(2);
  });
});
