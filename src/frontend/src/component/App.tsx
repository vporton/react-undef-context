import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, ErrorInfo, ReactNode, createContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import ShowItem from "./ShowItem";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
    useNavigate,
    HashRouter,
    useParams,
    Link,
    BrowserRouter,
} from "react-router-dom";
import { Actor, Agent, getDefaultAgent } from '@dfinity/agent';
import SubFolders from "./SubFolders";
import EditItem from "./EditItem";
import EditFolder from "./EditFolder";
import { getIsLocal } from "../util/client";
import { serializeItemRef } from '../data/Data'
import { Principal } from "@dfinity/principal";
import { AuthContext, AuthProvider, useAuth } from './auth/use-auth-client'
import { idlFactory as mainIdlFactory } from "../../../declarations/main";
import { _SERVICE as ZonBackend } from "../../../declarations/main/main.did";
import { Helmet } from 'react-helmet';
import Person from "./personhood/Person";
import { AllItems } from "./AllItems";
import { ErrorBoundary, ErrorContext, ErrorContextType, ErrorHandler } from "./ErrorBoundary";

export const BusyContext = createContext<any>(undefined); // TODO: type
 
export default function App() {
    const identityCanister = process.env.CANISTER_ID_INTERNET_IDENTITY;
    const identityProvider = getIsLocal() ? `http://${identityCanister}.localhost:8000` : `https://identity.ic0.app`;
    const [busy, setBusy] = useState(false);
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
                    element={
                        (() => {
                            function Edit(props) {
                                const routeParams = useParams();
                                return <EditFolder/>;
                            }
                            return <Edit/>;
                        })()
                    }
                />
                {/*<Route path="*" element={<ErrorHandler error={{hasError: true, message: "No such page"}}/>}/>*/}
            </Routes>
        </ErrorBoundary>
    </>;
}