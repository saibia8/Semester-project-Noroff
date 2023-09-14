import * as listeners from "./handlers/index.mjs";
import { buildInfoProfile } from "./api/ui/common/buildInfoProfile.mjs";
import buildInfoIndex from "./api/ui/common/buildInfoIndex.mjs";
import { redirectBasedOnLogin } from "./helpers/auth.mjs";
import buildInfoAccount from "./api/ui/common/buildInfoAccount.mjs";
import buildInfoListing from "./api/ui/common/buildInfoListing.mjs";
import buildInfoAuction from "./api/ui/common/buildInfoAuction.mjs";
import { setSearchForm } from "./handlers/search.mjs";

export default function router() {
  const pathname = window.location.pathname;

  redirectBasedOnLogin(pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      buildInfoIndex();
      setSearchForm(pathname);
      break;
    case "/listings/":
    case "/listings/index.html":
      buildInfoAuction();
      setSearchForm(pathname);
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
      buildInfoAccount();
      break;
    case "/user/profile/":
    case "/user/profile/index.html":
      buildInfoProfile();
      setSearchForm(pathname);
      break;
    case "/user/listing/":
    case "/user/listing/index.html":
      buildInfoListing();
      break;
  }
}
