import * as listeners from './handlers/index.mjs';
import buildPosts from './api/ui/common/buildPosts.mjs';
import { redirectBasedOnLogin } from './helpers/auth.mjs';

export default function router() {
  const pathname = window.location.pathname;

  redirectBasedOnLogin(pathname);
  buildPosts();

  switch (pathname) {
    case '/':
    case '/index.html':
      break;
    case '/user/register/':
    case '/user/register/index.html':
      listeners.setRegisterFormListener();
      break;
    case '/user/login/':
    case '/user/login/index.html':
      listeners.setLoginFormListener();
      break;
  }
}
