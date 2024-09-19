import { useEffect, useState } from 'react';
import { getAllPosts, getPostsByCategory } from '../api/postData';
import PostCard from '../components/cards/PostCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  const filterPostsByCategory = (categoryId) => {
    if (categoryId) {
      getPostsByCategory(categoryId).then(setPosts);
    } else {
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
    }}
    >
      <CategoryFilter onCategorySelect={filterPostsByCategory} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onUpdate={getPosts} />
        ))
      ) : (
        <p>No posts found for this category.</p>
      )}
    </div>
  );
}
