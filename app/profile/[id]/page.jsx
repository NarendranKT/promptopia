"use client";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = ({params}) => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
      fetchPosts()
  }, [])

  return (
    <Profile
        name={username}
        desc={`Welcome to ${username} personalized profile to read his excellent prompts`}
        data={posts}
    />
  )
};

export default UserProfile;
