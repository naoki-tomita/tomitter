const fetch = require("node-fetch");

exports.identify = async function identify(cookie) {
  const response = await fetch("http://localhost/v1/users/identify", { headers: { cookie } });
  if (response.ok) {
    return await response.json();
  }
  return null;
}
