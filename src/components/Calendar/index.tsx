import { useMemo } from 'react';

import { ChevronNext, ChevronPrev } from '@constants/icons';
import { CalendarDay } from '@components/CalendarDay';
import { TodoModal } from '@components/TodoModal';
import {
  calendarMonth,
  fromMondayWeekDays,
  fromSundayWeekDays,
} from '@constants/calendar';
import {
  CalendarStartDaysEnum,
  CalendarViewTypesEnum,
  IDecoratedCalendarProps,
} from '@root/types/calendar';
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
    onRangeCalendarDayClick,
    isDayDisabled,
    isTargetDay,
    isTargetEndDay,
    isDayInRange,
    checkIfHoliday,
    onPrevButtonClick,
    onNextButtonClick,
    currentCalendarDates,
    currentCalendarHeader,
    viewType,
    targetDateItem,
    startDay,
    range,
    todos,
    isTodoModalVisible,
    toggleTodoModal,
    closeTodoModal,
  } = props;

  const calendarWeekDays = useMemo(
    () =>
      startDay === CalendarStartDaysEnum.monday
        ? fromMondayWeekDays
        : fromSundayWeekDays,
    [startDay],
  );

  return (
    <StyledCalendar
      data-testid="calendar"
      $isYearDisplay={viewType === CalendarViewTypesEnum.year}>
      <CalendarControls>
        <ControlsButton
          onClick={onPrevButtonClick}
          data-testid="calendar-prev-button">
          <ChevronPrev />
        </ControlsButton>
        <CalendarHeader data-testid="calendar-header">
          {currentCalendarHeader}
        </CalendarHeader>
        <ControlsButton
          onClick={onNextButtonClick}
          data-testid="calendar-next-button">
          <ChevronNext />
        </ControlsButton>
      </CalendarControls>
      <CalendarDisplay $isYearDisplay={viewType === CalendarViewTypesEnum.year}>
        {currentCalendarDates.map((month, index) => (
          <CalendarMonth key={index} data-testid="calendar-month">
            {viewType === CalendarViewTypesEnum.year && (
              <MonthTitle>{calendarMonth[index].fullName}</MonthTitle>
            )}
            <CalendarWeeks>
              {calendarWeekDays.map(({ id, shortName }) => (
                <WeekdayName key={id}>{shortName}</WeekdayName>
              ))}
            </CalendarWeeks>
            <CalendarDays>
              {month.map((date) => (
                <CalendarDay
                  key={date.id}
                  todos={todos}
                  range={range}
                  date={date}
                  isTargetEnd={range && (isTargetEndDay(date) || false)}
                  isInRange={range && (isDayInRange(date) || false)}
                  isDisabled={isDayDisabled(date)}
                  isTarget={isTargetDay(date)}
                  isHoliday={checkIfHoliday ? checkIfHoliday(date) : null}
                  onCalendarDayClick={
                    range ? onRangeCalendarDayClick : onCalendarDayClick
                  }
                  toggleTodoModal={toggleTodoModal}
                />
              ))}
            </CalendarDays>
          </CalendarMonth>
        ))}
      </CalendarDisplay>
      {isTodoModalVisible && (
        <TodoModal dateItem={targetDateItem} closeModal={closeTodoModal} />
      )}
    </StyledCalendar>
  );
};

export const DecoratedCalendar = CalendarDecorator(Calendar);
