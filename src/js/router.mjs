import * as listeners from "./handlers/index.mjs";
import { buildInfoProfile } from "./api/ui/common/buildInfoProfile.mjs";
import buildInfoIndex from "./api/ui/common/buildInfoIndex.mjs";
import { redirectBasedOnLogin } from "./helpers/auth.mjs";

export default function router() {
  const pathname = window.location.pathname;

  redirectBasedOnLogin(pathname);

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
      break;
    case "/user/profile/":
    case "/user/profile/index.html":
      buildInfoProfile();
      break;
  }
}
