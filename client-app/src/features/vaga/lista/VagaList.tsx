import React, { useContext, Fragment } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import VagaListItem from "./VagaListItem";

const VagaList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { vagaRegistry } = rootStore.vagaStore;
  return (
    <Fragment>
      <Item.Group divided>
        {Array.from(vagaRegistry.values()).map((obj) => (
          <VagaListItem key={obj.id} vaga={obj} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(VagaList);
