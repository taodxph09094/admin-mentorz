import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Alert } from "components/GlobalAlert/Alert";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import publicRoutes from "routes/publicRoutes";
const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getPublicRoutes = (publicRoutes) => {
    return publicRoutes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Alert />
        {/* <AuthNavbar /> */}
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getPublicRoutes(publicRoutes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
        <div className="header-body text-center mb-7">
          <Row className="justify-content-center">
            <Col lg="5" md="6">
              <p className="text-lead text-light">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="http://hiblue.vn/"
                  target="_blank"
                >
                  Hi - Blue JSC
                </a>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Auth;
