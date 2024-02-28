import { FlexMixin } from '@root/GlobalStyles';
import styled from 'styled-components';

export const Boundary = styled.div`
  ${FlexMixin({ align: 'center', justify: 'center', direction: 'column' })}

  height: 100%;
  width: 100%;

  & svg {
    margin-bottom: 20px;
  }
`;

export const BoundaryText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;
