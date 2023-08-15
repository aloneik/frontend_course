import { Metadata } from 'next';

import PostsList from '../../components/PostsList/PostsList';
import PostSearch from '../../components/PostSearch/PostSearch';

export const metadata: Metadata = {
  title: "Blog",
  description: "List of posts"
}

export default async function Blog() {
  return (
    <>
      <div className="container">
        <h1>Posts</h1>
        <PostSearch/>
        <PostsList/>
      </div>
    </>
  );
}