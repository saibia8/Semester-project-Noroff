import { isLoggedIn, getProfile } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";

export default function buildInfoLogout() {
  const menuDivLogin = document.getElementById("loginOrLogout");
  if (isLoggedIn()) {
    menuDivLogin.innerHTML = "";
    menuDivLogin.classList.remove("d-grid", "gap-3", "d-lg-block");
    menuDivLogin.classList.add("d-flex", "justify-content-center", "align-items-center", "gap-4");
    const profile = getProfile();

    menuDivLogin.innerHTML = `
    <div class="d-flex justify-content-center align-items-center gap-3">
      <p class="text-white mb-0 text-uppercase fw-semibold">
        Credits: ${profile.credits}
      </p>
      <a href="/user/account/index.html" class="nav-link"
        ><span
          ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle user-icon" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg></span
      ></a>
    </div>
    <button class="log-out-btn" id="logout">
      Log out<span class="ms-2"
        ><i class="bi bi-box-arrow-right"></i
      ></span>
    </button>
    `;

    listeners.setLogoutListener();
  }
}
