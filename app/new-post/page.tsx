import PostForm from "@/components/post-form"
import { createPost } from '@/actions/posts';
import styles from './page.module.scss'

export default function NewPost() {
    return (
      <main className="main">
        <section className={styles.section}>
          <h1>create a new post</h1>
          <PostForm action={createPost} />
        </section>
      </main>
    );
}