import React, { useContext, Fragment } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import UserListItem from "./UserListItem";

const UserList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userRegistry } = rootStore.userStore;
  return (
    <Fragment>
      <Item.Group divided>
        {Array.from(userRegistry.values()).map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(UserList);
