import { isLoggedIn } from "../../../helpers/storage.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { displayAuctions } from "../templates/displayAuctions.mjs";
import displayLoggedInMenu from "../templates/displayLoggedInMenu.mjs";

export default async function buildInfoAuction() {
   const container = document.getElementById("auctions");
   const endpoint = "listings?_bids=true&limit=12";
   const showMoreBtn = document.getElementById("showMore");
 
   if (isLoggedIn()) {
     displayLoggedInMenu();
   }

   const { data, error } = await makeApiCall(endpoint);
 
   if (error) {
     return displayMessage("danger", error, container);
   }
 
   displayAuctions(data, container);

   showMoreBtn.classList.remove("d-none");
 }