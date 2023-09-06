import * as index from '../storage/index.mjs';

/**
 *Sets the logout listener for the logout button.
 */
export function setLogoutListener() {
  const logoutButton = document.querySelector('#logout');

  logoutButton.addEventListener('click', () => {
    index.remove('token');
    index.remove('name');
    logoutButton.remove();
    location.href = '/';
  });
}
