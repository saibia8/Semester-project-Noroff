import { isLoggedIn } from "../../../helpers/storage.mjs";
import displayLoggedInMenu from "../templates/displayLoggedInMenu.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import displayAuctionDetails from "../templates/displayAuctionDetails.mjs";

export default async function buildDetailAuction() {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");
  const container = document.getElementById("auction");
  const endpoint = `listings/${id}/?_bids=true&_seller=true`;

  const { data, error } = await makeApiCall(endpoint);

  if (error) {
    return displayMessage("danger", error, container);
  }

  displayAuctionDetails(data, container);

  if (isLoggedIn()) {
    displayLoggedInMenu();
  }
}
