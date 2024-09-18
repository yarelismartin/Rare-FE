import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createComment } from '../../api/commentData';

const nullComment = {
  content: '',
};

export default function CommentForm({ onUpdate, author, post }) {
  const [formInput, setFormInput] = useState(nullComment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,

    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInput.content.trim()) {
      alert('Please fill out this field.');
    } else {
      const payload = { ...formInput, authorId: author, postId: post };
      createComment(payload).then(() => {
        setFormInput(nullComment);
        onUpdate();
      });
    }
  };

  return (
    <div style={{
      border: '1px solid', margin: '20px auto', padding: '15px 0px', borderRadius: '10px', borderColor: '#0089FF',
    }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="input-form" style={{ marginTop: '0px' }}>
          <Form.Control
            style={{
              border: '1.6px solid', borderColor: '#CBC9C9', fontSize: '14px',
            }}
            as="textarea"
            rows={5}
            placeholder="Make a comment..."
            name="content"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleSubmit(e);
              }
            }}
            value={formInput.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <hr style={{ backgroundColor: '#CBC9C9', margin: '10px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
          <Button style={{ fontSize: '14px' }} type="submit">Comment</Button>
        </div>
      </Form>
    </div>
  );
}

CommentForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  author: PropTypes.number.isRequired,
  post: PropTypes.number.isRequired,
};
