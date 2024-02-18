import { ComponentType } from 'react';

import { IDecoratedCalendarProps } from '@root/types/calendar';

export class CalendarService {
  calendar: ComponentType<IDecoratedCalendarProps>;

  constructor(calendar: ComponentType<IDecoratedCalendarProps>) {
    this.calendar = calendar;
  }

  addDecorator(
    decorator: (
      component: ComponentType<IDecoratedCalendarProps>,
    ) => ComponentType<IDecoratedCalendarProps>,
  ) {
    this.calendar = decorator(this.calendar);
  }

  getCalendar() {
    return this.calendar;
  }
}
