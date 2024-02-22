import { memo } from 'react';

import { StyledIcon } from './styled';

interface IIconProps {
  icon: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const Icon = memo(function Icon(props: IIconProps) {
  const { icon, width, height, alt } = props;

  return <StyledIcon src={icon} width={width} height={height} alt={alt} />;
});
