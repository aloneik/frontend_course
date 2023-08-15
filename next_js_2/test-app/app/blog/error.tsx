"use client";

type ErrorWrapperProps = {
    error: Error;
}

export default function ErrorWrapper({ error }: ErrorWrapperProps) {
    return <h1>The following error occured: {error.message}</h1>
}
