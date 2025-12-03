export function transformAuthResponse(response = {}) {
  const { user = null, token = null, message = "" } = response || {};
  return {
    user,
    token,
    message,
  };
}
