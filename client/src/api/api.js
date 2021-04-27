import axios from "axios";
import { rest } from "lodash";

/* -------------------------------------------------------------------------- */
export default function API(api, method = "get", payload) {
  let res = {};

  const fetchData = async () => {
    try {
      switch (method) {
        case "get":
          res = await axios.get(api);
          console.log("에러처리", res);
          break;

        case "post":
          res = await axios.post(api, payload);
          break;

        case "put":
          res = await axios.put(api, payload);
          break;

        case "patch":
          res = await axios.patch(api, payload);
          break;

        case "delete":
          res = await axios.delete(api);
          break;

        default:
          break;
      }
      return res.data;
      // return res.statusText === "OK" ? res.data : res.data.message;
    } catch (err) {
      return err;
    }
  };

  return fetchData();
}
