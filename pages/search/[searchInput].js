/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { searchPosts } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllPosts = () => {
    searchPosts(searchInput, user.uid).then(setFilteredPosts);
  };

  useEffect(() => {
    searchAllPosts();
    return () => {
      setFilteredPosts([]);
    };
  }, [searchInput]);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} uid={user.uid} post={post} onUpdate={searchAllPosts} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
}
