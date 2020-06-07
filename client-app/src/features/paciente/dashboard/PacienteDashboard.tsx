import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, GridRow, Header, Form } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PacienteList from "../lista/PacienteList";
import { NavLink } from "react-router-dom";
import { history } from "../../..";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../../app/common/form/TextInput";

const validate = combineValidators({
  cpfPaciente: isRequired("cpfPaciente"),
});

const PacienteDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, loadPacientes } = rootStore.pacienteStore;
  const [habilitarLista, setHabilitarLista] = useState(false);
  const [mensagemLista, setMensagemList] = useState("Listar pacientes");
  useEffect(() => {
    loadPacientes();
  }, [
    loadPacientes,
  ]); /*this empty array is ensure to effect run once, because without it, when the component gets rerendenring
  it's run again.*/

  const handleFinalFormSubmit = (values: any) => {
    history.push(`/pesquisar/${values.cpfPaciente}`);
  };

  if (loadingInitial)
    return <LoadingComponent content="Loading pacientes..." />;

  if (!rootStore.commonStore.token) {
    history.push("/notfound");
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            validate={validate}
            render={({
              handleSubmit,
              submitting,
              submitError,
              invalid,
              pristine,
              dirtySinceLastSubmit,
            }) => (
              <Form onSubmit={handleSubmit} error>
                <Header
                  as="h3"
                  content="Pesquisar Paciente"
                  color="blue"
                  textAlign="center"
                />
                <Field
                  name="cpfPaciente"
                  component={TextInput}
                  placeholder="CPF do Paciente"
                />

                <Button
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  content="Pesquisar"
                  loading={submitting}
                  fluid
                  color="blue"
                />
              </Form>
            )}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <br />
          <br />
          <Button
            as={NavLink}
            to="/createPaciente"
            positive
            content="Novo Paciente"
          />
          <br />
          <br />
          <Button
            onClick={() => {
              setHabilitarLista(!habilitarLista);
              if(habilitarLista){
                setMensagemList("Listar pacientes")
              }
              else{
                setMensagemList("Ocultar listar pacientes")
              }
            }}
            content={mensagemLista}
            positive
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column width={10}>{habilitarLista && <PacienteList />}</Grid.Column>
    </Grid>
  );
};

export default observer(PacienteDashboard);
