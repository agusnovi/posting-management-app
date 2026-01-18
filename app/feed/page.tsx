import Posts from "@/components/posts"
import { getPosts } from "@/lib/posts"
import { use } from "react"

export default function FeedPage() {
  const posts = use(getPosts())
  
  if (!posts) {
    throw new Error("An Error Occurred, feed load failed!")
  }
    
  return (
    <main className="main">
      {posts.length > 0 ? <Posts posts={posts} /> : <p>Feed Empty!</p>}
    </main>
  );
}