import { FlexMixin } from '@root/GlobalStyles';
import styled from 'styled-components';

export const StyledTooltip = styled.div`
  ${FlexMixin({ align: 'center', justify: 'center' })}

  background: ${({ theme }) => theme.color.selected};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  text-align: center;
  position: absolute;
  width: 100px;
  height: 30px;
  top: -30px;
  left: -30px;
  z-index: 2;
`;

export const TooltipText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  color: ${({ theme }) => theme.color.white};
`;
