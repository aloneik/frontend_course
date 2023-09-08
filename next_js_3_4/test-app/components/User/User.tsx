import IUser from "@/types/IUser";

type UserProps = {
    info: IUser;
}

export default async function User({ info }: UserProps) {
    return (
        <>
            <h3>{info.name}</h3>
            <br/>
            <h3>{info.username}</h3>
        </>
    )
}
