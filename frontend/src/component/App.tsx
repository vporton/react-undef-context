import * as React from "react";
import EditFolder from "./EditFolder";
import { ErrorBoundary } from "./ErrorBoundary";
 
export default function App() {
    return (
        <>
            <ErrorBoundary>
                <p><EditFolder/></p>
            </ErrorBoundary>
        </>
    );
}
