import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Button } from 'bootstrap';
import getUserDetails from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { canSubscribe } from '../../api/subscriptionData';

export default function UserProfile() {
  const [userObj, setUserObj] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getSingleUser = () => getUserDetails(id).then(setUserObj);
  let canSubscribeToAuthor = false;

  useEffect(() => {
    getSingleUser();
  }, [id]);

  useEffect(() => {
    canSubscribeToAuthor = canSubscribe(user.id, userObj.id);
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
      </div>
      {user.id !== userObj.id && (
        canSubscribeToAuthor ? (
          <h2>Subscribe</h2>
        ) : (
          <h2>Unsubscribe</h2>
        )
      )}

    </>
  );
}
