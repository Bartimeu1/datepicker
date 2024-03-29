import { FlexMixin } from '@root/GlobalStyles';
import styled, { css } from 'styled-components';

import { IStyledCalendarDay } from './types';

export const CalendarDayWrapper = styled.div`
  position: relative;
`;

export const StyledCalendarDay = styled.div<IStyledCalendarDay>`
  ${FlexMixin({ align: 'center', justify: 'center' })};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  width: 14%;
  height: 32px;
  min-width: 32px;

  ${({ $isDisabled }) => $isDisabled && disabledStyles};
  ${({ $isHoliday }) => $isHoliday && holidayStyles};
  ${({ $isInRange }) => $isInRange && inRangeStyles};
  ${({ $isTargetEnd }) => $isTargetEnd && targetEndStyles};
  ${({ $isTarget, $range }) =>
    $isTarget && $range ? rangeStyles : $isTarget ? targetStyles : ''};
`;

const disabledStyles = css`
  color: ${({ theme }) => theme.color.disabled};
`;

const holidayStyles = css`
  background: ${({ theme }) => theme.color.holiday};
  color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const inRangeStyles = css`
  background-color: ${({ theme }) => theme.color.insideRange};
  color: ${({ theme }) => theme.color.selected};
`;

const targetEndStyles = css`
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.selected};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const targetStyles = css`
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.selected};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

const rangeStyles = css`
  background-color: ${({ theme }) => theme.color.range};
  color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.md}px 0 0
    ${({ theme }) => theme.borderRadius.md}px;
`;
