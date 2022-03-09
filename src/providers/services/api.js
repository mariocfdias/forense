import axios from "axios";
import { parseCookies, setCookie } from "nookies";

const { "forense-auth-token": token } = parseCookies(); // TODO

const api = axios.create({
  baseURL: "http://200.129.18.20/api/v1/",
});

async function refreshToken(error) {
  return new Promise((resolve, reject) => {
    try {
      const { "forense-refresh-token": refresh_token } = parseCookies(); // TODO
      const { "forense-auth-token": auth_token } = parseCookies(); // TODO

      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      };

      const parameters = {
        method: "POST",
        headers: header,
      };

      const body = {
        refresh: refresh_token,
      };
      axios
        .post("http://200.129.18.20/api/v1/auth/refresh/", body, parameters)
        .then(async (res) => {
          console.log(res.data.access);

          setCookie(undefined, "forense-auth-token", res.data.access, {
            maxAge: 60 * 60 * 24 * 10, // 30 min
          });

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          return resolve(res);
        })
        .catch((err) => {
          return reject(error);
        });
    } catch (err) {
      return reject(err);
    }
  });
}

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const { "forense-auth-token": auth_token } = parseCookies();
    if (error.response.status === 401 && auth_token) {
      const response = await refreshToken(error);
      return response;
    }
    return Promise.reject(error);
  }
);

export default api;
