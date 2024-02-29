import { StyledTooltip, TooltipText } from './styled';
import { ITooltipProps } from './types';

export const Tooltip = (props: ITooltipProps) => {
  const { text } = props;

  return (
    <StyledTooltip>
      <TooltipText>{text}</TooltipText>
    </StyledTooltip>
  );
};
