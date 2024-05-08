import * as React from "react";
import Edit from "./Edit";
import { ErrorBoundary } from "./ErrorBoundary";
 
export default function App() {
    return (
        <ErrorBoundary>
            <Edit/>
        </ErrorBoundary>
    );
}
