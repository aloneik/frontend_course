import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About"
}

export default function About() {
  return (
    <>
      <h1 className="title">
        Read <Link href="/blog">blog</Link>.
      </h1>
      <div>About</div>
    </>
  );
}
