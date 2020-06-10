import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IUserItem } from "../../../app/models/user";

const UserListItem: React.FC<{ user: IUserItem }> = ({ user }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{user.nomeHospital}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="mail" /> Email: {user.email}
      </Segment>
      <Segment>
        <Icon name="phone" /> Telefone: {user.telefone}
      </Segment>
      <Segment>
        <Button
          as={Link}
          to={`/notificar/${user.id}`}
          floated="right"
          content="Notificar"
          color="blue"
        />
      </Segment>
    </Segment.Group>
  );
};

export default UserListItem;
