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
        ><span class="fs-3"><i class="bi bi-person-circle "></i></span></a>
    </div>
    <button class="log-out-btn" id="logout">
      Log out<span>
      <i class="bi bi-box-arrow-right"></i>
      </span>
    </button>
    `;

    listeners.setLogoutListener();
  }
}
