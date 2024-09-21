/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { format } from 'date-fns';
import { deletePost } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';

export default function PostCard({ post, onUpdate }) {
  // const { user } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${post.title}?`)) {
      deletePost(post.id).then(() => onUpdate());
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const isOwner = user.id === post.author?.id || user.id === Number(id);

  return (
    <div>
      <Card style={{ width: '40rem' }}>
        {post.imageURL ? <Card.Img variant="top" src={post.imageURL} style={{ width: '100%', height: '250px', objectFit: 'cover' }} /> : ''}
        <Card.Body>
          <div className="flex">
            <Link href={`/posts/${post.id}`} passHref>
              <Card.Title className="post-card-link">{post.title}</Card.Title>
            </Link>
            {isOwner && (
            <div className="menu-container">
              <button type="button" className="menu-button" onClick={toggleDropdown} aria-label="Open options menu">
                <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </button>
              {isDropdownVisible && (
              <div className="dropdown-menu" style={{ display: 'block' }}>
                <button type="button" className="dropdown-item" onClick={() => { router.push(`/posts/edit/${post.id}`); }}>
                  <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7029 1.87868L10.1171 0.292893C9.72658 -0.0976311 9.09342 -0.0976311 8.70289 0.292893L7.499 1.495L10.499 4.495L11.7029 3.29289C12.0934 2.90237 12.0934 2.2692 11.7029 1.87868ZM9.085 5.909L6.085 2.909L0 8.995V12H2.994L9.085 5.909Z" fill="black" />
                  </svg>
                  Edit Post
                </button>
                <button type="button" className="dropdown-item delete" onClick={deleteThisPost}>
                  <span className="comment-icon">
                    <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1V0H4V1H1V3H11V1H8ZM9.33333 12L10 4H2L2.66667 12H9.33333Z" fill="black" />
                    </svg>
                  </span>
                  Delete
                </button>
              </div>
              )}
            </div>
            )}
          </div>
          {post.author
            ? (
              <>
                <Link href={`/users/${post.author.id}`} passHref>
                  <Card.Subtitle className="mb-2 post-card-link">
                    {post.author.firstName} {post.author.lastName}
                  </Card.Subtitle>
                </Link>
              </>
            )
            : '' }
          <Card.Text>{post.category.label}</Card.Text>
          <Card.Text>{formatDate(post.publicationDate)}</Card.Text>
          <Card.Text style={{ maxHeight: '20vh', overflow: 'hidden' }}>{post.content}</Card.Text>
          <Link href={`/posts/${post.id}`} passHref>
            <Card.Text style={{ marginTop: '10px' }}><b>Keep Reading...</b></Card.Text>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.object,
    author: PropTypes.object,
    content: PropTypes.string,
    imageURL: PropTypes.string,
    publicationDate: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
