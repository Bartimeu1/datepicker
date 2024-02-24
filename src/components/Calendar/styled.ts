import { FlexMixin } from '@root/GlobalStyles';
import styled from 'styled-components';

import { IStyledCalendar } from './types';

export const StyledCalendar = styled.div<IStyledCalendar>`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: 15px 10px 10px 10px;
  max-width: 250px;

  ${({ $isYearDisplay }) =>
    $isYearDisplay &&
    `
    max-width: 1100px;
  `};
`;

export const WeekdayName = styled.div`
  ${FlexMixin({ align: 'center', justify: 'center' })}

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  flex: 0 0 14%;
  height: 32px;
`;

export const CalendarHeader = styled.p`
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const CalendarControls = styled.div`
  ${FlexMixin({ align: 'center', justify: 'space-between' })}

  margin-bottom: 7px;
`;

export const ControlsButton = styled.button``;

export const CalendarWeeks = styled.div`
  ${FlexMixin({ align: 'center', direction: 'row', justify: 'space-between' })}
`;

export const CalendarDays = styled.div`
  ${FlexMixin({ align: 'center', wrap: 'wrap', justify: 'space-between' })}
`;

export const CalendarDisplay = styled.div<IStyledCalendar>`
  ${FlexMixin({
    align: 'center',
    justify: 'space-between',
    wrap: 'wrap',
  })};

  margin-bottom: -10px;

  ${({ $isYearDisplay }) =>
    !$isYearDisplay &&
    `
    display: block;
  `}
`;

export const CalendarMonth = styled.div`
  ${FlexMixin({
    direction: 'column',
  })};

  max-width: 250px;
  margin-bottom: 10px;
`;

export const MonthTitle = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
