import React, { Component } from 'react';

import { boundaryText } from '@constants/text';

import boundaryImage from '@assets/images/boundary.png';

import { Boundary, BoundaryImage, BoundaryText } from './styled';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

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
          <BoundaryImage src={boundaryImage} />
          <BoundaryText>{boundaryText}</BoundaryText>
        </Boundary>
      );
    }

    return this.props.children;
  }
}
