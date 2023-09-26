"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [Posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }

        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = Posts.filter((item) => item._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleSession = (posts) => {
        if (posts.length > 0) {
            return (
                <section className='w-full'>
                    <Profile
                        name="My"
                        desc={`Hi ${session?.user.name}, Welcome to your personalized profile page.`}
                        data={posts}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </section>
            )
        } else {
            return (
                <div className='flex flex-col items-center justify-center h-screen'>
                    <p className='text-2xl font-satoshi'>You have no prompts yet.</p>
                    <button type="button" className='mt-5 black_btn' onClick={() => router.push("/create-prompt")}>
                        Create Prompt
                    </button>
                </div>
            )
        }
    }

    return (
        session?.user ? handleSession(Posts) : (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-2xl font-satoshi'>Please sign in to view your profile.</p>
                <button type="button" className='mt-5 black_btn' onClick={() => router.push("/")}>
                    Go to Home
                </button>
            </div> 
        )
    )
}

export default MyProfile