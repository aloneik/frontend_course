"use client";

import { Metadata } from "next"
import { FormEvent, useState } from "react";

import { providerService } from "@/services/ProviderService";
import { StyledButton } from '@/components/StyledButton/StyledButton';

export const metadata: Metadata = {
    title: "Add post",
    description: "Post creation page"
}

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await providerService.createPost(title, body);
    }

    return (
        <>
            <div>
                <h2 className="title">New post</h2>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Title"
                        type="text"
                        id="postTitle"
                        name="title"
                        maxLength={60}
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <br />
                    <br />
                    <textarea
                        placeholder="Text"
                        id="postBody"
                        name="body"
                        rows={4}
                        cols={50}
                        value={body}
                        onChange={e => setBody(e.target.value)} />
                    <br />
                    <input type="submit" value="Create post" />
                </form>
            </div>
        </>
    )
}
