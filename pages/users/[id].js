import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import getUserDetails from '../../api/userData';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const userId = router.query;

  const getSingleUserDetails = async () => {
    try {
      const getUser = await getUserDetails(userId);
      setUser(getUser);
    } catch (error) {
      console.error('Failed to fetch details for user:', error);
    }
  };

  useEffect(() => {
    getSingleUserDetails();
  }, [userId]);

  return (
    <div>
      <Image src={user.imageURL} />
      <h1>Name: {user.firstName} {user.lastName}</h1>
      <h2>Username: {user.userName}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Subscribers: {user.subscriberCount}</h2>
      <h4>Joined: {user.createdOn}</h4>
    </div>
  );
}
