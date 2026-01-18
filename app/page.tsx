import { getPosts } from "@/lib/posts"
import { Suspense } from "react";
import Posts from "@/components/posts";

async function LatestPosts() {
  const latestPosts = await getPosts(3)

  return <Posts posts={latestPosts}/>
}

export default function Home() {
  return (
    <main className="main">
      <h1>Welcome back!</h1>
      <p>Here`s what you might`ve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </main>
  );
}
