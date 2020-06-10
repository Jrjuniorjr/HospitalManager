import React, { useContext } from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
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
            <Item.Content>
              <Item.Header as="a">
                <Icon name="bed" />
                {vaga.numeroQuarto}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="question circle outline" /> Situação: {vaga.situacao}
      </Segment>

      <Segment>
        <Icon name="comment alternate outline" /> Descrição: {vaga.descricao}
      </Segment>
      {vaga.paciente && (
        <Segment>
          <Icon name="user" /> {vaga.paciente.nome}
          <Link to={`/pesquisar/${vaga.paciente.cpf}`} className="iconPesquisa">
            <Icon name="search" />
          </Link>
        </Segment>
      )}
      <Segment>
        {vagasIsDisponiveisVisible && (
          <Button
            onClick={() => {
              openModal(<VagaPacienteForm />, vaga.id);
            }}
            floated="right"
            content="Relacionar com Paciente"
            color="grey"
          />
        )}
        {vagasIsDisponiveisVisible && (
          <Button
            as={Link}
            to={`vaga/manage/${vaga.id}`}
            floated="right"
            content="Editar"
            color="blue"
          />
        )}
        {vagasIsDisponiveisVisible && (
          <Button
            onClick={() => {
              rootStore.commonStore.setLiberatedVaga(false);
            }}
            as={Link}
            to={`/vaga/messageDelete/${vaga.id}`}
            floated="right"
            content="Remover"
            color="red"
          />
        )}

        {!vagasIsDisponiveisVisible && (
          <Button
            onClick={() => {
              rootStore.commonStore.setLiberatedVaga(true);
            }}
            as={Link}
            to={`/vaga/messageDelete/${vaga.id}`}
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
