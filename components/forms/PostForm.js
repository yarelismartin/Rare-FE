import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../../api/postData';
import getAllCategories from '../../api/categoryData';
import { useAuth } from '../../utils/context/authContext';

const nullPost = {
  title: '',
  content: '',
  imageURL: '',
};

export default function PostForm({ postObj, onUpdate }) {
  const [formData, setFormData] = useState(nullPost);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getCategories = () => {
    getAllCategories().then(setCategories);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj?.id) {
      updatePost(postObj.id, formData).then(() => {
        onUpdate();
        router.push(`/posts/${postObj.id}`);
      });
    } else {
      createPost({
        ...formData,
        authorId: user.id,
      }).then(() => {
        onUpdate();
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getCategories();
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label> Title of Post</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a title..."
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label> Article Content</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="What do you have to share..."
          name="content"
          style={{ height: '140px' }}
          value={formData.content}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label> Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label controlId="categorySelect" label="Category">
          <Form.Select
            aria-label="Category"
            name="categoryId"
            onChange={handleChange}
            className="mb-3"
            value={formData.categoryId}
            required
          >
            <option value="">Select a Category</option>
            {
            categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.label}
              </option>
            ))
          }
          </Form.Select>
        </Form.Label>
      </Form.Group>

    </Form>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    imageURL: PropTypes.string,
    authorId: PropTypes.string,
    image: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

PostForm.defaultProps = {
  postObj: nullPost,
};
