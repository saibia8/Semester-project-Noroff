import { login } from '../api/auth/login.mjs';
import * as index from '../storage/index.mjs';
import displayMessage from '../api/ui/common/displayMessage.mjs';

export function setLoginFormListener() {
  const form = document.querySelector('#loginForm');

  if (form) {
    form.addEventListener('submit', handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const emailData = formData.get('email');
  const passwordData = formData.get('password');

  const button = form.querySelector('button');
  button.innerText = 'Logging in...';

  try {
    const bodyData = { email: emailData, password: passwordData };
    const response = await login(bodyData);
    index.save('token', response.accessToken);
    index.save('name', response.name);
    index.save('profile', response);
    location.href = '/user/account/index.html';
  } catch (error) {
    displayMessage('danger', error, '#message');
  } finally {
    button.innerText = 'Login';
  }
}
