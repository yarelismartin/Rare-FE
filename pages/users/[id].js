import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getUserDetails from '../../api/userData';

export default function UserProfile() {
  const [userObj, setUserObj] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getSingleUser = () => getUserDetails(id).then(setUserObj);

  useEffect(() => {
    getSingleUser();
  }, [id]);

  return (
    <div>
      <img src={userObj?.imageURL} alt={userObj?.username} />
      <h1>Name: {userObj?.firstName} {userObj?.lastName}</h1>
      <h2>Username: {userObj?.userName}</h2>
      <h2>Email: {userObj?.email}</h2>
      <h2>Subscribers: {userObj?.subscriberCount}</h2>
      <h4>Joined: {userObj?.createdOn}</h4>
    </div>
  );
}
