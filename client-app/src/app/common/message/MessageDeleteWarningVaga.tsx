import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";
import { VagasFormValues, SituacaoEnum } from "../../../app/models/vaga";
import { history } from "../../..";
import { Form, Header, Button, Message, Icon, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import ErrorMessage from "../form/ErrorMessage";
import TextAreaInput from "../form/TextAreaInput";
import { combineValidators, isRequired } from "revalidate";
interface DetailParams {
  id: string;
}

const validate = combineValidators({
  laudo: isRequired("laudo"),
});

export const MessageDeleteWarningVaga: React.FC<RouteComponentProps<
  DetailParams
>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    vagasIsDisponiveisVisible,
    loadVaga,
    editVaga,
    deleteVaga,
  } = rootStore.vagaStore;
  const [vaga, setVaga] = useState(new VagasFormValues());
  const [error, setError]: any = useState(null);

  useEffect(() => {
    if (match.params.id) {
      loadVaga(parseInt(match.params.id)).then((vaga) =>
        setVaga(new VagasFormValues(vaga))
      );
    }
  }, [loadVaga, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
    vaga.paciente = null;
    vaga.situacao = SituacaoEnum.LIVRE;
    vaga.laudo = values.laudo;
    editVaga(vaga)
      .then(setError(null))
      .then(() => rootStore.modalStore.closeModal())
      .catch((error) => setError(error));
  };

  if (!rootStore.commonStore.token) {
    history.push("/notauthorized");
  }
  if (rootStore.commonStore.liberateVaga) {
    return (
      <Grid>
        <Grid.Column width={10}>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            validate={validate}
            render={({
              handleSubmit,
              submitting,
              invalid,
              pristine,
              dirtySinceLastSubmit,
            }) => (
              <Form onSubmit={handleSubmit} error>
                <Header
                  as="h3"
                  content="Deseja liberar a vaga???!"
                  color="blue"
                  textAlign="center"
                />
                <Field
                  name="laudo"
                  component={TextAreaInput}
                  placeholder="Laudo"
                />
                {error && (
                  <ErrorMessage error={error} text={error.data.message} />
                )}
                <Button
                  disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                  content="Liberar vaga"
                  loading={submitting}
                  fluid
                  color="blue"
                />
              </Form>
            )}
          />
        </Grid.Column>
        <Grid.Column width={5}>
        <Button
          onClick={() => {
            if (vagasIsDisponiveisVisible) {
              history.push("/vagaDashboardLivre");
            } else history.push("/vagaDashboardOcupada");
          }}
          content="Voltar"
          color="grey"
        />
        </Grid.Column>
      </Grid>
    );
  } else {
    return (
      <Message warning>
        <Message.Header>
          Tem certeza que deseja excluir a vaga? !!!
        </Message.Header>
        <br />
        <Button
          content="Sim"
          color="green"
          onClick={() => {
            deleteVaga(parseInt(match.params.id));
            if (vagasIsDisponiveisVisible) {
              history.push("/vagaDashboardLivre");
            } else history.push("/vagaDashboardOcupada");
          }}
        />
        <Button
          onClick={() => {
            if (vagasIsDisponiveisVisible) {
              history.push("/vagaDashboardLivre");
            } else history.push("/vagaDashboardOcupada");
          }}
          content="Não"
          color="red"
        />
      </Message>
    );
  }
};
export default observer(MessageDeleteWarningVaga);
