import { FC } from "react";
import { AxiosInstance } from "axios";

import Modal from "../../components/UI/Modal/Modal";
import useAxiosErrorHandler from "../../hooks/axios-error-handler";

function withErrorModal<P>(WrappedComponent: FC<P>, axios: AxiosInstance) {
  const ComponentWithSuspense: FC<P> = (props) => {
    const { error, confirmError } = useAxiosErrorHandler(axios);
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
