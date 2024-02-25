import { StylingWrapper } from '@components/StylingWrapper';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TodoModal } from '.';
import { ITodoModalProps } from './types';

const mockedProps: ITodoModalProps = {
  closeModal: jest.fn(),
  dateItem: { year: 2024, month: 1, day: 1 },
};

const mockedTodoText = 'new todo';

describe('TodoModal component', () => {
  test('component should render correctly', () => {
    render(<TodoModal {...mockedProps} />, { wrapper: StylingWrapper });
  });

  test('todo input should change value correctly', () => {
    const { getByTestId } = render(<TodoModal {...mockedProps} />, {
      wrapper: StylingWrapper,
    });

    const todoInput = getByTestId('todo-input');

    expect(todoInput).toBeInTheDocument();
    fireEvent.change(todoInput, { target: { value: mockedTodoText } });

    expect(todoInput).toHaveValue(mockedTodoText);
  });

  test('should add new todo item', () => {
    const { getByTestId, getByText } = render(<TodoModal {...mockedProps} />, {
      wrapper: StylingWrapper,
    });

    const todoInput = getByTestId('todo-input');
    const todoList = getByTestId('todo-list');
    const acceptButton = getByTestId('todo-accept-button');
    expect(acceptButton).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();

    fireEvent.change(todoInput, { target: { value: mockedTodoText } });
    expect(todoInput).toHaveValue(mockedTodoText);

    fireEvent.click(acceptButton);

    const fieldWithText = getByText(mockedTodoText);
    expect(fieldWithText).toBeInTheDocument();
  });

  test('should delete todo item after clear button click', () => {
    const { getByTestId, getByText } = render(<TodoModal {...mockedProps} />, {
      wrapper: StylingWrapper,
    });

    const fieldWithText = getByText(mockedTodoText);
    expect(fieldWithText).toBeInTheDocument();

    const clearButton = getByTestId('todo-clear-button');
    fireEvent.click(clearButton);
    expect(fieldWithText).not.toBeInTheDocument();
  });

  test('should close after cancel button click', () => {
    const { getByTestId } = render(<TodoModal {...mockedProps} />, {
      wrapper: StylingWrapper,
    });

    const todoModal = getByTestId('todo-modal');
    const cancelButton = getByTestId('todo-cancel-button');
    expect(todoModal).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(mockedProps.closeModal).toHaveBeenCalled();
  });

  test('should close after outside click', async () => {
    render(<TodoModal {...mockedProps} />, {
      wrapper: StylingWrapper,
    });

    userEvent.click(document.body);

    await waitFor(() => {
      expect(mockedProps.closeModal).toHaveBeenCalled();
    });
  });
});
