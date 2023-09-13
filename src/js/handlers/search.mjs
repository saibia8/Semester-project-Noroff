import makeApiCall from "../api/auth/makeApiCall.mjs";
import { displayMessage } from "../api/ui/common/index.mjs";
import { displayAuctions } from "../api/ui/templates/displayAuctions.mjs";

export function setSearchForm() {
  const form = document.querySelector("#search");
  const container = document.getElementById("auctions");
  const showMoreBtn = document.getElementById("showMore");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      const endpoint = `listings?_bids=true&_tag=${profile.tag}`;

      const { data, error } = await makeApiCall(endpoint);

      if (error) {
        return displayMessage("danger", error, container);
      }

      if (data.length !== 0) {
         displayAuctions(data, container);
         showMoreBtn.classList.remove("d-none");
      }else{
         displayMessage("warning", "Sorry no search results!", container);
         showMoreBtn.classList.add("d-none");
      }
      
    });
  }
}
