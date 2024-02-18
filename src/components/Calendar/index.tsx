import { ReactComponent as ChevronNext } from '@assets/images/chevronNext.svg';
import { ReactComponent as ChevronPrev } from '@assets/images/chevronPrev.svg';
import { CalendarDay } from '@components/CalendarDay';
import { weekDays } from '@constants/calendar';
import { IDecoratedCalendarProps } from '@root/types/calendar';
import { CalendarDecorator } from '@services/CalendarDecorator';

import {
  CalendarControls,
  CalendarDays,
  CalendarHeader,
  CalendarWeeks,
  ControlsButton,
  StyledCalendar,
  WeekdayName,
} from './styled';

const Calendar = (props: IDecoratedCalendarProps) => {
  const {
    onCalendarDayClick,
    isCalendarDayDisabled,
    isCalendarDayTarget,
    checkIfHoliday,
    onPrevButtonClick,
    onNextButtonClick,
    currentCalendarDates,
    currentCalendarHeader,
  } = props;

  return (
    <StyledCalendar>
      <CalendarControls>
        <ControlsButton onClick={onPrevButtonClick}>
          <ChevronPrev />
        </ControlsButton>
        <CalendarHeader>{currentCalendarHeader}</CalendarHeader>
        <ControlsButton onClick={onNextButtonClick}>
          <ChevronNext />
        </ControlsButton>
      </CalendarControls>
      <CalendarWeeks>
        {weekDays.map((week) => (
          <WeekdayName>{week.shortName}</WeekdayName>
        ))}
      </CalendarWeeks>
      <CalendarDays>
        {currentCalendarDates.map((date) => (
          <CalendarDay
            date={date}
            isDisabled={isCalendarDayDisabled(date)}
            isTarget={isCalendarDayTarget(date)}
            isHoliday={checkIfHoliday ? checkIfHoliday(date) : null}
            onCalendarDayClick={onCalendarDayClick}
          />
        ))}
      </CalendarDays>
    </StyledCalendar>
  );
};

export const DecoratedCalendar = CalendarDecorator(Calendar);
