import { isLoggedIn } from "../../../helpers/storage.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";
import { displayAuctions } from "../templates/displayAuctions.mjs";
import displayLoggedInMenu from "../templates/displayLoggedInMenu.mjs";

export default async function buildInfoAuction() {
  const container = document.getElementById("auctions");
  const showMoreBtn = document.getElementById("showMore");
  const loadMoreBtn = document.getElementById("loadMore");
  const sortInput = document.getElementById("sortBy");
  const filterInput = document.getElementById("filter");
  const listingsBidsUrl = "listings?_bids=true";
  const limitStrUrl = "&limit=";
  const sortUrl = "&sort=";
  const sortOrderUrl = "&sortOrder=";
  let limitNr = 12;
  let sortStr = "";
  let sortOrderStr = "";
  let endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}`;

  if (isLoggedIn()) {
    displayLoggedInMenu();
  }

  const { data, error } = await makeApiCall(endpoint);

  if (error) {
    return displayMessage("danger", error, container);
  }

  displayAuctions(data, container);

  showMoreBtn.classList.remove("d-none");

  sortInput.addEventListener("change", async (event) => {
    switch (event.target.value) {
      case "Ending latest":
        sortOrderStr = "";
        sortStr = "endsAt";
        endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}${sortUrl}${sortStr}`;
        console.log("ending soonest", endpoint);

        const data1 = await makeApiCall(endpoint);

        if (data1.error) {
          return displayMessage("danger", data1.error, container);
        }

        displayAuctions(data1.data, container);
        break;
      case "Ending soonest":
        sortStr = "endsAt";
        sortOrderStr = "asc";
        endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}${sortUrl}${sortStr}${sortOrderUrl}${sortOrderStr}`;
        console.log("ending latest", endpoint);

        const data2 = await makeApiCall(endpoint);

        if (data2.error) {
          return displayMessage("danger", data2.error, container);
        }

        displayAuctions(data2.data, container);
        break;
      case "Newest":
        sortOrderStr = "";
        sortStr = "created";
        endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}${sortUrl}${sortStr}`;
        console.log("newest", endpoint);

        const data3 = await makeApiCall(endpoint);

        if (data3.error) {
          return displayMessage("danger", data3.error, container);
        }

        displayAuctions(data3.data, container);
        break;
        case "Oldest":
        sortOrderStr = "asc";
        sortStr = "created";
        endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}${sortUrl}${sortStr}${sortOrderUrl}${sortOrderStr}`;
        console.log("oldest", endpoint);

        const data4 = await makeApiCall(endpoint);

        if (data4.error) {
          return displayMessage("danger", data4.error, container);
        }

        displayAuctions(data4.data, container);
        break;
    }
  });

  loadMoreBtn.addEventListener("click", async () => {
    limitNr += 12;

    if (sortStr !== "") {
      if (sortOrderStr !== "") {
        endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}${sortUrl}${sortStr}${sortOrderUrl}${sortOrderStr}`;
      } else {
        endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}${sortUrl}${sortStr}`;
      }
    } else {
      endpoint = `${listingsBidsUrl}${limitStrUrl}${limitNr}`;
    }

    const { data, error } = await makeApiCall(endpoint);

    if (error) {
      return displayMessage("danger", error, container);
    }

    displayAuctions(data, container);

    if (data.length % 12 !== 0 || data.length === 96) {
      showMoreBtn.classList.add("d-none");
    }
  });
}
