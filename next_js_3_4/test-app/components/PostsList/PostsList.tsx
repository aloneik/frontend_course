"use client";

import useSWR from "swr";
import Link from "next/link";

import { providerService } from "@/services/ProviderService";

export default function PostsList() {
  const {data: posts, isLoading} = useSWR("posts", providerService.getPosts);

  return isLoading ? 
  (
    <h3>Loading...</h3>
  ) :
  (
    <>
      <ul>
        {
          posts?.map(item => (
            <li key={item.id}>
              <Link href={`/blog/${item.id}`}>{item.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}