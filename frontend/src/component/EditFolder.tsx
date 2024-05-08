import * as React from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ErrorContext } from "./ErrorBoundary";

export default function EditFolder(props: {}) {
    const { setError } = useContext(ErrorContext);
    async function submit() {
        setError("TEST EXCEPTION");
    }
    return (
        <p><Button onClick={submit}>Save</Button></p>
    );
}