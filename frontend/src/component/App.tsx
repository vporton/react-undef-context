import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";
import EditFolder from "./EditFolder";
import { ErrorBoundary } from "./ErrorBoundary";
 
export default function App() {
    return (
        <>
            <Container>
                <MyRouted/>
            </Container>
        </>
    );
}

function MyRouted(props: {}) {
    return <>
        <ErrorBoundary>
            <EditFolder/>
        </ErrorBoundary>
    </>;
}