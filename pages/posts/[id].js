/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { getSinglePost } from '../../api/postData';
import CommentCard from '../../components/cards/CommentCard';

export default function PostDetails() {
  const [post, setPost] = useState({});

  // grab the postId from the path name
  const router = useRouter();
  const { id } = router.query;

  const getAPost = () => {
    getSinglePost(id).then(setPost);
  };

  useEffect(() => {
    getAPost(post);
    console.warn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  console.warn(post);
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
              <p>#{t.label}</p>
            ))}
          </div>
          <div><p>{post.content}</p></div>
        </div>
      </div>
      <div>
        {post.comments?.map((comment) => (
          <CommentCard commentObj={comment} />
        ))}
      </div>
    </div>
  );
}
