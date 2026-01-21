import Posts from "@/components/posts"
import { getPosts } from "@/lib/posts"
import { Metadata, ResolvingMetadata } from "next"
import { use } from "react"

type Props = {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string] : string | undefined | string[] }>
}

export const generateMetadata = async (data: Props, parent: ResolvingMetadata): Promise<Metadata> => {
  const posts = await getPosts()

  return {
    title: `All post total ${posts.length}`,
    description: "Vsit our post"
  }
}

export default function FeedPage() {
  const posts = use(getPosts())
  return (
    <main className="main">
      <Posts posts={posts} />
    </main>
  );
}