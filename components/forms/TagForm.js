import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createTag } from '../../api/tagData';

export default function TagForm({ onUpdate }) {
  const [formData, setFormData] = useState({ label: '' });

  const handleChange = (e) => {
    setFormData({ label: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag(formData).then((response) => {
      if (!response.id) {
        window.alert('Tag already exists');
      }
      setFormData({ label: '' });
      onUpdate();
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Create Tag</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a tag to create"
          name="label"
          value={formData.label}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="mt-3"
      >Create Tag
      </Button>
    </Form>
  );
}

TagForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
