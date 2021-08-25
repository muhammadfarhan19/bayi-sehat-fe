import axios from "axios";
import config from "../../../utils/Config";
import { getRefreshToken, getClientToken } from "../../../utils/CookieHandler";
import Cookies from "js-cookie";

const checkToken = async (headers) => {
  try {
    const exp = await axios({
      headers,
      url: config.apiHost + "/auth/getUser",
      method: "get",
    });
  } catch (error) {
    const rtoken = getRefreshToken();
    headers["Authorization"] = "Bearer " + rtoken;
    const refresh = await axios({
      headers,
      url: config.apiHost + "/auth/accessToken",
      method: "get",
    });

    if (refresh.status === 200) {
      const exp = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set("token", refresh.data.data, { expires: exp });
    }
  }
};

export function getUser() {
  return async () => {
    try {
      let res = await axios.get(config.apiHost + "/auth/getUser", {
        timeout: 15000,
        headers: {
          Authorization: "Bearer " + getClientToken(),
        },
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  };
}

export const request = async (
  url,
  requestBody = {},
  method = "post",
  withToken = true,
  isFile = false
) => {
  const token = getClientToken();
  const headers = {};
  if (token && withToken) {
    headers["Authorization"] = "Bearer " + token;
    await checkToken(headers);
  }

  if (isFile) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const axiosProps = {
    headers,
    method,
    url,
    data: requestBody,
  };

  return axios(axiosProps)
    .then((response) => {
      return {
        success: true,
        message: "OK",
        responseData: response.data,
      };
    })
    .catch((err) => {
      const { response } = err || {};
      if (response) {
        return {
          success: false,
          message: response.statusText || "",
          responseData: response.data || null,
        };
      }
      return {
        success: false,
        message: "",
        responseData: null,
      };
    });
};

export const expiry = () => {
  return () => {
    return axios
      .get(config.apiHost + "/auth/getUser", {
        timeout: 15000,
        headers: {
          Authorization: "Bearer " + getClientToken(),
        },
      })
      .then((response) => {
        return {
          success: true,
          message: "OK",
          responseData: response.data,
        };
      })
      .catch((err) => {
        const { response } = err || {};
        if (response) {
          return axios
            .get(config.apiHost + "/auth/accessToken", {
              timeout: 15000,
              headers: {
                Authorization: "Bearer " + getRefreshToken(),
              },
            })
            .then((response) => {
              const exp = new Date(new Date().getTime() + 5 * 60 * 1000);
              Cookies.set("token", response.data.data, { expires: exp });
              return {
                success: true,
                message: "OK",
                responseData: response.data,
              };
            })
            .catch((err) => {
              return {
                success: false,
                message: "",
                responseData: null,
              };
            });
        }
        return {
          success: false,
          message: "",
          responseData: null,
        };
      });
  };
};
