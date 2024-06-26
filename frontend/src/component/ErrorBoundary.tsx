import React, { Component, ErrorInfo, ReactNode, useContext } from "react";

export class ErrorContextType {
    hasError: boolean;
    message: string | undefined;
    constructor() {
        this.hasError = false;
    }
    setError(e: any) {
        this.hasError = true;
        this.message = e;
    }
};

export const ErrorContext = React.createContext(new ErrorContextType());

export class ErrorBoundary extends Component<{children?: ReactNode}, ErrorContextType> {
    static contextType = ErrorContext;
    declare context: React.ContextType<typeof ErrorContext>;
    public static getDerivedStateFromError(error: ErrorContextType): ErrorContextType
    {
        return error;
    }
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    public render() {
        const context = this.context;
        return !this.context ? "" : context.hasError ?
            <ErrorHandler error={context.message}/> : this.props.children;
    }
}

export function ErrorHandler({ error }) {
    return (
      <div role="alert">
        <h2>Error</h2>
        <p style={{color: 'red'}}>{error.message}</p>
      </div>
    );
}
