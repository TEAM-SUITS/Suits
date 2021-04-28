import axios from "axios";

/* -------------------------------------------------------------------------- */
export default function API(api, method = 'get', payload) {
  let res = {};

  const fetchData = async () => {
    try {
      switch (method) {
        case 'get':
          res = await axios.get(api);
          break;

        case 'post':
          res = await axios.post(api, payload);
          break;

        case 'put':
          res = await axios.put(api, payload);
          break;

        case 'patch':
          res = await axios.patch(api, payload);
          break;

        case 'delete':
          res = await axios.delete(api);
          break;

        default:
          break;
      }
      return res.data;
    } catch (err) {
      return err;
    }
  };

  return fetchData();
}
