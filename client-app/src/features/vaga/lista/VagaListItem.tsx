import React from "react";
import { Item, Button, Label, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IVaga } from "../../../app/models/vaga";
import { observer } from "mobx-react-lite";

const VagaListItem: React.FC<{ vaga: IVaga }> = ({ vaga }) => {
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
        <Icon name="hospital" /> {vaga.idPerfilHospital}
      </Segment>
      <Segment>
        <Button
          as={Link}
          to={`/manage/${vaga.id}`}
          floated="right"
          content="Editar"
          color="blue"
        />
        <Button
          as={Link}
          to={`/messageDelete/${vaga.id}`}
          floated="right"
          content="Remover"
          color="red"
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(VagaListItem);
