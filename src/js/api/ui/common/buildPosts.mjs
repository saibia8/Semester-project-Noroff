import { isLoggedIn, getCredits } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";

export default function buildPosts() {
  const menuDivLogin = document.getElementById("loginOrLogout");
  if (isLoggedIn()) {
    menuDivLogin.innerHTML = "";
    const profile = getCredits();

    menuDivLogin.id = "logout";
    menuDivLogin.innerHTML = `<div
    class="d-flex justify-content-center align-items-center gap-4"
  >
    <div
      class="d-flex justify-content-center align-items-center gap-3"
    >
      <p class="text-white mb-0 text-uppercase fw-semibold">
        ${profile.credits}
      </p>
      <a href="/" class="nav-link"
        ><span class="fs-3"
          ><i class="bi bi-person-circle"></i></span
      ></a>
    </div>
    <button class="log-out-btn">
      Log out<span class="ms-2"
        ><i class="bi bi-box-arrow-right"></i
      ></span>
    </button>
  </div>`;

    listeners.setLogoutListener();
  }
}
