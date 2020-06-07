import React, { useContext, Fragment } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PacienteListItem from "./PacienteListItem";

const PacienteList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { pacienteRegistry } = rootStore.pacienteStore;
  return (
    <Fragment>
      <Item.Group divided>
        {Array.from(pacienteRegistry.values()).map((paciente) => (
          <PacienteListItem key={paciente.id} paciente={paciente} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(PacienteList);
