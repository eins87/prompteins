"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [Post, setPost] = useState({ prompt: "", tag: []});
    const [Submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) fetchPrompt();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: Post.prompt,
                    tag: Post.tag
                })
            });

            if (response.ok) {
                router.push("/profile");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };
  return (
      <Form
          type="Edit"
          post={Post}
          setPost={setPost}
          submitting={Submitting}
          handleSubmit={updatePrompt} 
      />
  )
}

export default UpdatePrompt