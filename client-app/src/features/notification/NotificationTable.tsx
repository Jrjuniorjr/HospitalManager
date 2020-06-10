import React from "react";
import { Table } from "semantic-ui-react";
import { INotification } from "../../app/models/notification";

const NotificationTable: React.FC<{ notification: INotification }> = ({
  notification,
}) => {
  return (
    <Table.Row>
      <Table.Cell>{notification.sender.nomeHospital}</Table.Cell>
      <Table.Cell>{notification.receiver.nomeHospital}</Table.Cell>
      <Table.Cell>{notification.mensagem}</Table.Cell>
    </Table.Row>
  );
};

export default NotificationTable;
