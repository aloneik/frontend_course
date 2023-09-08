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
        <h1 className="title">Users</h1>
      </div>
      <div className="containerList">
        <UsersList/>
      </div>
    </>
  );
}