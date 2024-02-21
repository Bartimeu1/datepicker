import { FlexMixin } from '@utils/mixins';
import styled from 'styled-components';

interface IStyledCalendarDay {
  $isDisabled: boolean;
  $isTarget: boolean;
  $range: boolean;
  $isInRange: boolean;
  $isTargetEnd: boolean | null;
  $isHoliday: boolean | null;
}

export const StyledCalendarDay = styled.div<IStyledCalendarDay>`
  ${FlexMixin({ align: 'center', justify: 'center' })};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  flex: 0 0 14%;
  height: 32px;

  ${({ $isDisabled, theme }) =>
    $isDisabled &&
    `
    color: ${theme.color.disabled};
  `};

  ${({ $isHoliday, theme }) =>
    $isHoliday &&
    `
    background: ${theme.color.holiday};
  `};

  ${({ $isInRange, theme }) =>
    $isInRange &&
    `
    background-color: rgba(47, 128, 237, 0.1);
    color: ${theme.color.selected};
  `};

  ${({ $isTargetEnd, theme }) =>
    $isTargetEnd &&
    `
    color: ${theme.color.white};
    background: ${theme.color.selected};
    border-top-right-radius: ${theme.borderRadius.md}px;
    border-bottom-right-radius: ${theme.borderRadius.md}px;
  `};

  ${({ $isTarget, $range, theme }) =>
    $isTarget &&
    `color: ${theme.color.white};
    background: ${theme.color.selected};
    ${
      $range &&
      `
      background-color: rgba(47, 128, 237, 0.6);
      border-top-left-radius: ${theme.borderRadius.md}px;
      border-bottom-left-radius: ${theme.borderRadius.md}px;
    `
    }
    `}
`;
