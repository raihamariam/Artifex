import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Scopes 3D-renderer failures (e.g. an uncaught WebGL exception following
 * context loss) to the viewport only, instead of letting them crash the
 * whole Experience shell. React only supports catching render/commit
 * errors via a class component's static lifecycle — there is no hook
 * equivalent.
 */
export class GarmentErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[GarmentCanvas] renderer error", error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="garment-loader" role="alert">
          <span className="art-meta">3D viewer unavailable</span>
          <button type="button" className="art-button art-button--secondary" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
