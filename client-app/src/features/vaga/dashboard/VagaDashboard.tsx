import React, { useContext, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import VagaList from "../lista/VagaList";
import { NavLink } from "react-router-dom";

const VagaDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingInitial, loadVagas } = rootStore.vagaStore;

  useEffect(() => {
    loadVagas();
  }, [loadVagas]);

  if (loadingInitial) return <LoadingComponent content="Carregando vagas..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <VagaList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(VagaDashboard);
