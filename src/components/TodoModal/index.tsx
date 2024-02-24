import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as ClearIcon } from '@assets/images/delete.svg';
import { useOnClickOutside } from '@root/hooks';
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
import { ITodoItem,ITodoModalProps } from './types';

export const TodoModal = ({ dateItem, closeModal }: ITodoModalProps) => {
  const modalRef = useRef(null);

  const [inputValue, setInputValue] = useState('');

  const getTodos = () => {
    const savedTodos = localStorage.getItem(`todo_${JSON.stringify(dateItem)}`);
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else return [];
  };

  const [todoItems, setTodoItems] = useState<ITodoItem[]>(getTodos());

  const setTodos = useCallback(() => {
    localStorage.setItem(
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
      <ModalContent ref={modalRef}>
        <ModalTitle>Add Todo</ModalTitle>
        <TodoList>
          {todoItems.map(({ id, value }) => (
            <TodoItem key={id}>
              <TodoItemText>{value}</TodoItemText>
              <ClearIcon onClick={deleteTodo(id)} />
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
          <ClearButton onClick={closeModal}>Cancel</ClearButton>
        </ModalControls>
      </ModalContent>
    </StyledModal>,
    document.body,
  );
};
