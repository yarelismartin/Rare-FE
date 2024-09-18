import { useEffect, useState } from 'react';
import { getAllPosts } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={getPosts} />
      ))}
    </div>
  );
}
