import React, { useState, useContext, useEffect } from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { PacienteFormValues } from "../../../app/models/paciente";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  cpf?: string;
}

const PacienteCardItem: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadPacienteByCPF, loadingInitial } = rootStore.pacienteStore;
  const [paciente, setPaciente] = useState(new PacienteFormValues());
  useEffect(() => {
    if (match.params.cpf) {
      loadPacienteByCPF(match.params.cpf).then((paciente) =>
        setPaciente(new PacienteFormValues(paciente))
      );
    }
  }, [loadPacienteByCPF, match.params.cpf]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading app..." />;
  }
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{paciente.nome}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="address card" /> CPF: {paciente.cpf}
      </Segment>
      <Segment>
        <Icon name="calendar alternate outline" /> Data de Nascimento:{" "}
        {paciente.dataNascimento}
      </Segment>
      <Segment>
        <Icon name="mail" /> Email: {paciente.email}
      </Segment>
      <Segment>
        <Icon name="phone" /> Telefone: {paciente.telefone}
      </Segment>
      <Segment>
        <Button
          as={Link}
          to={`/paciente/manage/${paciente.id}`}
          floated="right"
          content="Editar"
          color="blue"
        />
        <Button
          as={Link}
          to={`/paciente/messageDelete/${paciente.id}`}
          floated="right"
          content="Remover"
          color="red"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(PacienteCardItem);
