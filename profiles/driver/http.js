const fetch = require("node-fetch");

exports.identify = async function identify(cookie) {
  const response = await fetch("http://localhost:8080/users", { headers: { cookie } });
  if (response.ok) {
    return await response.json();
  }
  return null;
}
