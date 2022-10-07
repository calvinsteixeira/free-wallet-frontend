// IMPORTS
import moment from "moment";
import { BackToTopButton } from "../../components/Buttons/BackToTop";
import styled from "styled-components";
import pt_BR from "antd/es/date-picker/locale/pt_BR";
import { Logo } from "../../assets/Logo";
import {
  Button,
  Drawer,
  List,
  Spin,
  DatePicker,
  Form,
  Input,
  Select,
  InputNumber,
  Divider,
  message,
} from "antd";
import {
  ArrowDownOutlined,
  LogoutOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingRequest } from "../../components/LoadingRequest";

// STYLED COMPONENTS
const SC = {
  HeaderContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    height: max-content;
    padding: 1rem;
  `,
  HeaderPanel: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    background-image: linear-gradient(
      to top,
      #40a9ff,
      #50adfb,
      #5eb1f8,
      #6bb5f4,
      #77b9f0
    );

    padding: 1rem 1rem;
    border-radius: 0.4rem;
    max-width: 20rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  `,
  WelcomeMessage: styled.h2`
    font-size: 1.5rem;
    margin-bottom: 0;
    color: #f7f7f7;
    span {
      font-weight: 700;
    }
  `,
  ScreenIdentifier: styled.div`
    display: flex;
    width: max-content;
    flex-direction: column;
  `,
  Main: styled.main`
    background-color: #f7f7f7;
    max-width: 100vw;
    height: 100vh;
  `,
  ScreenTitle: styled.h4`
    color: #414141;
  `,
  ActionHistorySection: styled.section`
    background-color: #f7f7f7;
    bottom: 0;
    height: 60%;
    width: 100%;
    padding: 0rem 1rem 1.6rem 1rem;
    .ant-list-items {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
  `,
  HistoryTitle: styled.h2`
    font-weight: 600;
    color: #888888;
  `,
  WalletBalance: styled.div`
    width: max-content;
    display: inline;

    strong {
      font-size: 1.4rem;
      font-weight: 500;
      color: #f7f7f7;
      margin-right: 0.5rem;
    }

    & span:nth-child(2) {
      font-weight: 700;
      color: #f7f7f7;
    }

    & span:nth-child(3) {
      font-size: 1.4rem;
      font-weight: 700;
      color: #f7f7f7;
      margin-left: 0.4rem;
    }
  `,
  Cash: styled.div`
    width: 2rem;
  `,
  StyledListItemMeta: styled(List.Item.Meta)`
    @media (max-width: 400px) {
      .ant-list-item-meta-title,
      .ant-list-item-meta-description,
      .ant-list-item-meta-avatar {
        font-size: 0.8rem;
      }

      .ant-list-item-meta-avatar {
        margin-right: 0.5rem;
      }
    }

    .ant-list-item-meta-title {
      margin-left: 1.2rem;
      color: ${(props) => (props.type === 1 ? "#1a8635" : "#d13f3f")};
    }

    .ant-list-item-meta-avatar {
      position: absolute;
      color: ${(props) => (props.type === 1 ? "#1a8635" : "#d13f3f")};
    }

    .ant-list-item-meta-description {
      text-align: justify;
    }
  `,
  StyledListItem: styled(List.Item)`
    padding: 1rem 1rem 1rem 1rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .ant-list-item-extra {
      width: 100%;
      margin: 0;

      @media (min-width: 577px) {
        width: auto;
      }
    }

    .ant-divider {
      margin: 0;
    }
  `,
  StyledLogoutIcon: styled(LogoutOutlined)`
    position: absolute;
    font-size: 1.1rem;
    top: 2.1rem;
    right: 2rem;

    cursor: pointer;
    &:after {
      content: "Sair";
      position: absolute;
      top: 1.6rem;
      left: 100%;
      margin-left: -20px;
      font-size: 0.8rem;
    }
  `,
  StyledAddButton: styled(Button)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 1rem;
    right: 1rem;
    z-index: 11;
    font-size: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  `,
  StyledSpin: styled(Spin)`
    .ant-spin-dot-item {
      background-color: white;
    }
  `,
  StyledForm: styled(Form)`
    width: 15rem;
    .ant-form-item {
      margin-bottom: 0.7rem;
    }
  `,
  StyledDrawer: styled(Drawer)`
    .ant-drawer-body {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `,
  StyledDatePicker: styled(DatePicker)`
    width: 100%;
  `,
  StyledInputNumber: styled(InputNumber)`
    width: 100%;
  `,
  StyledDivider: styled(Divider)`
    width: 100%;
    background-color: #cfcfcf;
  `,
  StyledInputSearch: styled(Input)`
    margin-top: 1rem;
    max-width: 20rem;
  `,
};

export function HomeView() {
  // STATES
  const [loadingList, setLoadingList] = useState(true);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [cashContent, setCashContent] = useState(
    <SC.StyledSpin size="small" />
  );
  const [transactionId, setTransactionId] = useState();
  const [filteredList, setFilteredList] = useState([]);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const [transactionForm] = Form.useForm();
  const [formEditMode, setFormEditMode] = useState();
  const [userName, setUserName] = useState("");
  const [loadingRequest, setLoadingRequest] = useState();
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000";

  // SET/LOAD DATA ANIMATION
  useEffect(() => {
    setTimeout(() => {
      getUserData();
      setLoadingList(false);
    }, 2000);
  }, []);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 306 && showBackToTopButton != true) {
      setShowBackToTopButton(true);
    } else if (window.pageYOffset < 306 && showBackToTopButton != false) {
      setShowBackToTopButton(false);
    }
  });

  return (
    <SC.Main>
      {loadingRequest && <LoadingRequest config={loadingRequest || false} />}
      <SC.StyledDrawer
        placement="bottom"
        title={
          formEditMode === true
            ? "Alterar movimentação"
            : "Adicionar nova movimentação"
        }
        height={"100vh"}
        width={"100vw"}
        onClose={() => {
          setVisibleDrawer(false);
        }}
        visible={visibleDrawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <SC.StyledForm
          form={transactionForm}
          labelAlign="left"
          size="medium"
          layout="vertical"
          name="novoregistro"
          onFinish={createOrUpdateTransaction}
          scrollToFirstError
        >
          <Form.Item
            name="categoryId"
            label="Tipo da movimentação"
            rules={[
              {
                required: formEditMode === true ? false : true,
                message: "Informe o tipo da movimentação",
              },
            ]}
          >
            <Select disabled={formEditMode === true ? true : false}>
              <Select.Option value="1">Adicionar saldo</Select.Option>
              <Select.Option value="2">Adicionar despesa</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              {
                required: true,
                message: "Informe uma descrição",
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea
              showCount={true}
              autoSize={{ minRows: 4 }}
              maxLength={100}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="cash"
            label="Valor"
            rules={[
              {
                required: true,
                message: "Informe um valor",
              },
              {
                type: "number",
                message: "Informe um valor válido",
              },
            ]}
          >
            <SC.StyledInputNumber
              placeholder="0,00"
              precision={2}
              prefix="R$"
              decimalSeparator=","
              controls={false}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Data"
            rules={[
              {
                type: "date",
                message: "Valor inválido",
              },
              {
                required: true,
                message: "Informe uma data",
              },
            ]}
          >
            <SC.StyledDatePicker
              disabledDate={(current) => {
                return current && current > moment().startOf(current + 1);
              }}
              format={"DD/MM/YYYY"}
              locale={pt_BR}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={requestLoading}
              block="true"
              type="primary"
              htmlType="submit"
            >
              {formEditMode === true ? "Alterar" : "Adicionar"}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              onClick={() => {
                setVisibleDrawer(false);
                transactionForm.resetFields();
              }}
              block="true"
              type="ghost"
            >
              Cancelar
            </Button>
          </Form.Item>
        </SC.StyledForm>
      </SC.StyledDrawer>
      <SC.StyledAddButton
        icon={<PlusOutlined />}
        type="primary"
        shape="circle"
        size="large"
        onClick={(e) => {
          transactionForm.resetFields();
          setFormEditMode(false);
          setVisibleDrawer(!visibleDrawer);
        }}
      />
      {showBackToTopButton && (
        <BackToTopButton right={"1.2rem"} bottom={"4rem"} />
      )}
      <SC.HeaderContainer>
        <SC.ScreenIdentifier>
          <Logo />
          <SC.ScreenTitle>Minha Carteira</SC.ScreenTitle>
        </SC.ScreenIdentifier>
        <SC.StyledLogoutIcon
          onClick={(e) => {
            localStorage.removeItem("token");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }}
        />
        <SC.HeaderPanel>
          <SC.WelcomeMessage>
            Olá, <span>{userName}</span>
          </SC.WelcomeMessage>
          <SC.WalletBalance>
            <strong>Seu saldo:</strong>
            {cashContent}
          </SC.WalletBalance>
        </SC.HeaderPanel>
        <SC.StyledInputSearch
          prefix={<SearchOutlined />}
          onChange={(e) => {
            setFilteredList(handleSearch(e.target.value));
          }}
          placeholder="busque por uma data"
        />
      </SC.HeaderContainer>

      <SC.ActionHistorySection>
        <SC.HistoryTitle>Seu histórico</SC.HistoryTitle>
        <List
          loading={loadingList}
          itemLayout="vertical"
          dataSource={filteredList.length > 0 ? filteredList : lastTransactions}
          renderItem={(item) => (
            <SC.StyledListItem
              key={item.id}
              extra={
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: 0,
                        height: "100%",
                        color: "#444444",
                        fontWeight: 600,
                      }}
                    >
                      {item.released_date}
                    </h4>
                    <Button
                      style={{ color: "#d13f3f", padding: 0 }}
                      type="link"
                      onClick={() => {
                        deleteTransaction(item.id);
                      }}
                    >
                      Remover
                      <DeleteOutlined />
                    </Button>
                  </div>
                  <SC.StyledDivider dashed={true} />
                </>
              }
            >
              <SC.StyledListItemMeta
                avatar={
                  item.categoryId === 1 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
                type={item.categoryId}
                title={
                  item.transaction_category.categoryDescription +
                  `... ${item.categoryId == 1 ? "+" : "-"} R$ ${item.value}`
                }
                description={item.description}
              />
              <Button
                type="link"
                onClick={() => {
                  setFormEditMode(true);

                  transactionForm.setFieldsValue({
                    categoryId: item.transaction_category.categoryDescription,
                    description: item.description,
                    cash: item.value,
                    date: moment.utc(
                      new Date(item.released_date),
                      "DD/MM/YYYY"
                    ),
                  });

                  setTransactionId(item.id || null);

                  setVisibleDrawer(true);
                }}
                style={{
                  padding: 0,
                  maxWidth: "max-content",
                }}
              >
                Editar transação
                <EditOutlined />
              </Button>
            </SC.StyledListItem>
          )}
        ></List>
      </SC.ActionHistorySection>
    </SC.Main>
  );

  // METHODS

  function getUserData() {
    axios
      .get(API_URL + "/buscar-dados-usuario", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCashContent(
          <>
            <span>R$</span>
            <span>{res.data.content.userBalance}</span>
          </>
        );
        setUserName(
          res.data.content.username.substring(
            0,
            res.data.content.username.indexOf(" ")
          )
        );
        setLastTransactions(res.data.content.lastTransactions);
      })
      .catch((err) => {
        if (err.response.data.statusCode == 401) {
          navigate("/");
        }
      });
  }

  function createOrUpdateTransaction(formData) {
    setLoadingRequest({
      status: true,
    });

    // NOVA TRANSAÇÃO
    if (formEditMode === false) {
      const newTransaction = {
        categoryId: parseInt(formData.categoryId),
        transactionDescription: formData.description,
        transactionValue: formData.cash,
        releasedDate: formData.date._d,
      };

      axios
        .post(
          API_URL + "/nova-transacao",
          {
            content: newTransaction,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            setLoadingRequest({
              status: true,
              success: {
                message: "Adicionado com sucesso",
              },
            });
          }, 4000);
          setTimeout(() => {
            setRequestLoading(false);
            transactionForm.resetFields();
            location.reload();
          }, 6000);
        })
        .catch((err) => {
          if (err.response.data.statusCode == 401) {
            navigate("/");
          }
          setTimeout(() => {
            setLoadingRequest({
              status: true,
              error: {
                message: err.response.data.error.message,
              },
            });
          }, 4000);
          setTimeout(() => {
            setRequestLoading(false);
            transactionForm.resetFields();
            location.reload();
          }, 6000);
        });
    } else {
      const transactionData = {
        transactionId: transactionId,
        transactionDescription: formData.description,
        transactionValue: formData.cash,
        releasedDate: formData.date._d,
      };

      axios
        .put(
          API_URL + "/alterar-transacao",
          {
            content: transactionData,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            setLoadingRequest({
              status: true,
              success: {
                message: "Alterado com sucesso",
              },
            });
          }, 4000);

          setTimeout(() => {
            getUserData();
            setLoadingRequest({
              status: false,
            });
          }, 6500);
        })
        .catch((err) => {
          if (err.response.data.statusCode == 401) {
            navigate("/");
          }
          setTimeout(() => {
            setLoadingRequest({
              status: true,
              error: {
                message: err.response.data.error.message,
              },
            });
          }, 4000);
          setTimeout(() => {
            setRequestLoading(false);
            transactionForm.resetFields();
            location.reload();
          }, 6000);
        });
    }
  }

  function deleteTransaction(transactionId) {
    setLoadingRequest({
      status: true,
    });

    axios
      .delete(API_URL + `/deletar-transacao/${transactionId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTimeout(() => {
          setLoadingRequest({
            status: true,
            success: {
              message: "Deletado com sucesso",
            },
          });
        }, 3300);
        setTimeout(() => {
          location.reload();
        }, 5000);
      })
      .catch((err) => {
        if (err.response.data.statusCode == 401) {
          navigate("/");
        }
      });
  }

  function handleSearch(searchTerm) {
    return searchTerm.length > 0
      ? lastTransactions.filter((transaction) =>
          transaction.released_date.includes(searchTerm)
        )
      : [];
  }
}
