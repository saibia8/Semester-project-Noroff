import { isLoggedIn, getName } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";
import createOptions from "../../auth/createOptions.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";

export async function buildInfo() {
  const pCredits = document.getElementById("credits");
  const container = document.getElementById("profile");
  const avatarImg = document.getElementById("avatarImg");
  const userName = document.getElementById("userName");
  const userCredits = document.getElementById("creditsUser");
  if (isLoggedIn()) {
    const endpoint = `profiles/${getName()}`;

    const options = createOptions("GET", null, {}, true);

    const { data, error } = await makeApiCall(endpoint, options);

    if (error) {
      return displayMessage("danger", error, container);
    }

    console.log(data);    

    pCredits.innerHTML = `Credits: ${data.credits}`;

    listeners.setLogoutListener();
    
    if (data.avatar) {
      avatarImg.src = data.avatar;
    }
    
    if (data.name) {
      userName.innerText = data.name;
    }
    
    if (data.credits) {
      userCredits.innerText = data.credits;
    }
  }
}
