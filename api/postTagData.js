import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const addPostTag = (postId, tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}/add-tag/${tagId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(reject);
});

const removePostTag = (postId, tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}/remove-tag/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(reject);
});

export { addPostTag, removePostTag };
