import { useState, useEffect } from 'react';
import Axios from 'axios';
import { API_ERRORS_SCANR } from '../config/config';

function useGetData(BASE_URL, id) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  async function getData() {
    const url = (id) ? `${BASE_URL}/${id}` : BASE_URL;
    try {
      const response = await Axios.get(url);
      const res = await response.data;
      setData(res);
      setLoading(false);

      if (Object.entries(res).length === 0) {
        window.location.href = '../erreur404';
      }
    } catch (error) {
      Axios.post(API_ERRORS_SCANR, { error });
      setError(true);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return { data, isLoading, isError };
}
export default useGetData;
