import { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import Image from "next/image";

import { authConfig } from '@/configs/auth';

export const metadata: Metadata = {
    title: "Profile"
}

export default async function Profile() {
    const session = await getServerSession(authConfig);
    return (
        <div>
            <h1 className="title">Profile of {session?.user?.name}</h1>
            {session?.user?.image && <Image src={session.user.image} alt="" />}
        </div>
    );
}
