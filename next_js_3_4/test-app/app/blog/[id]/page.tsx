"use client";

import { Metadata } from "next"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { providerService } from "@/services/ProviderService";
import IPost from "@/types/IPost";

type PostProps = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params: { id } }: PostProps): Promise<Metadata> {
    const post = await providerService.getPost(id);
    return {
        title: post.title
    };
}

export default function Post({ params: { id } }: PostProps) {
    const [post, setPost] = useState<IPost | undefined>(undefined);
    useEffect(() => {
        providerService.getPost(id).then((newPost) => {
            setPost(newPost);
        });
    }, [id]);

    const router = useRouter();

    async function handleDelete(id: string) {
        providerService.deletePost(id);
        router.push("/blog");
    }
    return (
        <>
            <h2>{post?.title}</h2>
            <p>{post?.body}</p>
            <br/>
            <button onClick={() => handleDelete(id)}>Delete post</button>
        </>
    )
}
