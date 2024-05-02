"use client"
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick = {handleTagClick}
        />
      ))

      }
    </div>
  )
}


const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    const filteredPrompts = posts.filter((prompt) => {
      return regex.test(prompt.tag) || regex.test(prompt.prompt) || regex.test(prompt.creator.username);
    })
    setSearchResult(filteredPrompts);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    const timeout = setTimeout(() => {
      filterPrompts(e.target.value);
    }, 500);

    setSearchTimeout(timeout); 
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    filterPrompts(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setSearchResult(data);
    }
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data= { searchResult}
        handleTagClick = {handleTagClick}
      />
    </section>
  )
};

export default Feed;
