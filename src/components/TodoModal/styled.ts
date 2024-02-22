import { FlexMixin } from '@root/GlobalStyles';
import styled from 'styled-components';

export const StyledModal = styled.div`
  ${FlexMixin({ align: 'center', justify: 'center' })}

  backdrop-filter: blur(1px);
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.5s all;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border: 1px solid ${({ theme }) => theme.color.border};
  padding: 20px 25px;
  width: 250px;
`;

export const ModalTitle = styled.p`
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 10px;
`;

export const TodoList = styled.div`
  ${FlexMixin({ direction: 'column' })}
`;

export const TodoItem = styled.div`
  ${FlexMixin({ align: 'center', justify: 'start' })}

  margin-bottom: 10px;

  & svg {
    cursor: pointer;
  }
`;

export const TodoItemText = styled.p`
  margin-right: 10px;
`;

export const ModalInput = styled.input`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  width: 100%;
  outline: none;
  padding: 10px 0 10px 15px;
  margin-bottom: 10px;
`;

export const ModalControls = styled.div`
  ${FlexMixin({ align: 'center', justify: 'space-between' })};
`;

const ControlsButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  transition: 0.3s all;

  &:hover {
    background: inherit;
    transition: 0.3s all;
  }
`;

export const AddButton = styled(ControlsButton)`
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.selected};
  color: ${({ theme }) => theme.color.white};
  padding: 10px 20px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.selected};
    color: ${({ theme }) => theme.color.selected};
  }
`;

export const ClearButton = styled(ControlsButton)`
  border: 1px solid ${({ theme }) => theme.color.disabled};
  background: ${({ theme }) => theme.color.disabled};
  color: ${({ theme }) => theme.color.white};
  padding: 9px 19px;

  &:hover {
    color: ${({ theme }) => theme.color.disabled};
  }
`;
