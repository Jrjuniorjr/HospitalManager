import React, { useContext, useEffect } from "react";
import { Grid, GridColumn, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { history } from "../../";
import { ListaVazia } from "../../app/common/message/ListaVazia";
import UserList from "../user/list/UserList";
import { NavLink } from "react-router-dom";

const NotificationDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingInitial,
    loadUsers,
    isUserRegistryEmpty,
  } = rootStore.userStore;
  const { setIsSent } = rootStore.notificationStore;

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (loadingInitial) return <LoadingComponent content="Carregando vagas..." />;

  if (!rootStore.commonStore.token) {
    history.push("/notauthorized");
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {isUserRegistryEmpty && <ListaVazia />}
        <UserList />
      </Grid.Column>
      <GridColumn>
        <Button
          onClick={() => setIsSent(false)}
          as={NavLink}
          to="/notification"
          positive
          content="Notificações Recebidas"
        />
        <br></br>
        <br></br>
        <Button
          onClick={() => setIsSent(true)}
          as={NavLink}
          to="/notification"
          positive
          content="Notificações Enviadas"
        />
      </GridColumn>
    </Grid>
  );
};

export default observer(NotificationDashboard);
