import React from "react";
import { Message } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
export const ListaVazia = () => {
  return (
    <Message warning>
      <Message.Header>Lista vazia!!!</Message.Header>
      <br />
    </Message>
  );
};
export default observer(ListaVazia);
