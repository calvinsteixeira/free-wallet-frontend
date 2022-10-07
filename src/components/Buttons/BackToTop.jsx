import styled from "styled-components";
import { UpOutlined } from "@ant-design/icons";
import { Button } from "antd";

const SC = {
  StyledButton: styled(Button)`
    position: fixed;
    background-color: #8f8f8f;
    border-color: #8f8f8f;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
    font-size: 1rem;

    .anticon {
      color: white;
    }

    &:hover {
      border-color: unset;
      color: #8f8f8f;
      background-color: #8f8f8f;
      background-color: #8f8f8f;
    }
  `,
};

export function BackToTopButton(props) {
  return (
    <SC.StyledButton
      icon={<UpOutlined />}
      style={{
        right: props.right,
        bottom: props.bottom,
        left: props.left,
        top: props.top,
      }}
      type="default"
      shape="circle"
      size="medium"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    />
  );
}
