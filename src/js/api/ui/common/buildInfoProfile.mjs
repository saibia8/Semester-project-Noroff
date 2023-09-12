import { isLoggedIn, getName } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";
import createOptions from "../../auth/createOptions.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { displayAuctions } from "../templates/displayAuctions.mjs";

export async function buildInfoProfile() {
  const pCredits = document.getElementById("credits");
  const container = document.getElementById("profile");
  const avatarImg = document.getElementById("avatarImg");
  const userName = document.getElementById("userName");
  const userCredits = document.getElementById("creditsUser");
  const auctions = document.getElementById("auctions");
  
  if (isLoggedIn()) {
    const endpointProfile = `profiles/${getName()}`;
    const endpointListings = `profiles/${getName()}/listings?_bids=true`;

    const options = createOptions("GET", null, {}, true);

    const { data, error } = await makeApiCall(endpointProfile, options);

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

    const listings = await makeApiCall(endpointListings, options);
   
    if (listings.error) {
      return displayMessage("danger", listings.error, container);
    }

    console.log(listings.data);
    displayAuctions(listings.data, auctions);
  }
}
