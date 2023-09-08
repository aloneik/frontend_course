import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";

import { getPost, removePost } from "../../../../pseudo-db/posts";

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const id = params.id;
    return NextResponse.json(getPost(id));
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    removePost(id);
    redirect("/blog");
}