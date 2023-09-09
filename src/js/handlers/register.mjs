import makeApiCall from "../api/auth/makeApiCall.mjs";
import { displayMessage } from "../api/ui/common/index.mjs";
import createOptions from "../api/auth/createOptions.mjs";

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
        const endpoint = "auth/register";
        const method = "POST";
        
        const options = createOptions(method, profile);
        
        const { error } = await makeApiCall(endpoint, options);

        if (error) {
          return displayMessage("danger", error, "#message");
        }

        displayMessage("success", `Registration successfull! You can now <a href="../../../user/login">login</a>.`, "#message");

        form.reset();
      }
    });
  }
}
