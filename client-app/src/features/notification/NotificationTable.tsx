import React from "react";
import { Item, Button, Segment, Icon, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { INotification } from "../../app/models/notification";

const NotificationTable: React.FC<{ notification: INotification}> = ({ notification}) => {
  return (

      <Table.Row>
        <Table.Cell >{notification.sender.nomeHospital}</Table.Cell>
        <Table.Cell>{notification.receiver.nomeHospital}</Table.Cell>
        <Table.Cell>
        {notification.mensagem}
        </Table.Cell>
      </Table.Row>

   )
}

export default NotificationTable;

