import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";

const GlobalStyles = createGlobalStyle`
  
  html {
    scroll-behavior: smooth;
    }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

  .ant-message {
    
    top: 50vh;
    z-index: 3000;

    .ant-message-notice-content {
      background-color: transparent;
      box-shadow: none;
      color: white;
    }
  }

    

`;

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <>
    <GlobalStyles />
    <App />
  </>
  //</React.StrictMode>
);
