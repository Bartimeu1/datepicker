import { ComponentType } from 'react';

import { IDecoratedCalendarProps } from '@root/types/calendar';

export const WithTodos = (
  Calendar: ComponentType<IDecoratedCalendarProps>,
) => {
  const WithTodosComponent = (props: IDecoratedCalendarProps) => {
    
    return <Calendar {...props}  />;
  };

  return WithTodosComponent;
};
