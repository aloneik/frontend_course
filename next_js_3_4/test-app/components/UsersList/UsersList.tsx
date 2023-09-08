import Link from "next/link";

import { providerService } from "@/services/ProviderService";

export default async function UsersList() {
  const users = await providerService.getUsers();

  return (
    <>
      <ul>
        {
          users?.map(item => (
            <li key={item.id}>
              <Link href={`/users/${item.id}`}>{item.name}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}
