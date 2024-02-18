import { FlexMixin } from '@utils/mixins';
import styled from 'styled-components';

interface ICalendarButton {
  $isCalendarVisible: boolean;
}

export const StyledDatePicker = styled.div``;

export const InputWrapper = styled.div`
  ${FlexMixin({ align: 'center' })}

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  max-width: 250px;
  padding: 13px 0 13px 16px;
  position: relative;
`;

export const DateInput = styled.input`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  border: none;
  margin-left: 8px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.placeholder};
  }
`;

export const CalendarButton = styled.button<ICalendarButton>`
  & path {
    transition: 0.2s;
    fill: ${({ $isCalendarVisible, theme }) =>
      $isCalendarVisible ? theme.color.black : 'auto'};
  }

  &:hover {
    & path {
      fill: ${({ theme }) => theme.color.black};
    }
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translate(0, -50%);

  & path {
    transition: 0.2s;
  }

  &:hover {
    & path {
      transition: 0.2s;
      fill: ${({ theme }) => theme.color.black};
    }
  }
`;
