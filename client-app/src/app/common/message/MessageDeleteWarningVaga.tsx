import React, { useState, useContext, useEffect } from "react";
import { Message, Button } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";
import { VagasFormValues, SituacaoEnum } from "../../../app/models/vaga";
import { history } from "../../..";
interface DetailParams {
  id: string;
}

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

  useEffect(() => {
    if (match.params.id) {
      loadVaga(parseInt(match.params.id)).then((vaga) =>
        setVaga(new VagasFormValues(vaga))
      );
    }
  }, [loadVaga, match.params.id]);

  if (!rootStore.commonStore.token) {
    history.push("/notauthorized");
  }
  if (rootStore.commonStore.liberateVaga) {
    return (
      <Message warning>
        <Message.Header>Deseja liberar a vaga?</Message.Header>
        <br />
        <Button
          content="Sim"
          color="green"
          onClick={() => {
            vaga.paciente = null;
            vaga.situacao = SituacaoEnum.LIVRE;
            editVaga(vaga);
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
