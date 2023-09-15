import { getProfile } from "../../../helpers/storage.mjs";
import * as listeners from "../../../handlers/index.mjs";

export default function displayLoggedInMenu(){
   const profile = getProfile();
   const menuDivLogin = document.getElementById("loginOrLogout");

     menuDivLogin.innerHTML = "";
     menuDivLogin.classList.remove("d-grid", "gap-3", "d-lg-block");
     menuDivLogin.classList.add(
       "d-flex",
       "justify-content-center",
       "align-items-center",
       "gap-4"
     );
 
     const div = document.createElement("div");
     div.classList.add(
       "d-flex",
       "justify-content-center",
       "align-items-center",
       "gap-3"
     );
     menuDivLogin.appendChild(div);
 
     const p = document.createElement("p");
     p.classList.add("text-white", "mb-0", "text-uppercase", "fw-semibold");
     const textNodeCredits = document.createTextNode(
       "Credits: " + profile.credits
     );
     p.appendChild(textNodeCredits);
     div.appendChild(p);
 
     const a = document.createElement("a");
     a.href = "/user/profile/";
     a.className = "nav-link";
     div.appendChild(a);
 
     const span = document.createElement("span");
     span.className = "fs-3";
     a.appendChild(span);
 
     const i = document.createElement("i");
     i.classList.add("bi", "bi-person-circle");
     span.appendChild(i);
 
     const btn = document.createElement("button");
     btn.className = "log-out-btn";
     btn.id = "logout";
     btn.innerText = "Log out";
     menuDivLogin.appendChild(btn);
 
     const spanBtn = document.createElement("span");
     spanBtn.className = "ms-2";
     btn.appendChild(spanBtn);
 
     const iBtn = document.createElement("i");
     iBtn.classList.add("bi", "bi-box-arrow-right");
     spanBtn.appendChild(iBtn);
 
     listeners.setLogoutListener();
}