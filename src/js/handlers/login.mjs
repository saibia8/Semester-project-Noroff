import { login } from "../api/auth/login.mjs";
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

  try {
    const json = await login(bodyData);
    index.save("token", json.accessToken);
    index.save("name", json.name);
    index.save("profile", json);
    location.href = "/user/profile/";
  } catch (error) {
    console.log(error);
    displayMessage("danger", error.message, "#message");
  } finally {
    button.innerText = "Login";
  }
}
