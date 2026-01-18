'use client'
import { useFormStatus } from 'react-dom';

export default function FormSubmission() {
    const { pending } = useFormStatus()

    return <>{
        pending ?
            "creating post......." :
            (<>
                <button type="button">reset</button>
                <button disabled={pending}>create post</button>
            </>)
    }</>
}