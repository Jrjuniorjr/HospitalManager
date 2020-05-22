import React, { useContext, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PacienteList from "../lista/PacienteList";
import { NavLink } from "react-router-dom";

const PacienteDashboard : React.FC = () => {
  const rootStore = useContext(RootStoreContext);
    const {loadingInitial, loadPacientes} = rootStore.pacienteStore;
  useEffect(() => {
    loadPacientes();
  }, [
    loadPacientes,
  ]); /*this empty array is ensure to effect run once, because without it, when the component gets rerendenring
  it's run again.*/
  if (loadingInitial)
    return <LoadingComponent content="Loading pacientes..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PacienteList />
      </Grid.Column>

      <Grid.Column width={6}>
      <Button as={NavLink} to='/createPaciente' positive content='Novo Paciente' />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PacienteDashboard);
