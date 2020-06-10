import React from "react";
import { Message } from "semantic-ui-react";
export const ListaVazia = () => {
  return (
    <Message warning>
      <Message.Header>Lista vazia!!!</Message.Header>
      <br />
    </Message>
  );
};
export default ListaVazia;
