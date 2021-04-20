import axios from 'axios';

/* -------------------------------------------------------------------------- */
export default function API(
  api,
  method = 'get',
  payload
) {

  let res = {};

  const fetchData = async () => {
    try {
      switch (method) {
        case 'get':
          res = await axios.get(api);
          console.log(res.data);
          break;

        case 'post':
          res = await axios.post(api, payload);
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
      if (err) console.error('데이터를 받아올 수 없습니다.');
    }
  };

  return fetchData();
}
