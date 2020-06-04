import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { PacienteFormValues } from "../../../app/models/paciente";

const validate = combineValidators({
  nome: isRequired("nome"),
  email: isRequired("email"),
});

interface DetailParams {
  id: string;
}

const PacienteForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createPaciente,
    editPaciente,
    submitting,
    loadPaciente,
  } = rootStore.pacienteStore;

  const [paciente, setPaciente] = useState(new PacienteFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadPaciente(parseInt(match.params.id))
        .then((paciente) => setPaciente(new PacienteFormValues(paciente)))
        .finally(() => setLoading(false));
    }
  }, [loadPaciente, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const paciente = values;
    if (!paciente.id) {
      createPaciente(paciente);
    } else {
      editPaciente(paciente);
    }
  };

  if (!rootStore.commonStore.token) {
    history.push("/notfound");
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={paciente}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="nome"
                  placeholder="Nome"
                  value={paciente.nome}
                  component={TextInput}
                />
                <Field
                  name="email"
                  placeholder="e-mail"
                  rows={3}
                  value={paciente.email}
                  component={TextInput}
                />
                 <Field
                  name="cpf"
                  placeholder="CPF"
                  value={paciente.cpf}
                  component={TextInput}
                />
                <Field
                name="telefone"
                placeholder="+55 (99) 9999-9999"
                value={paciente.telefone}
                component={TextInput}
              />
              <Field
                  name="datanascimento"
                  placeholder="Data de Nascimento"
                  value={paciente.dataNascimento}
                  type="date"
                  component={TextInput}
                />
                <Divider />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/pacienteDashboard")}
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PacienteForm);
