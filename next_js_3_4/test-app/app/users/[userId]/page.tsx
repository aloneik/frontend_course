import { Metadata } from "next"
import { notFound } from "next/navigation";

import { providerService } from "@/services/ProviderService";
import User from "@/components/User/User";

type UserProps = {
    params: {
        userId: number;
    };
};

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
        <div className="container">
            <h2 className="title">User id: {userId}</h2>
            <br/>
            <User info={user}/>
        </div>
    )
}

export async function generateStaticParams() {
    const users = await providerService.getUsers();

    return users.map(user => ({
        userId: user.id.toString()
    }));
}
