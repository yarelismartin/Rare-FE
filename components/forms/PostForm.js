import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../../api/postData';
import getAllCategories from '../../api/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { getAllTags, createTag } from '../../api/tagData';
import { addPostTag, removePostTag } from '../../api/postTagData';

const nullPost = {
  title: '',
  content: '',
  imageURL: '',
  categoryId: 0,
};

export default function PostForm({ postObj }) {
  const [formData, setFormData] = useState(nullPost);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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

  const handleTagChange = (selections) => {
    setSelectedTags(selections);
  };

  // The CreatableSelect component stores tag data as an array of objects where
  // tags that exist in the "tags" state array (returned from the db) are stored as
  // { value: {tag.id}, label: {tag.label} }
  // and tags that do not exist in the "tags" state array (and need to be created) as
  // { value: "NewTag", label: "NewTag", __isNew__: true }
  const managePostTags = async (postId) => {
    // Create array of promises for tags that need to be added to post
    const addedTags = await selectedTags
      // Filter out tags that were on the post and will remain on the post after update
      .filter((tag) => !postObj?.tags?.some((postTag) => postTag.id === tag.value))
      .map((tag) => {
        // If tag.value is of type string, then tag does not yet exist and needs to be created
        // before adding it to the post
        if (typeof tag.value === 'string') {
          return createTag({ label: tag.label }).then(({ id }) => addPostTag(postId, id));
        }
        // Otherwise, tag.value is an int corresponding to the tagId in the db
        // and only a call to add the postTag is necessary
        return addPostTag(postId, tag.value);
      // If no postTags need to be added, set addedTags to an empty array (rather than undefined)
      }) || [];

    // Create array of promises for tags that need to be removed from post (on update only)
    // Iterate through tags from initial postObj
    const removedTags = await postObj?.tags
      // Filter out tags that exist in the selectedTags array (and will remain on the post)
      ?.filter((tag) => !selectedTags.some((sTag) => sTag.value === tag.id))
      // For tags that exist in old list (postObj.tags) and not in new list (selectedTags)
      // call removePostTag
      // If no postTags need to be removed, set removedTags to an empty array (rather than undefined)
      ?.map((tag) => removePostTag(postId, tag.id)) || [];

    // Flatten addedTags and removedTags into single array
    // and ensure all promises resolve before exiting function
    await Promise.all([...addedTags, ...removedTags]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj?.id) {
      updatePost(postObj.id, { ...formData, authorId: user.id }).then(() => {
        // Call managePostTags to create/delete postTags from multi-select data
        managePostTags(postObj.id).then(() => router.push(`/posts/${postObj.id}`));
      });
    } else {
      createPost({
        ...formData,
        authorId: user.id,
      }).then(({ id }) => {
        managePostTags(id).then(() => router.push(`/posts/${id}`));
      });
    }
  };

  useEffect(() => {
    getCategories();
    getAllTags().then(setTags);
    if (postObj?.id) {
      setFormData({ ...postObj, categoryId: postObj.category.id });
      setSelectedTags(postObj.tags.map((tag) => ({ value: tag.id, label: tag.label })));
    }
  }, [postObj]);

  return (
    <Form onSubmit={handleSubmit} className="mt-7 w-[80%] ml-auto mr-auto">
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

      <Form.Group className="mt-2">
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

      <Form.Group className="mt-2">
        <Form.Label> Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mt-4">
        <Form.Label label="Category">
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

      <CreatableSelect
        instanceId="tagSelect"
        aria-label="Tags"
        name="tags"
        className="mb-3"
        placeholder="Select or Create a Tag..."
        value={selectedTags}
        isMulti
        onChange={handleTagChange}
        options={tags.map((tag) => ({ value: tag.id, label: tag.label }))}
      />

      <Button variant="primary" type="submit"> {postObj.id ? 'Update Post' : 'Create Post'}
      </Button>
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
    category: PropTypes.shape({
      id: PropTypes.number,
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })),
  }),
};

PostForm.defaultProps = {
  postObj: nullPost,
};
