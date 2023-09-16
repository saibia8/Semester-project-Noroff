import createOptions from "../api/auth/createOptions.mjs";
import makeApiCall from "../api/auth/makeApiCall.mjs";
import { displayMessage } from "../api/ui/common/displayMessage.mjs";
import displayAuctionDetails from "../api/ui/templates/displayAuctionDetails.mjs";

export default async function bid(id, amount, message, container) {
  const endpoint = `listings/${id}/bids?_seller=true&_bids=true`;
  const method = "POST";
  const sendData = { amount };

  const options = createOptions(method, sendData, {}, true);

  const { data, error } = await makeApiCall(endpoint, options);

  if (error) {
    return displayMessage("warning", error, message);
  }

  displayAuctionDetails(data, container, true);
}
