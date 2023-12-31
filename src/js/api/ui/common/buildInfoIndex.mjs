import { isLoggedIn } from "../../../helpers/storage.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { displayAuctions } from "../templates/displayAuctions.mjs";
import displayLoggedInMenu from "../templates/displayLoggedInMenu.mjs";

export default async function buildInfoIndex() {
  const container = document.getElementById("auctions");
  const endpoint = "listings?sort=created&_bids=true&limit=8&_active=true";
  const startBidingBtn = document.getElementById("startBiding");

  const { data, error } = await makeApiCall(endpoint);

  if (error) {
    return displayMessage("danger", error, container);
  }

  displayAuctions(data, container);

  if (isLoggedIn()) {
    startBidingBtn.href = "/listings/";
    displayLoggedInMenu();
  }
}
