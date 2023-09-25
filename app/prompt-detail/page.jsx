'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import Detail from '@components/Detail';

const PromptDetail = () => {
  const [Post, setPost] = useState([])
  const [Comments, setComments] = useState([])
  const searchParams = useSearchParams();
  const postId = searchParams.get("prompt");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${postId}`);
      const data = await response.json();
      setPost(data);
    }

    const fetchComments = async () => {
      const response = await fetch(`/api/comment/${postId}`);
      const data = await response.json();
      setComments(data);
    }

    fetchPost();
    fetchComments();
  }, [])

  return (
    <Detail
      post={Post}
      comments={Comments}
      desc="This is the prompt detail page" />
  )
}

export default PromptDetail