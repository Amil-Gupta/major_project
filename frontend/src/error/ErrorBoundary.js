import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.hasError && prevProps.hasError) {
            this.setState({ hasError: false });
        }
    }

    componentDidCatch(error, info) {
        this.props.setHasError(true);
        console.log(error, info);
    }

    render() {
        return this.state.hasError
      ? this.props.fallback
      : this.props.children; 
    }
}

export default ErrorBoundary;