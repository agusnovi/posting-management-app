'use server'

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const isInvalid = (text: FormDataEntryValue | null) =>
  !text || text === null || text.toString().trim() === '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createPost(prevState: any, formData: FormData) {
  const post = {
    title: formData.get('title'),
    image: formData.get('image'),
    content: formData.get('content'),
    userId: null,
  };
    
  const errors: string[] = []

  if (isInvalid(post.title)) {
    errors.push('title empty.');
  }

  if (isInvalid(post.content)) {
    errors.push('content empty.');
  }

  if (!post.image || (post.image as File).size === 0) {
    errors.push('image empty.');
  }
    
    if (errors.length > 0) {
        return {
            errors
        }
    }

  let imageUrl: string = '';
  try {
    imageUrl = await uploadImage(post.image as File);
  } catch (error) {
    throw new Error('Upload image error, please try again.');
  }

  try {
    await storePost({
      title: formData.get('title')?.toString() ?? '',
      imageUrl,
      content: formData.get('content')?.toString() ?? '',
      userId: null,
    });
  } catch (error) {
    throw new Error('Store image error, please try again.');
  }

  revalidatePath('/', 'layout')
  redirect('/feed')
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2)
  revalidatePath('/', 'layout')
}
