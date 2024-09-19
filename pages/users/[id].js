import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Button } from 'bootstrap';
import getUserDetails from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { canSubscribe } from '../../api/subscriptionData';
import PostCard from '../../components/cards/PostCard';

export default function UserProfile() {
  const [userObj, setUserObj] = useState({});
  const [canSubscribeToAuthor, setCanSubscribeToAuthor] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getSingleUser = () => getUserDetails(id).then(setUserObj);
  const userPosts = userObj.posts;

  useEffect(() => {
    getSingleUser();
  }, [id]);

  useEffect(() => {
    canSubscribe(user.id, id).then((result) => setCanSubscribeToAuthor(result));
    console.warn(canSubscribeToAuthor);
  }, [user, id]);

  return (
    <>
      <div>
        <img src={userObj?.imageURL} alt={userObj?.username} />
        <h1>Name: {userObj?.firstName} {userObj?.lastName}</h1>
        <h2>Username: {userObj?.userName}</h2>
        <h2>Email: {userObj?.email}</h2>
        <h2>Subscribers: {userObj?.subscriberCount}</h2>
        <h4>Joined: {userObj?.createdOn}</h4>
        {user.id !== userObj.id && (
          canSubscribeToAuthor ? (
            <h2>Subscribe</h2>
          ) : (
            <h2>Unsubscribe</h2>
          )
        )}
        {console.warn(userPosts)}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      >
        {userPosts?.map((post) => (
          <PostCard key={post.id} post={post} onUpdate={getSingleUser} />
        ))}
      </div>
    </>
  );
}
