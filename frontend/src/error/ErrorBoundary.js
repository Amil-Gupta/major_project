import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.hasError && prevProps.hasError) {
            this.setState({ hasError: false });
        }
    }

    componentDidCatch(error, info) {
        this.props.setHasError(true);
        // console.log(error, info);
    }

    render() {
        const FallbackComponent = this.props.fallback;

        return this.state.hasError
        ? <FallbackComponent error={this.state.error} />
        : this.props.children; 
    }
}

export default ErrorBoundary;