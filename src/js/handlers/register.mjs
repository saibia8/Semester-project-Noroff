import { register } from "../api/auth/register.mjs";
import { displayMessage } from "../api/ui/common/index.mjs";

/**
 *Sets the register form listener to handle form submission.
 */
export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");
  const password = document.getElementById("inputPassword");
  const confirmPassword = document.getElementById("confirmInputPassword");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (password.value !== confirmPassword.value) {
        displayMessage("warning", "Passwords don't match!", "#message");
        return;
      } else {
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        //Send the profile data to the API for registration
        try {
          await register(profile);
          displayMessage("success", "Registration successful! You can now log in.", "#message");
          form.reset();
        } catch (error) {
          displayMessage("danger", error.message, "#message");
        }
      }
    });
  }
}
