import { useEffect, useState } from 'react';
import { getAllPosts, getPostsByCategory } from '../api/postData';
import { getUserSubscriptions } from '../api/subscriptionData';
import PostCard from '../components/cards/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  const [discoverPosts, setDiscoverPosts] = useState([]);
  const { user } = useAuth();

  const getSubscriptions = () => {
    getUserSubscriptions(user.id).then(setSubscribedPosts);
  };

  const getDiscoverPosts = () => {
    getAllPosts().then(setDiscoverPosts);
  };

  const filterPostsByCategory = (categoryId) => {
    if (categoryId === null) {
      getDiscoverPosts();
    } else {
      getPostsByCategory(categoryId).then(setDiscoverPosts);
    }
  };

  const hasSubscriptions = subscribedPosts.length > 0;

  useEffect(() => {
    getDiscoverPosts();
  }, []);

  useEffect(() => {
    getSubscriptions();
  }, [user]);

  return (
    <div
      className="posts-container flex mt-5"
    >

      {hasSubscriptions ? (
        <>
          <h2>Your Subscriptions</h2>
          {subscribedPosts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={getSubscriptions} />
          ))}
        </>
      ) : (
        <>
          <CategoryFilter onCategorySelect={filterPostsByCategory} />
          {discoverPosts.length > 0 ? (
            discoverPosts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={getDiscoverPosts} />
            ))
          ) : (
            <p>No posts found for this category.</p>
          )}
        </>
      )}
    </div>
  );
}
