import * as listeners from "./handlers/index.mjs";
//import buildPosts from "./api/ui/common/buildPosts.mjs";
import { buildInfo } from "./api/ui/common/buildInfo.mjs";
import buildInfoIndex from "./api/ui/common/buildInfoIndex.mjs";
import { redirectBasedOnLogin } from "./helpers/auth.mjs";

export default function router() {
  const pathname = window.location.pathname;

  redirectBasedOnLogin(pathname);
  //buildPosts();

  switch (pathname) {
    case "/":
    case "/index.html":
      buildInfoIndex();
      break;
    case "/user/register/":
    case "/user/register/index.html":
      listeners.setRegisterFormListener();
      break;
    case "/user/login/":
    case "/user/login/index.html":
      listeners.setLoginFormListener();
      break;
    case "/user/account/":
    case "/user/account/index.html":
    case "/user/profile/":
    case "/user/profile/index.html":
      buildInfo();
      break;
  }
}
