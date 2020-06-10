import React, { useContext, Fragment, useEffect } from "react";
import { Item, Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotificationTable from "./NotificationTable";



const UserList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { notificationRegistry ,loadNotificationsEnviadas, loadNotificationsRecebidas, isSent, loadingInitial} = rootStore.notificationStore;

  useEffect(() => {
    if(isSent){
        loadNotificationsEnviadas()
    }else{
        loadNotificationsRecebidas()
    }
    }, [
    loadNotificationsEnviadas,
    loadNotificationsRecebidas,
    isSent,
    ]); 

    if (loadingInitial)
     return <LoadingComponent content="Loading notificações..." />;

  return (
    <Fragment>
    <Table fixed>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Remetente</Table.HeaderCell>
        <Table.HeaderCell>Destinatário</Table.HeaderCell>
        <Table.HeaderCell>Mensagem</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      
        {Array.from(notificationRegistry.values()).map((notification) => (
          <NotificationTable key={notification.id} notification={notification} />
        ))}
        
      </Table.Body>
      </Table>
    </Fragment>
  );
};

export default observer(UserList);
