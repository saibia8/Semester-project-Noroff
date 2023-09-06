import * as index from "../storage/index.mjs";

export function isLoggedIn() {
  return index.load("token") ? true : false;
}

export function getName() {
  return index.load("name");
}

export function getCredits() {
  return index.load("profile");
}
