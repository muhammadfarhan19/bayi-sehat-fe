import axios from "axios";
import config from "../../../../utils/Config";
import { getClientToken } from "../../../../utils/CookieHandler";

export function useGetBiodata() {
  return async (id) => {
    try {
      const res = await axios.get(config.apiHost + "/users/"+id+"/biodata", {
        timeout: 15000,
        headers: {
          Authorization: "Bearer " + getClientToken(),
        },
      });
      return res.data.data;
    } catch (e) {
        throw e
    }
  };
}
