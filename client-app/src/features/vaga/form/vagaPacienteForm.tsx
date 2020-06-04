import React, { useState, useContext, useEffect } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  Dropdown,
  Divider,
  Header,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { PacienteFormValues, IPaciente } from "../../../app/models/paciente";
import { VagasFormValues, SituacaoEnum } from "../../../app/models/vaga";

interface DetailParams {
  id: string;
}
const validate = combineValidators({
  cpfPaciente: isRequired("cpfPaciente"),
});
const VagaPacienteForm = () => {
  const [vaga, setVaga] = useState(new VagasFormValues());
  const [loading, setLoading] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const { editVaga, loadVaga } = rootStore.vagaStore;

  useEffect(() => {
    console.log(rootStore.modalStore.modal.objId);

    if (rootStore.modalStore.modal.objId) {
      setLoading(true);
      loadVaga(parseInt(rootStore.modalStore.modal.objId!))
        .then((vaga) => {
          console.log(vaga);
          setVaga(new VagasFormValues(vaga));
        })
        .finally(() => setLoading(false));
    }
  }, [loadVaga]);

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);

    let paciente = {
      id: null,
      nome: "",
      email: "",
      cpf: values.cpfPaciente,
      telefone: "",
      dataNascimento: ""

    };
    
<<<<<<< HEAD

=======
    vaga.situacao = SituacaoEnum.OCUPADO;
>>>>>>> felix values
    vaga.paciente = paciente;

    editVaga(vaga);
    rootStore.modalStore.closeModal();
  };

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

export default VagaPacienteForm;
