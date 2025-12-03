export function extractErrorMessage(error) {
  if (!error) return "Unknown error.";

  if (typeof error === "string") return error;

  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  if (error.message) return error.message;

  return "Something went wrong.";
}
