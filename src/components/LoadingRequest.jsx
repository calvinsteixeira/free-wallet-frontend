import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SC = {
  LoadingRequest: styled.div`
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
    display: ${(props) => (props.show === true ? "flex" : "none")};
    position: absolute;
    z-index: 2000;
    justify-content: center;
    align-items: center;
  `,
  StyledSpinner: styled(Spin)`
    color: white;
    .ant-spin-dot-item {
      background-color: #40a9ff;
    }
  `,
};

export function LoadingRequest(props) {
  const [loadingMessage, setLoadingMessage] = useState();
  document.body.style.overflow = "hidden";

  useEffect(() => {
    setLoadingMessage();
    if (props.config.success) {
      message.success({
        content: `${props.config.success.message}`,
        duration: 2,
      });
    } else if (props.error) {
      message.error({
        content: `${props.config.error.message}`,
        duration: 2,
      });
    } else {
      setLoadingMessage(
        <SC.StyledSpinner tip="Carregando..."></SC.StyledSpinner>
      );
    }
  }, [props]);

  return (
    <SC.LoadingRequest show={props.config.status}>
      {loadingMessage}
    </SC.LoadingRequest>
  );
}
