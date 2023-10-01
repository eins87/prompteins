'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Divider from '@mui/material/Divider';

// import static icons
import tick from '@public/assets/icons/tick.svg';
import copy from '@public/assets/icons/copy.svg';

const CommentList = ({ comments, handleProfileClick }) => {
  return (
      comments.map(
        (comment) => (
          <div>
            <Divider variant='inset' className='mt-2'/>
            <div className='mt-5 text-right font-satoshi'>
              <h3 className='text-gray-900 text-md'>{comment.comment}</h3>
            </div>
            <div key={comment._id} className='flex items-center w-full gap-3 mt-5'>
              <div className='flex w-[2/3] justify-start gap-2 cursor-pointer' onClick={handleProfileClick}>
                <Image
                  src={comment.creator.image}
                  alt='user_image'
                  width={18}
                  height={18}
                  className='object-contain rounded-full'
                />
                <div className='flex flex-col font-satoshi'>
                  <h3 className='text-gray-900 text-md'>{comment.creator.username}</h3>
                </div>
              </div>
              <div className='flex items-center justify-end w-full gap-2'>
                <p className='text-sm text-gray-500'>{new Date(comment.createAt).toLocaleDateString()}</p>
              </div>
            </div>
            <Divider variant='fullWidth' className='mt-2' />
          </div>
        )
      )
    )
}

const Detail = ({ post, comments, desc }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 2000)
  }
  
  return (
    <section className="w-full">
      <h1 className="text-left head_text">
        <span className="blue_gradient">Prompt Detail</span>
      </h1>
      <p className="mb-16 text-left desc">
        {desc}
      </p>

      <div className='flex items-start justify-between flex-1 gap-5'>
        <div className='flex items-center justify-start flex-1 gap-3 cursor-pointer' onClick={handleProfileClick}> 
          <Image
            src={post?.creator?.image}
            alt='creator_image'
            width={50}
            height={50}
            className='object-contain rounded-full'
          />
          <div className='flex flex-col font-satoshi'>
            <h3 className='text-gray-900 text-md'>{post?.creator?.username}</h3>
            <p className='text-sm text-gray-500'>{post?.creator?.email}</p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy} >
          <Image
            src={copied === post.prompt
              ? tick
              : copy
            }
            width={12}
            height={12}
            alt="copy_icon"
          />
        </div>
      </div>
      <Divider variant='inset' className='my-2' />

      <div className='mt-5 text-left font-satoshi'>
        <h3 className='text-gray-900 text-md'>{post.prompt}</h3>
      </div>

      <p className='my-5 text-sm font-inter blue_gradient'>
        {post?.tag?.map((tag) => (
          <span key={tag} className='mr-2 cursor-pointer'>#{tag}</span>
        ))}
      </p>

      <Divider variant='fullWidth' className='mt-2' />

      <div className='mt-5 text-left font-satoshi'>
        <h3 className='text-gray-900 text-md'>Comments({comments.length})</h3>
      </div>
      {
        comments.length > 0
          ? <CommentList comments={comments} handleProfileClick={handleProfileClick} />
          : <p className='text-center font-satoshi'>No comments yet</p> 
      }
    </section>
  )
}

export default Detail