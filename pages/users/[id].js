/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <>
      <div className="flex flex-col items-center mt-5 bg-white shadow-lg rounded-lg p-6 w-[90%] mx-auto mb-9">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={authorObj?.imageURL}
            alt={authorObj?.userName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h1 className="text-xl font-bold mt-4">{authorObj?.firstName} {authorObj?.lastName}</h1>
        <h2 className="text-gray-600">@{authorObj?.userName}</h2>
        <h2 className="text-gray-500">{authorObj?.email}</h2>
        <h4 className="text-sm text-gray-500">Joined: {formatDate(authorObj?.createdOn)}</h4>

        {/* Subscriber Count Badge */}
        <div className="mt-4">
          <div className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-full shadow-md text-lg flex items-center justify-center">
            {authorObj?.subscriberCount}
            {authorObj?.subscriberCount > 1 || authorObj?.subscriberCount === 0 ? ' Subscribers' : ' Subscriber'}
          </div>
        </div>

        {/* Subscription Button */}
        {user.id !== authorObj.id && (
        <div className="mt-4">
          {canSubscribeToAuthor ? (
            <button
              type="button"
              onClick={startSubscription}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          ) : (
            <button
              type="button"
              onClick={stopSubscription}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Unsubscribe
            </button>
          )}
        </div>
        )}

        {/* Posts Container */}
        <div className="posts-container mt-6 w-full flex flex-col !justify-start">
          <h3 className="text-lg font-semibold mb-3 mt-4">My Posts</h3>
          <div className="flex flex-col space-y-4">
            {authorPosts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={getSingleUser}
                className="shadow-md p-4 rounded-lg bg-gray-100"
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
