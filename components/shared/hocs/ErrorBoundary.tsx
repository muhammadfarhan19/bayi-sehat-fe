import { RefreshIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { SnackbarType } from '../../../reducer/CommonReducer';

type ErrorBoundaryProps = { errorHandler: () => void };
class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.errorHandler();
    console.error(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center p-4">
          <h1 className="mb-1">Gagal memuat halaman.</h1>
          <button
            onClick={this.handleRetry}
            type="button"
            className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <RefreshIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Coba lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface WithErrorBoundary {
  <T extends React.FunctionComponent<P>, P>(Component: T): (props: P) => JSX.Element;
}

export const withErrorBoundary: WithErrorBoundary = Component => {
  const enhancedComponent = (props = {}) => {
    const dispatch = useDispatch();

    const handleError = () => {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Terjadi gangguan, coba muat ulang halaman anda.',
          type: SnackbarType.ERROR,
        })
      );
    };

    return (
      <ErrorBoundary errorHandler={handleError}>
        {/* @ts-ignore */}
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  return enhancedComponent;
};
