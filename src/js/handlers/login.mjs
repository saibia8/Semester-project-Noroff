import makeApiCall from "../api/auth/makeApiCall.mjs";
import createOptions from "../api/auth/createOptions.mjs";
import * as index from "../storage/index.mjs";
import { displayMessage } from "../api/ui/common/index.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const emailData = formData.get("email");
  const passwordData = formData.get("password");

  const button = form.querySelector("button");
  button.innerText = "Logging in...";

  const bodyData = { email: emailData, password: passwordData };

  const endpoint = "auth/login";
  const method = "POST";

  const options = createOptions(method, bodyData);

  const { data, error } = await makeApiCall(endpoint, options);

  if (error) {
    button.innerText = "Login";
    return displayMessage("danger", error, "#message");
  }

  index.save("token", data.accessToken);
  index.save("name", data.name);
  index.save("profile", data);
  location.href = "/user/profile/";
}
