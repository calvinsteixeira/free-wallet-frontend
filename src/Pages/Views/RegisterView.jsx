import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const SC = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
    width: 100vw;
    min-height: 100vh;
  `,
  RegisterForm: styled(Form)`
    width: 15rem;
    .ant-form-item {
      margin-bottom: 0.7rem;
    }
  `,
  PreviousPageLink: styled.span`
    margin-top: 1.2rem;
    text-align: center;
  `,
  AlertsContainer: styled.div`
    max-width: 80%;
    height: auto;
    position: absolute;
    bottom: 10%;
    left: center;
  `,
};

export function RegisterView() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [registerForm] = Form.useForm();
  const API_URL = "https://localhost:3000";

  return (
    <SC.Main>
      <SC.AlertsContainer>
        {errors.map((error, index) => (
          <Alert type="error" banner closable message={error} key={index} />
        ))}
        {success.map((success, index) => (
          <Alert type="success" banner closable message={success} key={index} />
        ))}
      </SC.AlertsContainer>
      <SC.RegisterForm
        form={registerForm}
        labelAlign="left"
        size="medium"
        layout="vertical"
        name="novocadastro"
        onFinish={requestRegister}
        initialValues={{
          prefix: "55",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            {
              required: true,
              message: "Informe seu CPF!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Informe seu nome!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "E-mail inválido",
            },
            {
              required: true,
              message: "Informe seu e-mail",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[
            {
              required: true,
              message: "Informe sua senha",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirme sua senha"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Informe a confirmação de senha",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("As senhas precisam ser iguais")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={buttonLoading}
            block="true"
            type="primary"
            htmlType="submit"
          >
            Cadastrar
          </Button>
        </Form.Item>
      </SC.RegisterForm>
      <SC.PreviousPageLink>
        já possui uma conta? <a href="/">faça login</a>
      </SC.PreviousPageLink>
    </SC.Main>
  );

  // METHODS

  function requestRegister(data) {
    setButtonLoading(true);

    axios
      .post(API_URL + "/novo-usuario", data)
      .then((res) => {
        const response = res.data;

        console.log(response);
        if (response.statusCode === 201) {
          setTimeout(() => {
            setButtonLoading(false);
            setSuccess(["Usuário registrado com sucesso"]);
            registerForm.resetFields();
          }, 3000);
        }
      })
      .catch((err) => {
        const response = err.response.data;

        if (err.code == "ERR_NETWORK") {
          setButtonLoading(false);
          setErrors([
            "Falha na comunicação com o servidor, tente novamente em alguns minutos",
          ]);
        } else if (response.hasError === true) {
          setTimeout(() => {
            setButtonLoading(false);
            setErrors(response.error);
          }, 3000);
        }
      });
  }
}
