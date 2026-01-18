'use client'
import { useActionState } from "react"
import FormSubmission from "./form-submission"
import styles from './post-form.module.scss'

export default function PostForm({
  action,
}: {
  action: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevState: any,
    formData: FormData
  ) => Promise<{
    errors?: string[];
  }>;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction}>
      <label htmlFor="title">title</label>
      <input name="title" id="title" type="text" required />
      <label htmlFor="image">image URL</label>
      <input
        className={styles.image}
        name="image"
        id="image"
        type="file"
        accept="image/jpg, image/png"
        required
      />
      <label htmlFor="content">content</label>
      <textarea name="content" id="content" required />
      <div className={styles.footer}>
        <FormSubmission />
      </div>
      {state.errors && state.errors.length > 0 && (
        <p>{state.errors.join(',')}</p>
      )}
    </form>
  );
}