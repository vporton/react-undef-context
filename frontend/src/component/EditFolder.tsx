import * as React from "react";
import { useContext } from "react";
import { ErrorContext } from "./ErrorBoundary";

export default function EditFolder(props: {}) {
    const { setError } = useContext(ErrorContext);
    function submit() {
        setError("TEST EXCEPTION");
    }
    return (
        <p><button onClick={submit}>Save</button></p>
    );
}