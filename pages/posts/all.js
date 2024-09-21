import { useEffect, useState } from 'react';
import { getAllPosts, getPostsByCategory } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';
import CategoryFilter from '../../components/CategoryFilter';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  const filterPostsByCategory = (categoryId) => {
    if (categoryId === null) {
      getPosts();
    } else {
      getPostsByCategory(categoryId).then(setPosts);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mt-5">
      <div className="posts-container flex">
      <CategoryFilter onCategorySelect={filterPostsByCategory} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onUpdate={getPosts} />
        ))
      ) : (
        <p>No posts found for this category.</p>
      )}
    </div>
    </div>
  );
}
