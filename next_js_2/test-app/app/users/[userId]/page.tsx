import { Metadata } from "next"
import { notFound } from "next/navigation";

import JsonPlaceholderPostService from '@/services/JsonPlaceholderService';
import User from "@/components/User/User";

type UserProps = {
    params: {
        userId: number;
    };
};

const providerService = new JsonPlaceholderPostService()

export async function generateMetadata({ params: { userId } }: UserProps): Promise<Metadata> {
    const user = await providerService.getUser(userId);
    if (!user?.name) {
        return {
            title: `User with id ${userId} is not found`
        }
    }

    return {
        title: user?.name
    };
}

export default async function Post({ params: { userId } }: UserProps) {
    const user = await providerService.getUser(userId);

    if (!user?.name) return notFound();

    return (
        <>
            <h2>User id: {userId}</h2>
            <br/>
            <User info={user}/>
        </>
    )
}

export async function generateStaticParams() {
    const users = await providerService.getUsers();

    return users.map(user => ({
        userId: user.id.toString()
    }));
}
