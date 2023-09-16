import { isLoggedIn } from './storage.mjs';

export function redirectBasedOnLogin(pathname) {
  if (isLoggedIn()) {
    if (
      pathname === '/user/login/' ||
      pathname === '/user/login/index.html' ||
      pathname === '/user/register/' ||
      pathname === '/user/register/index.html'
    ) {
      location.href = '/';
    }
  } else {
    if (
      pathname === '/user/account/' ||
      pathname === '/user/account/index.html' ||
      pathname === "/user/profile/" ||
      pathname === "/user/profile/index.html" ||
      pathname === "/user/listing/" ||
      pathname === "/user/listing/index.html" ||
      pathname === "/user/update/" ||
      pathname === "/user/update/index.html"
    ) {
      location.href = '/index.html';
    }
  }
}
