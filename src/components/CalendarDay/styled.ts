import { FlexMixin } from '@utils/mixins';
import styled from 'styled-components';

interface IStyledCalendarDay {
  $isDisabled: boolean;
  $isTarget: boolean;
  $isHoliday: boolean | null;
}

export const StyledCalendarDay = styled.div<IStyledCalendarDay>`
  ${FlexMixin({ align: 'center', justify: 'center' })};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  flex: 0 0 14%;
  height: 32px;
  color: ${({ $isDisabled, theme }) => $isDisabled && theme.color.disabled};
  background: ${({ $isTarget, $isHoliday, theme }) =>
    $isTarget
      ? theme.color.selected
      : $isHoliday
        ? theme.color.holiday
        : 'inherit'};

  ${({ $isTarget, $isHoliday, theme }) =>
    ($isTarget || $isHoliday) &&
    `
    color: ${theme.color.white};
    border-radius: ${theme.borderRadius.md}px;
  `}
`;
