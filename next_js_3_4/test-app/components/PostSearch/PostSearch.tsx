"use client";

import useSWR from "swr";

import { FormEventHandler, useState } from "react";

import { providerService } from "@/services/ProviderService";

export default function PostSearch() {
    const { mutate } = useSWR("posts");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const posts = await providerService.searchPost(searchTerm);
        mutate(posts);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Search</button>
        </form>
        </>
    )
}
