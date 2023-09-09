import { isLoggedIn, getProfile } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { displayAuctions } from "../templates/displayAuctions.mjs";

export default async function buildInfoIndex() {
  const menuDivLogin = document.getElementById("loginOrLogout");
  const container = document.getElementById("auctions");
  if (isLoggedIn()) {
    menuDivLogin.innerHTML = "";
    menuDivLogin.classList.remove("d-grid", "gap-3", "d-lg-block");
    menuDivLogin.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "gap-4"
    );
    const profile = getProfile();

    menuDivLogin.innerHTML = `
    <div class="d-flex justify-content-center align-items-center gap-3">
      <p class="text-white mb-0 text-uppercase fw-semibold">
        Credits: ${profile.credits}
      </p>
      <a href="/user/profile/" class="nav-link"
        ><span class="fs-3"><i class="bi bi-person-circle "></i></span></a>
    </div>
    <button class="log-out-btn" id="logout">
      Log out<span>
      <i class="bi bi-box-arrow-right"></i>
      </span>
    </button>
    `;

    listeners.setLogoutListener();
  } else {
    const endpoint = "listings";

    const { data, error } = await makeApiCall(endpoint);

    if (error) {
      return displayMessage("danger", error, container);
    }

    displayAuctions(data, container);
  }
}
