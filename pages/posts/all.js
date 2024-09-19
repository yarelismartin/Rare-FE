import { useEffect, useState } from 'react';
import { getAllPosts, getPostsByCategory } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';
import CategoryFilter from '../../components/CategoryFilter';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then((data) => setPosts(Array.isArray(data) ? data : []));
  };

  const filterPostsByCategory = (categoryId) => {
    if (categoryId) {
      getPostsByCategory(categoryId).then((data) => setPosts(Array.isArray(data) ? data : []));
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
      justifyContent: 'center',
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
