'use client'
import { Post } from "@/lib/types"
import Image, { ImageLoaderProps } from "next/image"
import cs from "classnames"
import { formatDate } from "@/lib/format"
import { togglePostLikeStatus } from "@/actions/posts"
import { useOptimistic } from "react"
import styles from './posts.module.scss';

function PostItem({ post, action }: { post: Post, action: (postId: number) => Promise<void> }) {
  const loaderImage = (config: ImageLoaderProps) => {
    const firstUrl = config.src.split('upload/')[0];
    const secondUrl = config.src.split('upload/')[1];
    const optimazationImg = `w_200,q_${config.quality}`;
    const normalizedUrl = `${firstUrl}upload/${optimazationImg}/${secondUrl}`;
    return normalizedUrl;
  };  

  return (
    <article>
      <div className={styles.image}>
        <Image
          loader={loaderImage}
          src={post.image}
          alt={post.title}
          width={200}
          height={120}
          quality={75}
        />
      </div>
      <div className={styles.content}>
        <header>
          <div className={styles.title}>
            <h3>{post.title}</h3>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <form action={action.bind(null, post.id)}>
            <button
              className={cs(
                styles['like-button'],
                post.isLiked === 1 && styles.liked,
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e32195"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
            </button>
          </form>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}
export default function Posts({ posts }: { posts: Post[] }) {
  const [optimisticPosts, optimisticUpdatePosts] = useOptimistic(posts, (prevPosts, updatePostId) => {
    const postIndex = prevPosts.findIndex(post => post.id === updatePostId)
    
    if (postIndex === -1) {
      return prevPosts
    }

    const post = { ...prevPosts[postIndex] }
    post.likes = post.likes + (post.isLiked === 1 ? -1 : 1)
    post.isLiked = post.isLiked === 1 ? 0 : 1

    const newPosts = [...prevPosts]
    newPosts[postIndex] = post
    return newPosts
  })

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>Feed empty!</p>;
  }

  async function updatePost(postId: number) {
    optimisticUpdatePosts(postId);
    await togglePostLikeStatus(postId);
  }
  
  return (
    <div className={styles.grid}>
      {optimisticPosts.map((post) => (
        <PostItem key={post.id} post={post} action={updatePost} />
      ))}
    </div>
  );
}