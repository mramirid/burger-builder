import { useCallback, useEffect, useState } from "react";
import { AxiosInstance } from "axios";

export default function useAxiosErrorHandler(axios: AxiosInstance) {
  const [error, setError] = useState<Error | null>(null);

  const interceptorReqID = axios.interceptors.request.use(
    (request) => {
      setError(null);
      return Promise.resolve(request);
    },
    (err) => Promise.reject(err)
  );
  const interceptorResID = axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (err) => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(
    () => () => {
      axios.interceptors.request.eject(interceptorReqID);
      axios.interceptors.response.eject(interceptorResID);
    },
    [
      axios.interceptors.request,
      axios.interceptors.response,
      interceptorReqID,
      interceptorResID,
    ]
  );

  const confirmError = useCallback(() => setError(null), []);

  return { error, confirmError };
}
