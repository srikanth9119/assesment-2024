import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import { styled } from "styled-components";
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      const fetchedPosts = data.posts.slice(0, 10); // Get first 10 posts

      const userIds = [...new Set(fetchedPosts.map((post) => post.userId))];

      const usersData = await Promise.all(
        userIds.map((userId) =>
          fetch(`https://dummyjson.com/users/${userId}`).then((res) =>
            res.json()
          )
        )
      );

      const usersMap = usersData.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as { [key: number]: User });

      setPosts(fetchedPosts);
      setUsers(usersMap);
    };

    fetchData();
  }, []);

  return (
    <PostListContainer>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          userId={post.userId}
          firstName={users[post.userId]?.firstName || "Loading..."}
          lastName={users[post.userId]?.lastName || "Loading..."}
        />
      ))}
    </PostListContainer>
  );
};

export default PostList;
