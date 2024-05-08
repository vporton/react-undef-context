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
            <Helmet>
                <title>Zon Social Media - the world as items in folders</title>
                <meta name="description" content="A fusion of social network, marketplace, and web directory"/>
            </Helmet>
            <Container>
                <p style={{width: '100%', background: 'red', color: 'white', padding: '4px'}}>
                    It is a preliminary alpha-test version. All data is likely to be deleted before the release.
                </p>
                <h1>Zon Social Network</h1>
                <AuthProvider options={{loginOptions: {
                    identityProvider,
                    maxTimeToLive: BigInt (7) * BigInt(24) * BigInt(3_600_000_000_000), // 1 week // TODO
                    windowOpenerFeatures: "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
                    onSuccess: () => {
                        console.log('Login Successful!');
                    },
                    onError: (error) => {
                        console.error('Login Failed: ', error);
                    },
                }}}>
                    <BrowserRouter>
                        <BusyContext.Provider value={{busy, setBusy}}>
                            {busy ? <p>Processing...</p> :
                            <AuthContext.Consumer>
                                {({defaultAgent}) => <MyRouted defaultAgent={defaultAgent}/>}
                            </AuthContext.Consumer>
                            }
                        </BusyContext.Provider>
                    </BrowserRouter>
                </AuthProvider>
            </Container>
        </>
    );
}

function MyRouted(props: {defaultAgent: Agent | undefined}) {
    const navigate = useNavigate();
    const [root, setRoot] = useState("");
    async function fetchRootItem() {
        const MainCanister: ZonBackend = Actor.createActor(mainIdlFactory, {canisterId: process.env.CANISTER_ID_MAIN!, agent: props.defaultAgent})
        const data0 = await MainCanister.getRootItem();
        const [data] = data0; // TODO: We assume that it's initialized.
        let [part, id] = data! as [Principal, bigint];
        let item = { canister: part, id: Number(id) };
        setRoot(serializeItemRef(item));
    }
    fetchRootItem().then(() => {});
    function RootRedirector(props: {root: string}) {
        useEffect(() => {
            if (root !== "") {
                navigate("/item/"+root);
            }
        }, [root]);
        return (
            <p>Loading...</p>
        );
    }
    const contextValue = useAuth();
    return (
        <AuthContext.Consumer>
            {({isAuthenticated, principal, authClient, defaultAgent, options, login, logout}) => {
                const signin = () => {
                    login!(); // TODO: `!`
                };
                const signout = async () => {
                    await logout!(); // TODO: `!`
                };
                return <>
                    <p>
                        Logged in as: {isAuthenticated ? <small>{principal?.toString()}</small> : "(none)"}{" "}
                        {isAuthenticated ? <Button onClick={signout}>Logout</Button> : <Button onClick={signin}>Login</Button>}
                    </p>
                    <nav>
                        <Navbar className="bg-body-secondary" style={{width: "auto"}}>
                            <Nav>
                                <Nav.Link onClick={() => navigate("/item/"+root)}>Main folder</Nav.Link>{" "}
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={() => navigate("/latest")}>Latest posts</Nav.Link>{" "}
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={() => navigate("/personhood")}>Verify Your Account</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="https://docs.zoncircle.com">Our site</Nav.Link>
                            </Nav>
                        </Navbar>
                    </nav>
                    <ErrorBoundary>
                        <Routes>
                            <Route
                                path="/create-subfolder/for-folder/:folder"
                                element={
                                    (() => {
                                        function Edit(props) {
                                            const routeParams = useParams();
                                            return <EditFolder superFolderId={routeParams.folder} defaultAgent={defaultAgent}/>;
                                        }
                                        return <Edit/>;
                                    })()
                                }
                            />
                            {/*<Route path="*" element={<ErrorHandler error={{hasError: true, message: "No such page"}}/>}/>*/}
                        </Routes>
                    </ErrorBoundary>
                </>
           }}
        </AuthContext.Consumer>
    );
}