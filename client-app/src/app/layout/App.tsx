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
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import PacienteDashboard from "../../features/paciente/dashboard/PacienteDashboard";
import PacienteForm from "../../features/paciente/form/PacienteForm";
import VagaDashboard from "../../features/vaga/dashboard/VagaDashboard";
import VagaForm from "../../features/vaga/form/VagaForm";
import PacienteCardItem from "../../features/paciente/card/PacienteCard";
import { MessageDeleteWarningPaciente } from "../common/message/MessageDeleteWarningPaciente";
import { MessageDeleteWarningVaga } from "../common/message/MessageDeleteWarningVaga";
import NotAuthorized from "./NotAuthorized";
import Dashboard from "../../features/dashboard/Dashboard";

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
                <Route
                  exact
                  path="/pacienteDashboard"
                  component={PacienteDashboard}
                />
                <Route
                  exact
                  path="/paciente/messageDelete/:id"
                  component={MessageDeleteWarningPaciente}
                />
                <Route
                  key={location.key}
                  path={["/createPaciente", "/paciente/manage/:id"]}
                  component={PacienteForm}
                />
                <Route
                  key={location.key}
                  path={["/vagaDashboardLivre", "/vagaDashboardOcupada"]}
                  component={VagaDashboard}
                />
                <Route
                  key={location.key}
                  path={["/createVaga", "/vaga/manage/:id"]}
                  component={VagaForm}
                />
                <Route
                  exact
                  path="/vaga/messageDelete/:id"
                  component={MessageDeleteWarningVaga}
                />
                <Route
                  key={location.key}
                  path={"/pesquisar/:cpf"}
                  component={PacienteCardItem}
                />
                <Route path="/notauthorized" component={NotAuthorized} />

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
