import { API_SOCIAL_URL } from '../constants.mjs';

const action = '/auth/register';
const method = 'POST';

export async function register(profile) {
  const registerUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body,
  });
  const result = await response.json();
  console.log(result);

  alert(`${result.name} created account`);
  location.href = '/user/account/index.html';

  return result;
}
