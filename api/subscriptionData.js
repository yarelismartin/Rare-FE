import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserSubscriptions = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscription/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addSubscription = (userId, authorId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/${userId}/add/${authorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const endSubscription = (userId, authorId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/${userId}/add/${authorId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getUserSubscriptions, addSubscription, endSubscription };
