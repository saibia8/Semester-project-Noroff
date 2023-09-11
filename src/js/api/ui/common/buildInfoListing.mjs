import { getProfile, isLoggedIn } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";
import createOptions from "../../auth/createOptions.mjs";
import makeApiCall from "../../auth/makeApiCall.mjs";
import { displayMessage } from "./displayMessage.mjs";

export default async function buildInfoListing() {
   const pCredits = document.getElementById("credits");
   const form = document.querySelector("#registerForm");
   if (isLoggedIn()) {
     const userProfile = getProfile();
     
     pCredits.innerHTML = `Credits: ${userProfile.credits}`;
 
     listeners.setLogoutListener();
 
     if (form) {
       form.addEventListener("submit", async (event) => {
         let sendData = {};
         let tagsData = [];
         let mediaData = [];
         event.preventDefault();
         const form = event.target;
         const formData = new FormData(form);
         const profile = Object.fromEntries(formData.entries());

         console.log(profile);

         sendData.title = profile.title;
         sendData.endsAt = profile.deadline;
         sendData.description = profile.descriptionArea;
         
         if (profile.itemPhoto1 !== "") {
            mediaData.push(profile.itemPhoto1);
         } 
         if (profile.itemPhoto2 !== "") {
            mediaData.push(profile.itemPhoto2);
         } 
         if (profile.itemPhoto3 !== "") {
            mediaData.push(profile.itemPhoto3);
         } 
         if (profile.itemPhoto4 !== "") {
            mediaData.push(profile.itemPhoto4);
         }
         if (profile.itemPhoto5 !== "") {
            mediaData.push(profile.itemPhoto5);
         }

         sendData.media = mediaData;
         tagsData = profile.tags.split(",");
         sendData.tags = tagsData;
         
         console.log(sendData);
 
         const endpoint = "listings";
         const method = "POST";
 
         const options = createOptions(method, sendData, {}, true);
         
         const { data, error } = await makeApiCall(endpoint, options);
 
         if (error) {
           return displayMessage("danger", error, "#message");
         }
 
         displayMessage("success", `Created successfully!`, "#message");

         console.log(data);
 
       });
     }
   }
 }