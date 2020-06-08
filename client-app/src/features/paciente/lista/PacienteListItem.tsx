import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IPaciente } from "../../../app/models/paciente";
import { observer } from "mobx-react-lite";

const PacienteListItem: React.FC<{ paciente: IPaciente }> = ({ paciente }) => {
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
        <Icon name="calendar alternate outline" /> Data de Nascimento: {paciente.dataNascimento}
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

export default observer(PacienteListItem);
