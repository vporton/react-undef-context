import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Helmet } from 'react-helmet';
import { idlFactory as mainIdlFactory } from "../../../declarations/main";
import { ItemDataWithoutOwner, ItemTransferWithoutOwner, _SERVICE as ZonBackend } from "../../../declarations/main/main.did";
import { idlFactory as canDBPartitionIdlFactory } from "../../../declarations/CanDBPartition";
import { CanDBPartition } from "../../../declarations/CanDBPartition/CanDBPartition.did";
import EditFoldersList from "./EditFoldersList";
import { addToFolder, addToMultipleFolders } from "../util/folder";
import { parseItemRef, serializeItemRef } from "../data/Data";
import { AuthContext } from "./auth/use-auth-client";
import { BusyContext } from "./App";
import { Actor, Agent } from "@dfinity/agent";
import { ErrorContext, ErrorContextType } from "./ErrorBoundary";

export default function EditFolder(props: {}) {
    const errorContext = useContext(ErrorContext);
    const setError = errorContext.setError;
    async function submit() {
        async function submitItem() {
            setError("TEST EXCEPTION");
        }
        await submitItem();
    }
    return (
        <p><Button onClick={submit}>Save</Button></p>
    );
}