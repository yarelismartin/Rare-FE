import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export default deleteComment;
