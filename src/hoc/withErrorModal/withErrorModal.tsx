import { AxiosInstance } from "axios";
import { Component, ComponentType } from "react";

import Modal from "../../components/UI/Modal/Modal";

interface StateType {
  error: Error | null;
  interceptorsIDs: {
    req: number | null;
    res: number | null;
  };
}

function withErrorModal<T>(
  WrappedComponent: ComponentType<T>,
  axios: AxiosInstance
) {
  return class WithErrorModal extends Component<T, StateType> {
    state: StateType = {
      error: null,
      interceptorsIDs: {
        req: null,
        res: null,
      },
    };

    componentDidMount() {
      const interceptorReqID = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      const interceptorResID = axios.interceptors.response.use(
        (response) => response,
        (error) => this.setState({ error })
      );
      this.setState({
        interceptorsIDs: {
          req: interceptorReqID,
          res: interceptorResID,
        },
      });
    }

    componentWillUnmount() {
      console.log("Remove axios interceptors");
      console.table({
        reqID: this.state.interceptorsIDs.req,
        resID: this.state.interceptorsIDs.res,
      });
      axios.interceptors.request.eject(this.state.interceptorsIDs.req!);
      axios.interceptors.response.eject(this.state.interceptorsIDs.res!);
    }

    render() {
      return (
        <>
          <Modal
            isDisplayed={!!this.state.error}
            onClosed={() => this.setState({ error: null })}
          >
            {this.state.error?.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
}

export default withErrorModal;
