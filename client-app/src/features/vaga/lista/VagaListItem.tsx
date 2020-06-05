import React, { useContext } from "react";
import { Item, Button, Label, Segment, Icon, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IVaga } from "../../../app/models/vaga";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import VagaPacienteForm from "../form/vagaPacienteForm";

const VagaListItem: React.FC<{ vaga: IVaga }> = ({ vaga }) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { vagasIsDisponiveisVisible } = rootStore.vagaStore;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{vaga.numeroQuarto}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="hospital" /> {vaga.user!.username}
      </Segment>
      <Segment>
        {vagasIsDisponiveisVisible && [
          <Button
            onClick={() => {
              console.log(vaga.id);
              console.log(vaga.numeroQuarto);

              rootStore.vagaStore.loadVaga(vaga.id!);
              openModal(<VagaPacienteForm />, vaga.id);
            }}
            floated="right"
            content="Relacionar com Paciente"
            color="grey"
          />,
          <Button
            as={Link}
            to={`/manage/${vaga.id}`}
            floated="right"
            content="Editar"
            color="blue"
          />,
          <Button
            as={Link}
            to={`/messageDelete/${vaga.id}`}
            floated="right"
            content="Remover"
            color="red"
          />,
        ]}

        {!vagasIsDisponiveisVisible && (
          <Button
            onClick={() => {
              console.log(vaga.id);
              console.log(vaga.numeroQuarto);

              rootStore.vagaStore.loadVaga(vaga.id!);
              openModal(<VagaPacienteForm />, vaga.id);
            }}
            floated="right"
            content="Liberar quarto"
            color="grey"
          />
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(VagaListItem);
