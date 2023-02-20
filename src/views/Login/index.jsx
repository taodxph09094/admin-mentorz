import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { login } from "redux/modules/auth";
import { GetAuthSelector } from "redux/selectors/auth";
import { Redirect } from "react-router-dom";
import { RouteBase } from "constants/routeUrl";
import { alertService } from "../../services/alertService";
import * as Yup from "yup";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const Login = () => {
  const dispatch = useDispatch();
  const auth = GetAuthSelector();
  const { isLogin, isSendRequest, isAdmin } = auth;
  const { t } = useTranslation();
  useEffect(() => {
    if (auth?.error?.data?.message) {
      alertService.error(auth?.error?.data?.message);
    } else if (!isAdmin) {
      alertService.error("Tài khoản của bạn không có quyền truy cập");
    }
  }, [auth]);

  if (isLogin) {
    return <Redirect to={RouteBase.Home} />;
  }

  const formInitValue = {
    rememberMe: false,
    account: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    account: Yup.string().required(t("login:validate.usernameRequired")),
    password: Yup.string().required(t("login:validate.passwordRequired")),
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>{t("login:signInTitle")}</small>
            </div>
            <Formik
              initialValues={formInitValue}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(login(values.account, values.password));
              }}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form>
                  <FormGroup className="mb-3">
                    <Input
                      name="account"
                      tag={Field}
                      placeholder={t("login:field.username")}
                      value={values.account}
                      invalid={touched.account && errors.account ? true : false}
                    />
                    <FormFeedback>{errors.account}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Input
                      name="password"
                      tag={Field}
                      placeholder={t("login:field.password")}
                      type="password"
                      value={values.password}
                      invalid={
                        touched.password && errors.password ? true : false
                      }
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                  {/* <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div> */}
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      disabled={isSendRequest}
                      type="submit"
                    >
                      {t("login:field.btnSubmit")}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
