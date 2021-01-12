import { Component, ComponentType } from "react";
import { AxiosInstance } from "axios";

import Modal from "../../components/UI/Modal/Modal";

interface StateType {
  error: Error | null;
  interceptorsIDs: {
    req: number | null;
    res: number | null;
  };
}

function withErrorModal<P extends string | number | object>(
  WrappedComponent: ComponentType<P>,
  axios: AxiosInstance
) {
  return class ComponentWithErrorModal extends Component<P, StateType> {
    state: StateType = {
      error: null,
      interceptorsIDs: {
        req: null,
        res: null,
      },
    };

    componentDidMount() {
      const interceptorReqID = axios.interceptors.request.use(
        (request) => {
          this.setState({ error: null });
          return request;
        },
        (error) => error
      );
      const interceptorResID = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error });
          return error;
        }
      );
      this.setState({
        interceptorsIDs: {
          req: interceptorReqID,
          res: interceptorResID,
        },
      });
    }

    componentWillUnmount() {
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
