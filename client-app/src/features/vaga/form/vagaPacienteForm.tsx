import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { VagasFormValues } from "../../../app/models/vaga";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ErrorMessage from "../../../app/common/form/ErrorMessage";

const validate = combineValidators({
  cpfPaciente: isRequired("cpfPaciente"),
});
const VagaPacienteForm = () => {
  const [vaga, setVaga] = useState(new VagasFormValues());
  const [loading, setLoading] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const { editVaga, loadVaga } = rootStore.vagaStore;
  const { modal } = rootStore.modalStore;
  useEffect(() => {
    if (modal.objId) {
      setLoading(true);
      loadVaga(parseInt(modal.objId!))
        .then((vaga) => {
          setVaga(new VagasFormValues(vaga));
        })
        .finally(() => setLoading(false));
    }
  }, [loadVaga, modal.objId]);

  const handleFinalFormSubmit = (values: any) => {
    let paciente = {
      id: null,
      nome: "",
      email: "",
      cpf: values.cpfPaciente,
      telefone: "",
      dataNascimento: "",
    };
    vaga.paciente = paciente;
    editVaga(vaga)
      .then(() => rootStore.modalStore.closeModal());
  };
  if (loading) {
    return <LoadingComponent content="Aguarde..." />;
  }
  return (
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
            content="Vincular Paciente à Vaga"
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
            content="Vincular"
            loading={submitting}
            fluid
            color="blue"
          />
        </Form>
      )}
    />
  );
};

export default observer(VagaPacienteForm);
