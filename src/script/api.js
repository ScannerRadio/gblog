import config from "./config.js";

const basic = "https://api.github.com/";
const Authorization =
  "Basic " + btoa(config.clientID + ":" + config.clientSecret);

const get = (api, headers = {}, body = null) => {
  headers["Authorization"] = Authorization;
  return fetch(basic + api, { method: "GET", headers, body });
};

const userapi = async () => {
  let userinfo = await get("users/" + config.owner);
  return await userinfo.json();
};

const listapi = async api => {
  let resp = await get(api);
  return {
    link: resp.status == 200 ? resp.headers.get("Link") : "",
    json: await resp.json()
  };
};

const articleapi = async id => {
  let article = await get(
    "repos/" + config.owner + "/" + config.repo + "/issues/" + id
  );
  return await article.json();
};

export { Authorization, get, userapi, listapi, articleapi };
