import { FlexMixin } from '@root/GlobalStyles';
import styled, { css } from 'styled-components';

import { IStyledCalendarDay } from './types';

export const StyledCalendarDay = styled.div<IStyledCalendarDay>`
  ${FlexMixin({ align: 'center', justify: 'center' })};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  flex: 0 0 14%;
  height: 32px;

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
  background-color: rgba(47, 128, 237, 0.1);
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
  background-color: rgba(47, 128, 237, 0.6);
  color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.md}px 0 0
    ${({ theme }) => theme.borderRadius.md}px;
`;
