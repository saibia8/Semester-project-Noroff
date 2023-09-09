export default function handleErrors(json) {
  if (json && json.errors && Array.isArray(json.errors)) {
    const errorMessage = json.errors.map((error) => error.message).join("\n");
    throw new Error(errorMessage);
  }

  throw new Error("There was an error processing the request!");
}
