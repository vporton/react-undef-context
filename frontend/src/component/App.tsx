import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import EditFolder from "./EditFolder";
import { ErrorBoundary } from "./ErrorBoundary";
 
export default function App() {
    return (
        <>
            <Container>
                <ErrorBoundary>
                    <EditFolder/>
                </ErrorBoundary>
            </Container>
        </>
    );
}
