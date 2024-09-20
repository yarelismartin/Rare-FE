import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/cards/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div
      className="posts-container flex mt-5"
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={getPosts} />
      ))}
    </div>
  );
}
