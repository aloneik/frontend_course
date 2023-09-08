import { NextResponse } from "next/server";

import { getPosts, addPost } from "../../../pseudo-db/posts";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (query) {
        return NextResponse.json(
            getPosts().filter((post: any) => post.title.toLowerCase().includes(query.toLowerCase()))
        );
    }

    return NextResponse.json(getPosts());
}

export async function POST(request: Request) {
    const json = await request.json()
    const title = json.title;
    const body = json.body;

    if (title != undefined && body != undefined) {
        const new_post = addPost(title, body);
        return NextResponse.json(new_post);
    }

    return NextResponse.json({error: "title or body is undefined"});
}