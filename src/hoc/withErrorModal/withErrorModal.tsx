import { FC, useCallback, useEffect, useState } from "react";
import { AxiosInstance } from "axios";

import Modal from "../../components/UI/Modal/Modal";

function withErrorModal<P>(WrappedComponent: FC<P>, axios: AxiosInstance) {
  const ComponentWithSuspense: FC<P> = (props) => {
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

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(interceptorReqID);
        axios.interceptors.response.eject(interceptorResID);
      };
    }, [interceptorReqID, interceptorResID]);

    const confirmError = useCallback(() => setError(null), []);

    return (
      <>
        <Modal isDisplayed={!!error} onClosed={confirmError}>
          {error?.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
  return ComponentWithSuspense;
}

export default withErrorModal;
