/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import getUserDetails from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { addSubscription, endSubscription, canSubscribe } from '../../api/subscriptionData';
import PostCard from '../../components/cards/PostCard';

export default function UserProfile() {
  const [authorObj, setAuthorObj] = useState({});
  const [canSubscribeToAuthor, setCanSubscribeToAuthor] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getSingleUser = () => {
    getUserDetails(id).then(setAuthorObj);
  };

  const startSubscription = async () => {
    window.alert(`You've subscribed to ${authorObj.firstName} ${authorObj.lastName}`);
    await addSubscription(user.id, authorObj.id).then(() => {
      getSingleUser();
    });
    const canSubscribeResult = await canSubscribe(user.id, id); // Check if you can still subscribe
    setCanSubscribeToAuthor(canSubscribeResult);
  };

  const stopSubscription = async () => {
    window.alert(`You've unsubscribed to ${authorObj.firstName} ${authorObj.lastName}`);
    await endSubscription(user.id, authorObj.id).then(() => {
      getSingleUser();
    });
    const canSubscribeResult = await canSubscribe(user.id, id); // Check if you can still subscribe
    setCanSubscribeToAuthor(canSubscribeResult);
  };

  const authorPosts = authorObj.posts;

  useEffect(() => {
    getSingleUser();
  }, [id]);

  useEffect(() => {
    canSubscribe(user.id, id).then((result) => setCanSubscribeToAuthor(result));
  }, [user, id]);

  return (
    <>
      <div>
        <img src={authorObj?.imageURL} alt={authorObj?.username} />
        <h1>Name: {authorObj?.firstName} {authorObj?.lastName}</h1>
        <h2>Username: {authorObj?.userName}</h2>
        <h2>Email: {authorObj?.email}</h2>
        <h2>Subscribers: {authorObj?.subscriberCount}</h2>
        <h4>Joined: {authorObj?.createdOn}</h4>
        {user.id !== authorObj.id && (
          canSubscribeToAuthor ? (
            <Button onClick={startSubscription} variant="secondary" className="me-2">Subscribe</Button>
          ) : (
            <Button onClick={stopSubscription} variant="danger">Unsubscribe</Button>
          )
        )}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      >
        {authorPosts?.map((post) => (
          <PostCard key={post.id} post={post} onUpdate={getSingleUser} />
        ))}
      </div>
    </>
  );
}
