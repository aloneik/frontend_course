import { NextResponse } from "next/server";

import { getUser } from "../../../../pseudo-db/users";

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const id = params.id;
    return NextResponse.json(getUser(id));
}
