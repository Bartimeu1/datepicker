import { Component } from 'react';

import { BoundaryIcon } from '@constants/icons';
import { boundaryText } from '@constants/text';

import { Boundary, BoundaryText } from './styled';
import { IErrorBoundaryProps, IErrorBoundaryState } from './types';

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Boundary>
          <BoundaryIcon />
          <BoundaryText>{boundaryText}</BoundaryText>
        </Boundary>
      );
    }

    return this.props.children;
  }
}
