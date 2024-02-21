import { IDateItem } from '@root/types/calendar';

import { StyledCalendarDay } from './styled';

interface ICalendarDayProps {
  isDisabled: boolean;
  isTarget: boolean;
  range: boolean;
  isTargetEnd: boolean | null;
  isHoliday: boolean | null;
  isInRange: boolean;
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
  onCalendarDayClick,
}: ICalendarDayProps) => {
  const handleClick = () => {
    if (!isDisabled) {
      onCalendarDayClick(date)();
    }
  };

  return (
    <StyledCalendarDay
      onClick={handleClick}
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
