import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center text-red-500 text-lg">
                    <h1>Something went wrong.</h1>
                    <p>Please try refreshing the page.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

//  Add PropTypes validation
ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
