import { isLoggedIn, getName } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";
import createOptions from "../../auth/createOptions.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";

export default async function buildInfoAccount() {
  const pCredits = document.getElementById("credits");
  const container = document.getElementById("account");
  const form = document.querySelector("#editProfile");
  const oldEmail = document.querySelector("#oldEmail");
  const oldName = document.querySelector("#oldUsername");
  const avatar = document.querySelector("#inputAvatarUrl");
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

    oldEmail.value = data.email;
    oldName.value = data.name;
    if (data.avatar === null) {
      avatar.value = "";
    } else {
      avatar.value = data.avatar;
    }

    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());
        console.log(profile);

        const endpoint = `profiles/${getName()}/media`;
        const method = "PUT";

        const options = createOptions(method, profile, {}, true);
        
        const { error } = await makeApiCall(endpoint, options);

        if (error) {
          return displayMessage("danger", error, "#message");
        }

        displayMessage("success", `Update successfull!`, "#message");

        form.reset();
      });
    }
  }
}
