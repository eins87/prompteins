'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import logo from '@public/assets/images/logo.svg';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);
  
  return (
    <nav className='w-full pt-3 mb-16 flex-between'>
      <Link href="/" className='flex gap -2 flex-center'>
        <Image
          priority
          src={logo}
          alt="Prompteins_Logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>
          <span className='blue_gradient ps-2'>PromptEins</span>
        </p>
      </Link>

      {/* desktop nav */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>            
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>

            <button type="button" className='black_btn' onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt="profile" />
            </Link>
            
          </div>
        ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    <button
                      type="button"
                      key={provider.name}
                      className='black_btn'
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))
              }
            </>
        )}
      </div>
    
      {/* mobile nav */}
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className='flex cursor-pointer'>
            <Image src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt="profile"
              onClick={() => settoggleDropDown((prev) => !prev)} />
            
            {toggleDropDown && (
              <div className='dropdown'>
                <Link href="/profile" className='dropdown_link' onClick={() => { settoggleDropDown(false) }}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className='dropdown_link' onClick={() => { settoggleDropDown(false) }}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => { settoggleDropDown(false); signOut(); }}
                  className='w-full mt-5 black_btn'>
                  Sign Out
                </button>
              </div>
              )}
          </div>
        ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    <button type="button" key={provider.name}  className='black_btn' onClick={() => signIn(provider.id)}>
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))
              }
            </>
        )}
      </div>
    </nav>
  )
}

export default Nav