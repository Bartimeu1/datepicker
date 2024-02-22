import { useEffect,useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as ClearIcon } from '@assets/images/delete.svg';
import { IDateItem } from '@root/types/calendar';

import {
  AddButton,
  ClearButton,
  ModalContent,
  ModalControls,
  ModalInput,
  ModalTitle,
  StyledModal,
  TodoItem,
  TodoItemText,
  TodoList,
} from './styled';

interface ITodoModalProps {
  dateItem: IDateItem | null;
}

interface ITodoItem {
  id: number;
  value: string;
}

export const TodoModal = ({ dateItem }: ITodoModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const getTodos = () => {
    console.log(dateItem);
    const savedTodos = localStorage.getItem(`todo_${JSON.stringify(dateItem)}`);
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else return [];
  };

  const [todoItems, setTodoItems] = useState<ITodoItem[]>(getTodos());

  const setTodos = () => {
    localStorage.setItem(
      `todo_${JSON.stringify(dateItem)}`,
      JSON.stringify(todoItems),
    );
  };

  useEffect(() => {
    setTodos();
  }, [todoItems]);

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const todoItem = {
        value: inputValue,
        id: todoItems.length,
      };
      setTodoItems((prevState) => [...prevState, todoItem]);
      setInputValue('');
    }
  };

  const deleteTodo = (itemId: number) => () => {
    setTodoItems((prevState) => prevState.filter((item) => item.id !== itemId));
  };

  return createPortal(
    <StyledModal>
      <ModalContent>
        <ModalTitle>Add Todo</ModalTitle>
        <TodoList>
          {todoItems.map((item, index) => (
            <TodoItem>
              <TodoItemText>{item.value}</TodoItemText>
              <ClearIcon onClick={deleteTodo(index)} />
            </TodoItem>
          ))}
        </TodoList>
        <ModalInput
          type="text"
          placeholder="Enter your task..."
          value={inputValue}
          onChange={onInputValueChange}
        />
        <ModalControls>
          <AddButton onClick={addTodo}>Accept</AddButton>
          <ClearButton>Cancel</ClearButton>
        </ModalControls>
      </ModalContent>
    </StyledModal>,
    document.body,
  );
};
