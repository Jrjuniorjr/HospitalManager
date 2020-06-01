import React, { useState, useContext, useEffect } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { PacienteFormValues } from "../../../app/models/paciente";
import { VagasFormValues, SituacaoEnum } from "../../../app/models/vaga";

const validate = combineValidators({
  numeroQuarto: isRequired("numeroQuarto"),
  situacao: isRequired("situacao"),
  idPaciente: isRequired("idPaciente"),
  idPerfilHospital: isRequired("idPerfilHospital"),
});

interface DetailParams {
  id: string;
}

const VagaForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { createVaga, editVaga, submitting, loadVaga } = rootStore.vagaStore;

  const [vaga, setVaga] = useState(new VagasFormValues());
  const [loading, setLoading] = useState(false);

  const optSituacao = [
    {
      key: SituacaoEnum.LIVRE,
      text: SituacaoEnum.LIVRE.toUpperCase(),
      value: SituacaoEnum.LIVRE,
    },
    {
      key: SituacaoEnum.OCUPADO,
      text: SituacaoEnum.OCUPADO.toUpperCase(),
      value: SituacaoEnum.OCUPADO,
    },
  ];

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadVaga(parseInt(match.params.id))
        .then((vaga) => setVaga(new VagasFormValues(vaga)))
        .finally(() => setLoading(false));
    }
  }, [loadVaga, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const obj = values;
    if (!obj.id) {
      createVaga(obj);
    } else {
      editVaga(obj);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={vaga}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="numeroQuarto"
                  placeholder="Número do Quarto"
                  value={vaga.numeroQuarto}
                  component={TextInput}
                />

                <Field
                  name="idPiente"
                  placeholder="Identificador do Paciente"
                  rows={3}
                  value={vaga.idPaciente}
                  component={TextInput}
                />

                <Dropdown
                  placeholder="Situação"
                  fluid
                  selection
                  options={optSituacao}
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
                  onClick={() => history.push("/vagaDashboard")}
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

export default observer(VagaForm);
