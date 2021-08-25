import axios from "axios";
import config from "../../../utils/Config";
import { getClientToken } from "../../../utils/CookieHandler";

export function useLogin() {
  return (formData) => {
    return axios
      .post(config.apiHost + "/auth/login", formData, {
        timeout: 10000,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  };
}

export function useApplication() {
  return () => {
    return axios
      .get(config.apiHost + "/menu-application", {
        timeout: 10000,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
}

export function useModule() {
  return (data) => {
    return axios
      .get(config.apiHost + "/menu-modules/" + data, {
        timeout: 10000,
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
}

export async function useUser() {
  try {
    const res = await axios.get(config.apiHost + "/auth/getUser", {
      timeout: 15000,
      headers: {
        Authorization: "Bearer " + getClientToken(),
      },
    });
    return res.data.data;
  } catch (e) {
    throw error
  }
}
