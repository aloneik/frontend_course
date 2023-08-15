import { Metadata } from "next"

import JsonPlaceholderPostService from '@/services/JsonPlaceholderService';

type PostProps = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params: { id } }: PostProps): Promise<Metadata> {
    const providerService = new JsonPlaceholderPostService()
    const post = await providerService.getPost(id);
    return {
        title: post.title
    };
}

export default async function Post({ params: { id } }: PostProps) {
    const providerService = new JsonPlaceholderPostService()
    const post = await providerService.getPost(id);
    return (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </>
    )
}
