import React, { useState, useContext, useEffect } from "react";
import { Message, Button } from "semantic-ui-react";
import { Link, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";
import { VagasFormValues, SituacaoEnum } from "../../../app/models/vaga";
import { history } from "../../..";
interface DetailParams {
  id: string;
}

export const MessageDeleteWarningPaciente: React.FC<RouteComponentProps<
  DetailParams
>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { deletePaciente } = rootStore.pacienteStore;

  if (!rootStore.commonStore.token) {
    history.push("/notfound");
  }
  return (
    <Message warning>
      <Message.Header>Tem certeza que deseja excluir o paciente? !!!</Message.Header>
      <br />
      <Button
        as={Link}
        to={"/pacienteDashboard"}
        content="Sim"
        color="green"
        onClick={() => deletePaciente(parseInt(match.params.id))}
      />
      <Button as={Link} to={"/pacienteDashboard"} content="Não" color="red" />
    </Message>
  );
};
export default observer(MessageDeleteWarningPaciente);
