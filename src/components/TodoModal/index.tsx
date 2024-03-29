import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DeleteIcon } from '@constants/icons';
import { useOnClickOutside } from '@root/hooks';
import { getStorageItem,setStorageItem } from '@utils/storage';
import { v1 as uuidv1 } from 'uuid';

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
import { ITodoItem, ITodoModalProps } from './types';

export const TodoModal = ({ dateItem, closeModal }: ITodoModalProps) => {
  const modalRef = useRef(null);

  const [inputValue, setInputValue] = useState('');

  const getTodos = () => {
    const savedTodos = getStorageItem(`todo_${JSON.stringify(dateItem)}`);
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else return [];
  };

  const [todoItems, setTodoItems] = useState<ITodoItem[]>(() => {
    const initialState = getTodos();
    return initialState;
  });

  const setTodos = useCallback(() => {
    setStorageItem(
      `todo_${JSON.stringify(dateItem)}`,
      JSON.stringify(todoItems),
    );
  }, [todoItems, dateItem]);

  useEffect(() => {
    setTodos();
  }, [todoItems, setTodos]);

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const todoItem = {
        value: inputValue,
        id: uuidv1(),
      };
      setTodoItems((prevState) => [...prevState, todoItem]);
      setInputValue('');
    }
  };

  const deleteTodo = (itemId: string) => () => {
    setTodoItems((prevState) => prevState.filter((item) => item.id !== itemId));
  };

  useOnClickOutside(modalRef, closeModal);

  return createPortal(
    <StyledModal data-modal={true}>
      <ModalContent ref={modalRef} data-testid="todo-modal">
        <ModalTitle>Add Todo</ModalTitle>
        <TodoList data-testid="todo-list">
          {todoItems.map(({ id, value }) => (
            <TodoItem key={id}>
              <TodoItemText>{value}</TodoItemText>
              <DeleteIcon
                onClick={deleteTodo(id)}
                data-testid="todo-clear-button"
              />
            </TodoItem>
          ))}
        </TodoList>
        <ModalInput
          data-testid="todo-input"
          type="text"
          placeholder="Enter your task..."
          value={inputValue}
          onChange={onInputValueChange}
          maxLength={15}
        />
        <ModalControls>
          <AddButton onClick={addTodo} data-testid="todo-accept-button">
            Accept
          </AddButton>
          <ClearButton onClick={closeModal} data-testid="todo-cancel-button">
            Cancel
          </ClearButton>
        </ModalControls>
      </ModalContent>
    </StyledModal>,
    document.body,
  );
};
