/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { getSinglePost, deletePost } from '../../api/postData';
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

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${post.title}?`)) {
      deletePost(post.id).then(() => router.push('/'));
    }
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

  const isOwner = user.id === post.author?.id;

  return (
    <div className="post-details-container mt-7 mb-20">
      {/* Blog Title and Category */}
      <div className="post-header text-center">
        <h1 className="post-title text-7xl font-black">{post.title}</h1>
      </div>

      {/* Post Image */}
      {post.imageURL && (
      <div className="img-container mt-9">
        <img
          src={post.imageURL}
          alt="post-img-url"
          style={{
            width: '100%',
            height: '60vh',
            objectFit: 'cover',
          }}
        />
      </div>
      )}

      <div className="w-[85%] m-auto">

        {/* Author */}
        <div className="post-meta-container mb-3">
          <div className="post-meta flex justify-between items-center mt-8">
            <div className="flex">
              <img
                src={post.author?.imageURL}
                alt="author"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <p className="font-semibold mt-auto">By {post.author?.firstName} {post.author?.lastName}</p>
            </div>
            <p className="font-light mt-auto">{formatDate(post.publicationDate)}</p>

          </div>
        </div>
        <p className="post-category font-medium">{post.category?.label}</p>

        {/* Post Tags */}
        <div className="post-tags flex gap-2 flex-wrap">
          {post.tags?.map((t) => (
            <span key={t.id} className="tag"> #{t.label}</span>
          ))}
        </div>

        {/* Post Content */}
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <div>
          {isOwner && (
            <>
              <Button href={`/posts/edit/${post.id}`} variant="secondary" className="me-2">Edit</Button>
              <Button onClick={deleteThisPost} variant="danger">Delete</Button>
            </>
          )}
        </div>

        {/* Comment Form */}
        <div className="comment-section">
          <CommentForm author={user.id} post={Number(id)} onUpdate={getAPost} />
        </div>

        {/* Comments */}
        <div className="comments-list">
          {post.comments?.map((comment) => (
            <CommentCard commentObj={comment} onUpdate={getAPost} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
