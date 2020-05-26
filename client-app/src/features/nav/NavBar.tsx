import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout, username } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          HospitalManager
        </Menu.Item>
        
        <Menu.Item name="Dashboard" as={NavLink} to="/dashboard" />
        <Menu.Item name="Pacientes" as={NavLink} to="/pacienteDashboard" />
        <Menu.Item name="Vagas" as={NavLink} to="/vagaDashboard" />
        {username && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={"/assets/user.png"} />
            <Dropdown pointing="top left" text={username}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="config"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="sign-out" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
