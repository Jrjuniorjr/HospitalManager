import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import VagaList from "../lista/VagaList";
import { history } from "../../..";
import { ListaVazia } from "../../../app/common/message/ListaVazia";
const VagaDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingInitial,
    loadVagas,
    isVagaRegistryEmpty,
  } = rootStore.vagaStore;

  useEffect(() => {
    loadVagas();
  }, [loadVagas]);

  if (loadingInitial) return <LoadingComponent content="Carregando vagas..." />;

  if (!rootStore.commonStore.token) {
    history.push("/notauthorized");
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {isVagaRegistryEmpty && <ListaVazia />}
        <VagaList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(VagaDashboard);
