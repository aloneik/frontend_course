import { Metadata } from 'next';

import UsersList from '../../components/UsersList/UsersList';

export const metadata: Metadata = {
  title: "Users",
  description: "List of blog users"
}

export default async function Users() {
  return (
    <>
      <div className="container">
        <h1>Users</h1>
        <UsersList/>
      </div>
    </>
  );
}