import { IDateItem } from '@root/types/calendar';

import { StyledCalendarDay } from './styled';

interface ICalendarDayProps {
  isDisabled: boolean;
  isTarget: boolean;
  isHoliday: boolean | null;
  date: IDateItem;
  onCalendarDayClick: (date: IDateItem) => () => void;
}

export const CalendarDay = ({
  date,
  isDisabled,
  isTarget,
  isHoliday,
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
      $isTarget={isTarget}
      $isHoliday={isHoliday}
      $isDisabled={isDisabled}>
      {date.day}
    </StyledCalendarDay>
  );
};
