'use client';

import { useState } from 'react'

import Feed from '@components/Feed';
import ModalPopup from '@components/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSpring, animated } from '@react-spring/web'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [post, setPost] = useState({})

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const springH1 = useSpring({
    from: { opacity: 0, x: -200 },
    to: { opacity: 1, x: 0 },
    config: {
      mass: 4,
      friction: 20,
      tension: 120,
    },
  })

  const springP = useSpring({
    from: { opacity: 0, x: 200 },
    to: { opacity: 1, x: 0 },
    delay: 300,
    config: {
      mass: 3,
      friction: 20,
      tension: 120,
    },
  })
  
  return (
    <section className="flex-col w-full flex-center">
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
      />
      <ModalPopup
        open={open}
        handleClose={handleClose}
        post={post}
      />
      <animated.h1 className="text-center head_text" style={{ ...springH1 }}>Discover & Share<br />
          <span className="text-center blue_gradient"> AI-Powered Prompts</span>
      </animated.h1>
      <animated.p className="text-center desc" style={{ ...springP }}>
          PromptEins is an apen-source AI prompting tool for modern world to discover, create and share creative prompt.
      </animated.p>
      
      <Feed
        open={open}
        setOpen={handleOpen}
        setPost={setPost}
      />
    </section>
  )
}

export default Home