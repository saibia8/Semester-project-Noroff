import { isLoggedIn } from "../../../helpers/storage.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { displayAuctions } from "../templates/displayAuctions.mjs";
import displayLoggedInMenu from "../templates/displayLoggedInMenu.mjs";

export default async function buildInfoAuction() {
  const container = document.getElementById("auctions");
  const endpoint = "listings?_bids=true&limit=12";
  const showMoreBtn = document.getElementById("showMore");
  const loadMoreBtn = document.getElementById("loadMore");
  let limit = 12;

  if (isLoggedIn()) {
    displayLoggedInMenu();
  }

  const { data, error } = await makeApiCall(endpoint);

  if (error) {
    return displayMessage("danger", error, container);
  }

  displayAuctions(data, container);

  showMoreBtn.classList.remove("d-none");

  loadMoreBtn.addEventListener("click", async () => {
    limit += 12;
    
    const endpointMore = `listings?_bids=true&limit=${limit}`;
    const { data, error } = await makeApiCall(endpointMore);

    if (error) {
      return displayMessage("danger", error, container);
    }

    displayAuctions(data, container);

    if (data.length % 12 !== 0) {
      showMoreBtn.classList.add("d-none");
    }
  });
}
