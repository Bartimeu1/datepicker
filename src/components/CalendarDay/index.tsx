import { IDateItem } from '@root/types/calendar';

import { StyledCalendarDay } from './styled';

interface ICalendarDayProps {
  isDisabled: boolean;
  isTarget: boolean;
  range: boolean;
  isTargetEnd: boolean | null;
  isHoliday: boolean | null;
  isInRange: boolean;
  onDoubleClick: () => () => void;
  date: IDateItem;
  onCalendarDayClick: (date: IDateItem) => () => void;
}

export const CalendarDay = ({
  date,
  isDisabled,
  isTarget,
  isTargetEnd,
  isHoliday,
  isInRange,
  range,
  onDoubleClick,
  onCalendarDayClick,
}: ICalendarDayProps) => {
  const handleClick = () => {
    if (!isDisabled) {
      onCalendarDayClick(date)();
    }
  };

  const handleDoubleClick = () => {
    if (!isDisabled) {
      onDoubleClick()();
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
};
