import axios from 'axios';
import { useState, useEffect } from 'react';

/* -------------------------------------------------------------------------- */

export default function useFetchState(
  api,
  method = 'get',
  payload
) {
  // 상태
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
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
            
          case 'patch':
            res = await axios.patch(api, payload);
            break;
            
          case 'delete':
            res = await axios.delete(api);
            break;
  
            default:
            break;
        }

        const json = await res.json();

        setData(json);
        setIsLoading(false);
      } catch (err) {
        if (err) setHasError(true);
      }
    };

    fetchData();
  }, [api, method, payload]);

  return [isLoading, hasError, data];
}