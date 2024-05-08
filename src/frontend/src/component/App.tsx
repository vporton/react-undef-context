import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";
import EditFolder from "./EditFolder";
import { ErrorBoundary, ErrorContext, ErrorContextType, ErrorHandler } from "./ErrorBoundary";
 
export default function App() {
    return (
        <>
            <Container>
                <BrowserRouter>
                    <MyRouted/>
                </BrowserRouter>
            </Container>
        </>
    );
}

function MyRouted(props: {}) {
    return <>
        <ErrorBoundary>
            <Routes>
                <Route
                    path="/"
                    element={<EditFolder/>}/>
            </Routes>
        </ErrorBoundary>
    </>;
}