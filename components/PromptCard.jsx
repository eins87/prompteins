'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import { labelsStar, getLabelText } from '@utils/constants/constants';

import PromptCardSkeleton from '@components/Skeletons/PromptCardSkeleton';

// import static icons
import tick from '@public/assets/icons/tick.svg';
import copy from '@public/assets/icons/copy.svg';

import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import { blue } from '@mui/material/colors';

import { toast } from 'react-toastify';

import { useSpring, animated } from '@react-spring/web';

const PromptCard = ({ post, filterComment, handleTagClick, handleEdit, handleDelete, delay, setOpen, setPost }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCommentClick = () => {
    if (!session?.user) return toast.error("Please login to comment");
    if (post.creator._id !== session?.user.id) {
      setPost(post);
      return setOpen(true);
    }
  }

  const handleReadMore = () => {
    router.push(`/prompt-detail?prompt=${post._id}`);
  }

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 2000)
  }

  const springPrompt = useSpring({
    from: { opacity: 0, y: 200 },
    to: { opacity: 1, y: 0 },
    delay: delay,
    config: {
      mass: 3,
      friction: 50,
      tension: 120,
    },
  })

  return (
    <>
      <animated.div className='prompt_card' style={{ ...springPrompt }}>
        <Suspense fallback={<PromptCardSkeleton />}>
          <div className='flex items-start justify-between flex-1 gap-5'>
            <div className='flex items-center justify-start flex-1 gap-3 cursor-pointer' onClick={handleProfileClick}> 
              <Image
                src={post.creator.image}
                alt='user_image'
                width={48}
                height={48}
                className='object-contain rounded-full'
              />
              <div className='flex flex-col font-satoshi'>
                <h3 className='text-gray-900 text-md'>{post.creator.username}</h3>
                <p className='text-sm text-gray-500'>{post.creator.email}</p>
              </div>
            </div>
            <div className='copy_btn' onClick={handleCopy} >
              <Image
                src={copied === post.prompt ? tick : copy }
                width={12}
                height={12}
                alt="copy_icon"
              />
            </div>
          </div>
        
        <Divider variant='inset' className='mt-2' />
      
        <p className='my-4 text-sm text-gray-700 font-satoshi'>
          {post.prompt.length > 60 ? post.prompt.slice(0, 60) + " ..." : post.prompt}
          <span className='cursor-pointer blue_gradient font-inter' onClick={handleReadMore}>Read more</span>
        </p> 
      
        <p className='text-sm font-inter blue_gradient'>
          {post.tag.length > 3 ? post.tag.slice(0, 3).map((tag) => (
            <span key={tag} className='mr-2 cursor-pointer ' onClick={() => handleTagClick(tag)}>#{tag}</span>
          )) : post.tag.map((tag) => (
            <span key={tag} className='mr-2 cursor-pointer' onClick={() => handleTagClick(tag)}>#{tag}</span>
          ))}
        </p>

        <Divider variant='fullWidth' className='my-4' />
        
        <div className='flex w-full gap-5'>
          <Box className='flex items-center justify-start' >
            <Rating
              readOnly={true}
              name="hover-feedback"
              value={filterComment.map((comment) => comment.rating).reduce((a, b) => a + b, 0) / filterComment.length}
              precision={0.5}
              getLabelText={getLabelText}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {filterComment.length > 0 && (
              <Box sx={{ ml: 2 }}>{labelsStar[filterComment.map((comment) => comment.rating).reduce((a, b) => a + b, 0) / filterComment.length]}</Box>
            )}
          </Box>
          
          <div className='flex items-center justify-end flex-1 w-full gap-1'>
            {filterComment.length}
            <MessageIcon
              sx={{ color: blue[500] }}
              className={post.creator._id !== session?.user.id ? 'cursor-pointer' : 'cursor-not-allowed'}
              onClick={handleCommentClick}
            />
          </div>
        </div>
        
      
        {session?.user?.id === post.creator._id && pathName === "/profile" && (
          <div className='flex items-center justify-between w-full gap-3 pt-4 font-inter'>
            <div className='flex justify-start w-1/2'>
                <Button variant='outlined' startIcon={<EditIcon />} onClick={handleEdit}>
                  Edit
                </Button>
            </div>
            <div className='flex justify-end w-1/2'>
                <Button variant='outlined' startIcon={<DeleteIcon/>} onClick={handleDelete}>
                  Delete
                </Button>
            </div>
          </div>
          )}
      </Suspense>
    </animated.div>
  </>
  )
}

export default PromptCard