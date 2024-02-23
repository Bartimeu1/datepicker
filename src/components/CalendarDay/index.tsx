import { memo } from 'react';

import { IDateItem } from '@root/types/calendar';

import { StyledCalendarDay } from './styled';

interface ICalendarDayProps {
  isDisabled: boolean;
  isTarget: boolean;
  range: boolean;
  isTargetEnd: boolean | null;
  isHoliday: boolean | null;
  isInRange: boolean;
  toggleTodoModal: () => void;
  date: IDateItem;
  onCalendarDayClick: (date: IDateItem) => () => void;
}

export const CalendarDay = memo(function CalendarDay({
  date,
  isDisabled,
  isTarget,
  isTargetEnd,
  isHoliday,
  isInRange,
  range,
  toggleTodoModal,
  onCalendarDayClick,
}: ICalendarDayProps) {
  const handleClick = () => {
    if (!isDisabled) {
      onCalendarDayClick(date)();
    }
  };

  const handleDoubleClick = () => {
    if (!isDisabled) {
      toggleTodoModal();
    }
  };

  return (
    <StyledCalendarDay
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      $range={range}
      $isTarget={isTarget}
      $isHoliday={isHoliday}
      $isInRange={isInRange}
      $isTargetEnd={isTargetEnd}
      $isDisabled={isDisabled}>
      {date.day}
    </StyledCalendarDay>
  );
});
