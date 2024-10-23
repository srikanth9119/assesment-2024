import React from "react";
import { styled } from "styled-components";

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  firstName: string;
  lastName: string;
}

const PostContainer = styled.div`
  border: 1px solid #ddd;
  margin: 10px;
  padding: 15px;
`;

const PostTitle = styled.h3`
  font-weight: bold;
`;

const PostBody = styled.p``;

const PostAuthor = styled.p`
  font-style: italic;
`;

const Post: React.FC<PostProps> = ({
  id,
  title,
  body,
  userId,
  firstName,
  lastName,
}) => {
  return (
    <PostContainer key={id}>
      <PostTitle>{title}</PostTitle>
      <PostBody>{body}</PostBody>
      <PostAuthor>
        By: {firstName} {lastName} (ID: {userId})
      </PostAuthor>
    </PostContainer>
  );
};

export default Post;
