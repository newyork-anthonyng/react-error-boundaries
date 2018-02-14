import React from "react";
import ReactDOM from "react-dom";

class CustomError extends Error {}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      hasCustomError: false
    };
  }

  componentDidCatch(error, info) {
    if (error instanceof CustomError) {
      this.setState({
        hasCustomError: true
      });
    } else {
      this.setState({
        hasError: true,
      });
    }
  }

  render() {
    if (this.state.hasCustomError) {
      return <h1>Custom error!</h1>;
    } else if (this.state.hasError) {
      return <h1>Normal error!</h1>;
    }

    return this.props.children;
  }
}

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.error = null;

    this.handleCustomErrorClick = this.handleCustomErrorClick.bind(this);
    this.handleNormalErrorClick = this.handleNormalErrorClick.bind(this);
  }

  handleCustomErrorClick() {
    this.error = new CustomError("Hello");
    this.forceUpdate();
  }

  handleNormalErrorClick() {
    this.error = new Error("Hello");
    this.forceUpdate();
  }

  render() {
    if (this.error !== null) {
      throw this.error;
    }

    return (
      <div>
        <h1>Throw some errors</h1>
          <button onClick={this.handleCustomErrorClick}>Throw Custom Error</button>
          <button onClick={this.handleNormalErrorClick}>Throw Normal Error</button>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Test />
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
