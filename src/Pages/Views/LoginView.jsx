import { Button, Form, Input, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Logo } from "../../assets/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SC = {
  Main: styled.main`
    background-color: #f7f7f7;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    justify-content: center;
  `,
  ErrorsContainer: styled.div`
    max-width: 80%;
    height: auto;
    position: absolute;
    bottom: 10%;
    left: center;
  `,
  LoginForm: styled(Form)`
    width: 15rem;
    .ant-form-item {
      margin-bottom: 0.7rem;
    }
  `,
  RegisterLink: styled.span`
    text-align: center;
  `,
};

export function LoginView() {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [errors, setErrors] = useState([]);
  const API_URL = "http://localhost:3000";

  return (
    <SC.Main>
      <SC.ErrorsContainer>
        {errors.map((error, index) => (
          <Alert type="error" banner closable message={error} key={index} />
        ))}
      </SC.ErrorsContainer>
      <Logo />
      <SC.LoginForm
        form={loginForm}
        size="middle"
        onFinish={requestLogin}
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="cpf"
          rules={[
            {
              required: true,
              message: "Por favor, informe seu CPF!",
            },
            {
              pattern: /[0-9]{11}/,
              message: "Informe um CPF válido (11 digitos numéricos)",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="CPF"
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Campo obrigatório!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Esqueceu sua senha?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            block="true"
            loading={buttonLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Entrar
          </Button>
        </Form.Item>
      </SC.LoginForm>
      <SC.RegisterLink>
        não possui conta? <a href="novo-cadastro">Cadastre-se</a>
      </SC.RegisterLink>
    </SC.Main>
  );

  // METHODS

  function requestLogin(credentials) {
    setButtonLoading(true);
    setErrors([]);

    axios
      .post(API_URL + "/login", credentials)
      .then((res) => {
        const response = res.data;
        if (response.hasError === false && response.content.token) {
          localStorage.setItem("token", response.content.token);
          setTimeout(() => {
            navigate("/minha-carteira");
          }, 3000);
        }
      })
      .catch((err) => {
        const response = err.response.data;

        if (err.code === "ERR_NETWORK" || response.hasError === true) {
          setErrors([
            response.error ||
              "Falha na comunicação com o servidor, tente novamente em alguns minutos",
          ]);
          setButtonLoading(false);
        }
      });
  }
}
