import { isLoggedIn } from "../../../helpers/storage.mjs";
import displayLoggedInMenu from "../templates/displayLoggedInMenu.mjs";

export default function buildDetailAuction(){
   if (isLoggedIn()) {
      displayLoggedInMenu();
   }
}