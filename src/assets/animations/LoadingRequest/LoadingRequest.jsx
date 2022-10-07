import styled from "styled-components";
import { Spin } from "antd";

const Screen = styled.div`
  background-color: #0000001d;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
`;

export function LoadingRequest() {
  return (
    <Screen>
      <Spin />;
    </Screen>
  );
}
