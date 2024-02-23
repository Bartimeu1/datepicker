import { ReactComponent as ChevronNext } from '@assets/images/chevronNext.svg';
import { ReactComponent as ChevronPrev } from '@assets/images/chevronPrev.svg';
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
    isTodoModalVisible,
    toggleTodoModal,
    closeTodoModal,
  } = props;
  
  return (
    <StyledCalendar $isYearDisplay={viewType === CalendarViewTypesEnum.year}>
      <CalendarControls>
        <ControlsButton onClick={onPrevButtonClick}>
          <ChevronPrev />
        </ControlsButton>
        <CalendarHeader>{currentCalendarHeader}</CalendarHeader>
        <ControlsButton onClick={onNextButtonClick}>
          <ChevronNext />
        </ControlsButton>
      </CalendarControls>
      <CalendarDisplay $isYearDisplay={viewType === CalendarViewTypesEnum.year}>
        {currentCalendarDates.map((month, index) => (
          <CalendarMonth key={index}>
            {viewType === CalendarViewTypesEnum.year && (
              <MonthTitle>{calendarMonth[index].fullName}</MonthTitle>
            )}
            <CalendarWeeks>
              {(startDay === CalendarStartDaysEnum.monday
                ? fromMondayWeekDays
                : fromSundayWeekDays
              ).map((week) => (
                <WeekdayName key={week.id}>{week.shortName}</WeekdayName>
              ))}
            </CalendarWeeks>
            <CalendarDays>
              {month.map((date) => (
                <CalendarDay
                  key={date.id}
                  range={range}
                  date={date}
                  isTargetEnd={isTargetEndDay(date)}
                  isDisabled={isDayDisabled(date)}
                  isInRange={isDayInRange(date)}
                  isTarget={isTargetDay(date)}
                  isHoliday={checkIfHoliday ? checkIfHoliday(date) : null}
                  onCalendarDayClick={onCalendarDayClick}
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
