import { memo, useRef,useState } from 'react';

import { Tooltip } from '@components/Tooltip';

import { CalendarDayWrapper, StyledCalendarDay } from './styled';
import { ICalendarDayProps, tooltipRefTypes } from './types';

export const CalendarDay = memo(function CalendarDay({
  date,
  isDisabled,
  isTarget,
  isTargetEnd,
  isHoliday,
  isInRange,
  range,
  todos,
  toggleTodoModal,
  onCalendarDayClick,
}: ICalendarDayProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipRef = useRef<tooltipRefTypes>(null);

  const handleMouseIn = () => {
    tooltipRef.current = setTimeout(() => {
      setIsTooltipVisible(true);
    }, 700);
  };

  const handleMouseLeave = () => {
    if (tooltipRef.current) {
      setIsTooltipVisible(false);
      clearTimeout(tooltipRef.current);
    }
  };

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
    <CalendarDayWrapper>
      <StyledCalendarDay
        data-testid="calendar-day"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseIn}
        onMouseLeave={handleMouseLeave}
        $range={range}
        $isTarget={isTarget}
        $isHoliday={isHoliday}
        $isInRange={isInRange}
        $isTargetEnd={isTargetEnd}
        $isDisabled={isDisabled}>
        {date.day}
      </StyledCalendarDay>
      {todos && isTooltipVisible && (
        <Tooltip text="Double-click to open todo modal" />
      )}
    </CalendarDayWrapper>
  );
});
