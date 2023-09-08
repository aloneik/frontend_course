import { NextResponse } from "next/server";

import { getUsers } from "../../../pseudo-db/users";

export async function GET() {
    return NextResponse.json(getUsers());
}
