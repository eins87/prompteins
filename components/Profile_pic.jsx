'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import { useMediaQuery } from '@mui/material';

import vercel from '@public/vercel.svg'
import logo from '@public/assets/images/logo.svg'
import prompt_icon from '@public/assets/icons/prompt_icon.png'

const Profile_pic = ({ userProfile }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [UserPosts, setUserPosts] = useState([])
  const [UserComments, setUserComments] = useState([])

  console.log(userProfile)

  const fetchUserPosts = async () => {
    const response = await fetch(`/api/users/${userProfile?._id}/posts`);
    const data = await response.json();
    setUserPosts(data);
  }

  const fetchUserComments = async () => {
    const response = await fetch(`/api/comments`);
    const data = await response.json();
    setUserComments(data);
  }

  useEffect(() => {
    fetchUserPosts();
    fetchUserComments();
  }, [userProfile?._id])

  console.log(UserPosts)

  return (
    <>
      <div className='absolute w-full -z-10'>
        <div className='flex items-center justify-center border-2 border-collapse border-gray-300 rounded-[10px] mx-8 sm:mx-16 p-3'>
          <Image
            priority={true}
            src={vercel}
            alt='profile_bg'
            width={isMobile ? 320 : isTablet ? 640 : 1280}
            style={{ height: 'auto' }}
            objectFit='contain'
        />
        </div>
      </div>
      <div className='flex flex-1 w-full gap-3 px-5 mt-5 md:mt-10 md:px-10 xl:mt-52'>
        <div className="flex flex-col items-center">
          <Image
            src={userProfile?.image ? userProfile?.image : logo}
            alt='profile_image'
            width={isMobile ? 100 : isTablet ? 130 : 150}
            height={isMobile ? 100 : isTablet ? 130 : 150}
            className='border-4 border-collapse border-gray-300 rounded-full shadow-xl'
          />
          <div className='flex flex-col items-center font-satoshi'>
            <h3 className='mt-3 text-gray-900 text-md'>{userProfile?.username}</h3>
          </div>
        </div>
        <div className='flex flex-col items-end justify-end w-full'>
          <div className='flex items-center gap-3 font-satoshi'>
            <h3 className='text-gray-900 text-md'>{ UserPosts?.length }</h3>
            <Image
              src={prompt_icon}
              alt='prompt_icon'
              width={20}
              height={20}
            />
          </div>
          <div className='flex items-center gap-3 font-satoshi'>
            <h3 className='text-gray-900 text-md'>{ () => {}}</h3>
            <ChatOutlinedIcon
              className='text-gray-800'
              fontSize='small'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile_pic