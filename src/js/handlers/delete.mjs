import createOptions from "../api/auth/createOptions.mjs";
import makeApiCall from "../api/auth/makeApiCall.mjs";
import { displayMessage } from "../api/ui/common/displayMessage.mjs";

export default async function deleteListing(id) {
   const endpointDelete = `listings/${id}`;
      const methodDelete = "DELETE";
      const optionsDelete = createOptions(methodDelete, null, {}, true);
      console.log(endpointDelete);
      const { error } = await makeApiCall(endpointDelete, optionsDelete);

      if (error) {
        return displayMessage("danger", error, "#message");
      }
}