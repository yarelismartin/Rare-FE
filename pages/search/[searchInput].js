/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchPosts } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';

export default function Search() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllPosts = () => {
    searchPosts(searchInput).then(setFilteredPosts);
  };

  useEffect(() => {
    searchAllPosts();
    return () => {
      setFilteredPosts([]);
    };
  }, [searchInput]);

  return (
    <>
      <div className="posts-container flex mt-5">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={searchAllPosts} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
}
