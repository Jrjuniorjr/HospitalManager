import React, { useContext } from "react";
import { history } from "../..";
import { RootStoreContext } from "../../app/stores/rootStore";

export const Dashboard = () => {
  const rootStore = useContext(RootStoreContext);

  if (!rootStore.commonStore.token) {
    history.push("/notfound");
  }
  return <div>Ola</div>;
};
