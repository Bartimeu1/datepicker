import { ConfigProvider } from '@components/ConfigProvider';
import {
  formatValidationText,
  greaterValidationText,
  lowerValidationText,
} from '@constants/text';
import { fireEvent, render } from '@testing-library/react';
import { formatDateItemIntoInput } from '@utils/formatting';

import { InputField } from '.';
import { IInputFieldProps } from './types';

const mockedProps: IInputFieldProps = {
  minValue: undefined,
  maxValue: undefined,
  label: 'Date',
  dateInputValue: '',
  isCalendarVisible: false,
  setInputValue: jest.fn(),
  onCalendarIconClick: jest.fn(),
  onChange: jest.fn(),
};

const mockedInputDate = '01/01/2024';
const currentDate = new Date();
const mockedInputDateItem = {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth(),
  day: currentDate.getDate(),
};

describe('InputField component', () => {
  test('component should render correctly', () => {
    render(<InputField {...mockedProps} />, { wrapper: ConfigProvider });
  });

  test('date input should change value correctly', () => {
    const { getByTestId } = render(<InputField {...mockedProps} />, {
      wrapper: ConfigProvider,
    });

    const dateInput = getByTestId('date-input');

    expect(dateInput).toBeInTheDocument();
    fireEvent.change(dateInput, { target: { value: mockedInputDate } });

    expect(mockedProps.setInputValue).toHaveBeenCalledWith(mockedInputDate);
  });

  test('input clear button should work correctly', () => {
    const { getByTestId } = render(
      <InputField {...mockedProps} dateInputValue={mockedInputDate} />,
      {
        wrapper: ConfigProvider,
      },
    );

    const clearButton = getByTestId('clear-input-button');
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);

    expect(mockedProps.setInputValue).toHaveBeenCalledWith('');
  });

  test('input should validate incorrect format', () => {
    const { getByTestId } = render(
      <InputField {...mockedProps} dateInputValue="incorrectFormat" />,
      {
        wrapper: ConfigProvider,
      },
    );

    const validationText = getByTestId('validation-text');
    expect(validationText).toHaveTextContent(formatValidationText);
  });

  test('input should validate a date less than the minValue prop', () => {
    const { getByTestId } = render(
      <InputField
        {...mockedProps}
        dateInputValue="01/01/2023"
        minValue={mockedInputDateItem}
      />,
      {
        wrapper: ConfigProvider,
      },
    );

    const validationText = getByTestId('validation-text');
    expect(validationText).toHaveTextContent(
      `${greaterValidationText} ${formatDateItemIntoInput(mockedInputDateItem)}`,
    );
  });

  test('input should validate a date greater than the maxValue prop', () => {
    const { getByTestId } = render(
      <InputField
        {...mockedProps}
        dateInputValue="01/01/2025"
        maxValue={mockedInputDateItem}
      />,
      {
        wrapper: ConfigProvider,
      },
    );

    const validationText = getByTestId('validation-text');
    expect(validationText).toHaveTextContent(
      `${lowerValidationText} ${formatDateItemIntoInput(mockedInputDateItem)}`,
    );
  });
});
