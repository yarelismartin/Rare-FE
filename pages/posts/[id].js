/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { getSinglePost } from '../../api/postData';
import CommentCard from '../../components/cards/CommentCard';
import CommentForm from '../../components/forms/CommentForm';
import { useAuth } from '../../utils/context/authContext';

export default function PostDetails() {
  const [post, setPost] = useState({});
  const { user } = useAuth();

  // grab the postId from the path name
  const router = useRouter();
  const { id } = router.query;

  const getAPost = () => {
    getSinglePost(id).then(setPost);
  };

  useEffect(() => {
    getAPost(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };
  return (
    <div>
      <div>
        <div>
          <p>{post.title}</p>
          <p>{post.category?.label}</p>
        </div>
        <div className="img-container">
          <img src={post.imgURL} alt="post-img-url" />
        </div>
        <div className="text-container">
          <div className="flex flex-row">
            <div>
              <img
                src={post.author?.imageURL}
                alt="author"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <p className="font-thin">By {post.author?.firstName} {post.author?.lastName}</p>
            </div>
            <p className="ml-4">{formatDate(post.publicationDate)}</p>
          </div>
          <div>
            {post.tags?.map((t) => (
              <p key={t.id}>#{t.label}</p>
            ))}
          </div>
          <div><p>{post.content}</p></div>
        </div>
      </div>
      <div>
        <CommentForm author={user.id} post={Number(id)} onUpdate={getAPost} />
      </div>
      <div>
        {post.comments?.map((comment) => (
          <CommentCard commentObj={comment} onUpdate={getAPost} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
