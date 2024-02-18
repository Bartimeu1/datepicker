import { css } from 'styled-components';

interface IFlexMixin {
  align?: string;
  justify?: string;
  direction?: string;
  wrap?: string;
}

export const FlexMixin = ({
  align = 'stretch',
  justify = 'flex-start',
  direction = 'row',
  wrap = 'nowrap',
}: IFlexMixin = {}) => css`
  display: flex;
  align-items: ${align};
  justify-content: ${justify};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
`;
