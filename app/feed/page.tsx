import Posts from "@/components/posts"
import { getPosts } from "@/lib/posts"
import { use } from "react"

export default function FeedPage() {
  const posts = use(getPosts())
  return (
    <main className="main">
      <Posts posts={posts} />
    </main>
  );
}