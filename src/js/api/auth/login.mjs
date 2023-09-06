import { API_SOCIAL_URL } from '../constants.mjs';

const action = '/auth/login';
const method = 'POST';

export async function login(profile) {
  const loginUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body,
  });

  if (!response.ok) {
    throw new Error('Either the username or password is incorrect!');
  }

  return await response.json();
}
