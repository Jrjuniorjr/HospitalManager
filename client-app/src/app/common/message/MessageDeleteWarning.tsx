import React, { useContext } from "react";
import { Message, Button } from "semantic-ui-react";
import { Link, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";
import {history} from "../../..";
interface DetailParams {
  id: string;
}

export const MessageDeleteWarning: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
  const rootStore = useContext(RootStoreContext);
  const {deletePaciente} = rootStore.pacienteStore;
  if(!rootStore.commonStore.token){
    history.push("/notfound")
  }
  return (
    <Message warning>
      <Message.Header>Tem certeza que deseja excluir ? !!!</Message.Header>
      <br />
      <Button
        as={Link}
        to={"/pacienteDashboard"}
        content="Sim"
        color="green"
        onClick={() => deletePaciente(parseInt(match.params.id))}
      />
      <Button as={Link} to={"/pacienteDashboard"} content="Não" color="red" />
    </Message>
  );
};
export default observer(MessageDeleteWarning);
