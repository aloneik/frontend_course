import { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import Link from 'next/link';

import { authConfig } from '@/configs/auth';

import PostsList from '../../components/PostsList/PostsList';
import PostSearch from '../../components/PostSearch/PostSearch';

export const metadata: Metadata = {
    title: "Blog",
    description: "List of posts"
}

export default async function Blog() {
    const session = await getServerSession(authConfig);
    return (
        <>
            <div className="container">
                <h1>Posts</h1>
                <PostSearch />
                {session?.user && <Link href="/blog/add-post">Add Post</Link>}
            </div>
            <div className="containerList">
                <PostsList />
            </div>
        </>
    );
}