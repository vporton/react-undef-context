import * as React from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ErrorContext } from "./ErrorBoundary";

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