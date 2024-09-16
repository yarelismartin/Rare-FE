import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

console.warn(endpoint);

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getSinglePost;
