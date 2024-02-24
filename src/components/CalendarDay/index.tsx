import { memo } from 'react';

import { StyledCalendarDay } from './styled';
import { ICalendarDayProps } from './types';

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
