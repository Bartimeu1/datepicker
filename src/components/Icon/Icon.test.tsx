import { render } from '@testing-library/react';

import { Icon } from '.';
import { IIconProps } from './types';

const mockedProps: IIconProps = {
  icon: 'icon.png',
  width: 100,
  height: 100,
  alt: 'Icon Alt Text',
};

describe('Icon component', () => {
  test('component should render correctly', () => {
    const { getByAltText } = render(<Icon {...mockedProps} />);

    const iconElement = getByAltText('Icon Alt Text');

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('src', 'icon.png');
    expect(iconElement).toHaveAttribute('width', '100');
    expect(iconElement).toHaveAttribute('height', '100');
  });
});
