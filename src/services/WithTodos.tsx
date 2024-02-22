import { ComponentType, useState } from 'react';

import { IDecoratedCalendarProps } from '@root/types/calendar';

export const WithTodos = (Calendar: ComponentType<IDecoratedCalendarProps>) => {
  const WithTodosComponent = (props: IDecoratedCalendarProps) => {
    const [isTodoModalVisible, setIdTodoModalVisible] = useState(false);

    const toggleTodoModal = () => {
      setIdTodoModalVisible((prevState) => !prevState);
    };

    const closeTodoModal = () => {
      setIdTodoModalVisible(false);
    };

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
