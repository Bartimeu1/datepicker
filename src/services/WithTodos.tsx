import { ComponentType, useCallback, useState } from 'react';

import { IDecoratedCalendarProps } from '@root/types/calendar';

export const WithTodos = (Calendar: ComponentType<IDecoratedCalendarProps>) => {
  const WithTodosComponent = (props: IDecoratedCalendarProps) => {
    const [isTodoModalVisible, setIdTodoModalVisible] = useState(false);

    const toggleTodoModal = useCallback(() => {
      setIdTodoModalVisible((prevState) => !prevState);
    }, []);

    const closeTodoModal = useCallback(() => {
      setIdTodoModalVisible(false);
    }, []);

    return (
      <Calendar
        {...props}
        toggleTodoModal={toggleTodoModal}
        closeTodoModal={closeTodoModal}
        isTodoModalVisible={isTodoModalVisible}
      />
    );
  };

  return WithTodosComponent;
};
