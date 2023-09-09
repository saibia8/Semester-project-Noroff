import { API_SOCIAL_URL } from "../constants.mjs";
import handleErrors from "../handleErrors.mjs";

const action = "/auth/login";
const method = "POST";

export async function login(profile) {
  const loginUrl = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  handleErrors(json);
}
