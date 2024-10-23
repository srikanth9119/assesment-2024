import React from "react";
import PostList from "./components/PostList";

const App: React.FC = () => {
  return (
    <div>
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
