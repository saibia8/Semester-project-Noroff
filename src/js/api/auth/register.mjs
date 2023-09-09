import { API_SOCIAL_URL } from "../constants.mjs";
import handleErrors from "../handleErrors.mjs";

const action = "/auth/register";
const method = "POST";

export async function register(profile) {
  const registerUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const json = await response.json();
  console.log(response);

  if (response.ok) {
    return json;
  }

  handleErrors(json);
}
