import axios from 'axios';
import { useState, useEffect } from 'react';
import instance from '../app/api';
import {baseUrl} from "../constants"

function useApiData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${url}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
}
export default useApiData;