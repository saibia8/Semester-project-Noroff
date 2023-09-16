import { getProfile, isLoggedIn } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";
import createOptions from "../../auth/createOptions.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";

export default async function buildInfoUpdate() {
  const pCredits = document.getElementById("credits");
  const form = document.querySelector("#updateForm");
  const formTitle = document.getElementById("itemTitle");
  if (isLoggedIn()) {
    const userProfile = getProfile();
    const url = new URL(location.href);
    const id = url.searchParams.get("id");
    const endpointListing = `listings/${id}`;
    const container = document.getElementById("message");

    const { data, error } = await makeApiCall(endpointListing);

    if (error) {
      return displayMessage("danger", error, container);
    }

    console.log(data);

    pCredits.innerHTML = `Credits: ${userProfile.credits}`;

    listeners.setLogoutListener();

    formTitle.value = data.title;

    if (form) {
      form.addEventListener("submit", async (event) => {
        let sendData = {};
        let tagsData = [];
        let mediaData = [];
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        console.log(profile);

        sendData.title = profile.title;
        sendData.endsAt = profile.deadline;
        sendData.description = profile.descriptionArea;

        if (profile.itemPhoto1 !== "") {
          mediaData.push(profile.itemPhoto1);
        }
        if (profile.itemPhoto2 !== "") {
          mediaData.push(profile.itemPhoto2);
        }
        if (profile.itemPhoto3 !== "") {
          mediaData.push(profile.itemPhoto3);
        }
        if (profile.itemPhoto4 !== "") {
          mediaData.push(profile.itemPhoto4);
        }
        if (profile.itemPhoto5 !== "") {
          mediaData.push(profile.itemPhoto5);
        }

        sendData.media = mediaData;
        tagsData = profile.tags.split(",");
        sendData.tags = tagsData;

        console.log(sendData);

        const endpointUpdate = `listings/${id}`;
        const method = "PUT";

        //   const options = createOptions(method, sendData, {}, true);

        //   const update = await makeApiCall(endpointUpdate, options);

        //   if (update.error) {
        //     return displayMessage("danger", update.error, "#message");
        //   }

        //   displayMessage("success", `Updated successfully!`, "#message");

        //   console.log(update.data);

        //   form.reset();

        //   window.location.href = "#";
      });
    }
  }
}
