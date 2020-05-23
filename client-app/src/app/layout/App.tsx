import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import NavBar from "../../features/nav/NavBar";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import PacienteDashboard from "../../features/paciente/dashboard/PacienteDashboard";
import PacienteForm from "../../features/paciente/form/PacienteForm";
import MessageExampleWarning from "../common/message/MessageExampleWarning";
import { Dashboard } from "../../features/dashboard/Dashboard";
import VagaDashboard from "../../features/vaga/dashboard/VagaDashboard";
import VagaForm from "../../features/vaga/form/VagaForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUsername } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUsername().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUsername, setAppLoaded, token]);

  if (!appLoaded) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <Fragment>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <ToastContainer position="bottom-right" />
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/login" component={LoginForm} />
                <Route
                  exact
                  path="/pacienteDashboard"
                  component={PacienteDashboard}
                />
                <Route
                  exact
                  path="/messageDelete/:id"
                  component={MessageExampleWarning}
                />
                <Route
                  key={location.key}
                  path={["/createPaciente", "/manage/:id"]}
                  component={PacienteForm}
                />
                <Route
                  key={location.key}
                  path="/vagaDashboard"
                  component={VagaDashboard}
                />
                <Route
                  key={location.key}
                  path={["/createVaga", "/manage/:id"]}
                  component={VagaForm}
                />

                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
