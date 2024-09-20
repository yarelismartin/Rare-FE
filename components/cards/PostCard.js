/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Card, Col } from 'react-bootstrap';
import Link from 'next/link';
import { format } from 'date-fns';
import { deletePost } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';

export default function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  console.warn(id);

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

  return (
    <Col xs={12} md={6}>
      <Card className="my-3">
        <Card.Img variant="top" src={post.imageURL} />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.category.label}</Card.Text>
          <Card.Text>{formatDate(post.publicationDate)}</Card.Text>
          {post.author
            ? (
              <Link href={`/users/${post.author.id}`} passHref>
                <Card.Text>{post.author.firstName} {post.author.lastName}</Card.Text>
              </Link>
            )
            : '' }

          <Card.Text>{post.content}</Card.Text>
          <Button href={`/posts/${post.id}`} variant="primary" className="me-2">View</Button>
          {user.id === post.author?.id && (
            <>
              <Button href={`/posts/edit/${post.id}`} variant="secondary" className="me-2">Edit</Button>
              <Button onClick={deleteThisPost} variant="danger">Delete</Button>
            </>
          )}
          {console.warn(user.id, id)}
          {user.id.toString() === id && (
            <>
              <Button href={`/posts/edit/${post.id}`} variant="secondary" className="me-2">Edit</Button>
              <Button onClick={deleteThisPost} variant="danger">Delete</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
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
