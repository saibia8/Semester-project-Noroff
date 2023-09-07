import { isLoggedIn, getProfile } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";

export function buildInfo() {
   const pCredits = document.getElementById("credits");
   const btnLogout = document.getElementById("logout");
   if (isLoggedIn()) {
      const profile = getProfile();
      pCredits.innerHTML = `Credits: ${profile.credits}`;
      listeners.setLogoutListener();
    }
}
