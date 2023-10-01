"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile_pic from "@components/Profile_pic";
import { toast } from "react-toastify";

const UserProfile = () => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  // get user profile
  const [userProfile, setUserProfile] = useState([]);

  if (!userName) return toast.error("User not found");
  
  const getUserProfile = async () => {
    const response = await fetch(`/api/users/${userName}`);
    const data = await response.json();
    setUserProfile(data);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <Profile_pic userProfile={userProfile} />
    </>
  )
}

export default UserProfile