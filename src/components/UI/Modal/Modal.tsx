import { ReactNode, CSSProperties, FC, memo } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

interface ModalProps {
  isDisplayed: boolean;
  isLoading: boolean;
  children: ReactNode;
  onClosed: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const styles: CSSProperties = {
    transform: props.isDisplayed ? "translateY(0)" : "translateY(-100vh)",
    opacity: props.isDisplayed ? "1" : "0",
  };

  return (
    <>
      <div className={classes.Modal} style={styles}>
        {props.children}
      </div>
      <Backdrop isDisplayed={props.isDisplayed} onClicked={props.onClosed} />
    </>
  );
};

export default memo(Modal, (prevProps, nextProps) => {
  return (
    prevProps.isDisplayed === nextProps.isDisplayed &&
    prevProps.isLoading === nextProps.isLoading
  );
});
