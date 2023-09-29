"use client";

import { useState, useEffect, Suspense } from 'react'

import PromptCard from '@components/PromptCard';

import { useSpring, animated } from '@react-spring/web';

const PromptCardList = ({data, handleTagClick, open, setOpen, setPost}) => {
  return (
    <div className='prompt_layout'>
      {data.length !== 0
        && data.map((post, index) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            open={open}
            setOpen={setOpen}
            setPost={setPost}
            delay={(index+1) * 300}
          />
          )
        )
      }
    </div>
  )
}

const Feed = ({open, setOpen, setPost}) => {
  const [Posts, setPosts] = useState([]);
  const [SearchText, setSearchText] = useState("")
  const [SearchTimeout, setSearchTimeout] = useState(null);
  const [SearchedResults, setSearchedResults] = useState([]);

  useEffect(() => { 
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return Posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(SearchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);;
    setSearchedResults(searchResult);
  }

  const springSearch = useSpring({
    from: { opacity: 0, y: 200 },
    to: { opacity: 1, y: 0 },
    delay: 300,
    config: {
      mass: 3,
      friction: 40,
      tension: 120,
    },
  })

  return (
    <>
      <div className='feed'>
        <animated.form className='relative w-full shadow-xl flex-center' style={{ ...springSearch }}>
          <input
            type="text"
            placeholder='Search for a tag or a username'
            value={SearchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </animated.form>
      </div>
      
      <div className='flex flex-col items-center w-full justify-evenly columns-3'>
        
        {SearchedResults.length === 0 ? (
            <PromptCardList
              data={Posts}
              handleTagClick={handleTagClick}
              open={open}
              setOpen={setOpen}
              setPost={setPost}
            />
          ) : (
            <PromptCardList
              data={SearchedResults}
              handleTagClick={handleTagClick}
              open={open}
              setOpen={setOpen}
              setPost={setPost}
              />
          )}
      </div>     
  </>
  )
}

export default Feed