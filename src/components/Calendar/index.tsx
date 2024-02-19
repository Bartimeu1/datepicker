import { ReactComponent as ChevronNext } from '@assets/images/chevronNext.svg';
import { ReactComponent as ChevronPrev } from '@assets/images/chevronPrev.svg';
import { CalendarDay } from '@components/CalendarDay';
import {
  calendarMonth,
  fromMondayWeekDays,
  fromSundayWeekDays,
} from '@constants/calendar';
import { IDecoratedCalendarProps } from '@root/types/calendar';
import { CalendarDecorator } from '@services/CalendarDecorator';

import {
  CalendarControls,
  CalendarDays,
  CalendarDisplay,
  CalendarHeader,
  CalendarMonth,
  CalendarWeeks,
  ControlsButton,
  MonthTitle,
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
    viewType,
    startDay,
  } = props;

  return (
    <StyledCalendar $isYearDisplay={viewType === 'year'}>
      <CalendarControls>
        <ControlsButton onClick={onPrevButtonClick}>
          <ChevronPrev />
        </ControlsButton>
        <CalendarHeader>{currentCalendarHeader}</CalendarHeader>
        <ControlsButton onClick={onNextButtonClick}>
          <ChevronNext />
        </ControlsButton>
      </CalendarControls>
      <CalendarDisplay $isYearDisplay={viewType === 'year'}>
        {currentCalendarDates.map((month, index) => (
          <CalendarMonth>
            {viewType === 'year' && (
              <MonthTitle>{calendarMonth[index].fullName}</MonthTitle>
            )}
            <CalendarWeeks>
              {(startDay === 'monday'
                ? fromMondayWeekDays
                : fromSundayWeekDays
              ).map((week) => (
                <WeekdayName>{week.shortName}</WeekdayName>
              ))}
            </CalendarWeeks>
            <CalendarDays>
              {month.map((date) => (
                <CalendarDay
                  date={date}
                  isDisabled={isCalendarDayDisabled(date)}
                  isTarget={isCalendarDayTarget(date)}
                  isHoliday={checkIfHoliday ? checkIfHoliday(date) : null}
                  onCalendarDayClick={onCalendarDayClick}
                />
              ))}
            </CalendarDays>
          </CalendarMonth>
        ))}
      </CalendarDisplay>
    </StyledCalendar>
  );
};

export const DecoratedCalendar = CalendarDecorator(Calendar);
